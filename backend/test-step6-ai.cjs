/**
 * PORTFOLIFY AI — STEP 6 AUTOMATED VERIFICATION SUITE
 * Real AI Portfolio Intelligence & Robust Security / Ownership Testing
 */

const http = require("http");

const BASE_URL = "http://localhost:5000";

function makeRequest(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    };

    const req = http.request(reqOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: parsed,
        });
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (body) {
      req.write(typeof body === "string" ? body : JSON.stringify(body));
    }
    req.end();
  });
}

function extractCookie(headers) {
  const setCookie = headers["set-cookie"];
  if (!setCookie) return "";
  if (Array.isArray(setCookie)) {
    return setCookie.map((c) => c.split(";")[0]).join("; ");
  }
  return setCookie.split(";")[0];
}

async function runStep6Tests() {
  console.log("==================================================================");
  console.log("       PORTFOLIFY AI — STEP 6 E2E VERIFICATION SUITE              ");
  console.log("==================================================================\n");

  let totalTests = 0;
  let passedTests = 0;

  function assert(name, condition, details = "") {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✅ PASS: ${name}`);
    } else {
      console.error(`  ❌ FAIL: ${name} ${details ? `(${details})` : ""}`);
    }
  }

  try {
    // 1. Health check
    console.log("--- 1. Health & Server Check ---");
    const health = await makeRequest("/api/health");
    assert("Backend is online and healthy", health.status === 200 && health.data.success === true);

    // 2. AI Status Check
    console.log("\n--- 2. AI Service Status ---");
    const aiStatus = await makeRequest("/api/ai/status");
    assert("AI status endpoint responds", aiStatus.status === 200 && aiStatus.data.success === true);
    const isConfigured = Boolean(aiStatus.data?.isConfigured ?? aiStatus.data?.status?.isConfigured);
    const providerName = aiStatus.data?.provider ?? aiStatus.data?.status?.provider ?? "openai";
    const modelName = aiStatus.data?.model ?? aiStatus.data?.status?.model ?? "gpt-4o-mini";
    console.log(`     Provider: ${providerName}`);
    console.log(`     Configured: ${isConfigured}`);
    console.log(`     Model: ${modelName}`);

    // 3. Security: Unauthenticated AI Access
    console.log("\n--- 3. Security: Unauthenticated Access ---");
    const unauthAnalyze = await makeRequest("/api/ai/analyze-resume", { method: "POST" }, { portfolioId: "dummy_id" });
    assert("Unauthenticated /api/ai/analyze-resume rejected with 401", unauthAnalyze.status === 401);

    const unauthHeadline = await makeRequest("/api/ai/generate-headline", { method: "POST" }, { portfolioId: "dummy_id" });
    assert("Unauthenticated /api/ai/generate-headline rejected with 401", unauthHeadline.status === 401);

    const unauthSummary = await makeRequest("/api/ai/generate-summary", { method: "POST" }, { portfolioId: "dummy_id" });
    assert("Unauthenticated /api/ai/generate-summary rejected with 401", unauthSummary.status === 401);

    const unauthExp = await makeRequest("/api/ai/improve-experience", { method: "POST" }, { portfolioId: "dummy_id" });
    assert("Unauthenticated /api/ai/improve-experience rejected with 401", unauthExp.status === 401);

    const unauthSkills = await makeRequest("/api/ai/analyze-skills", { method: "POST" }, { portfolioId: "dummy_id" });
    assert("Unauthenticated /api/ai/analyze-skills rejected with 401", unauthSkills.status === 401);

    // 4. Register User A & User B
    console.log("\n--- 4. User Registration & Authentication ---");
    const ts = Date.now();
    const userAEmail = `step6_user_a_${ts}@portfolify.test`;
    const userBEmail = `step6_user_b_${ts}@portfolify.test`;

    const regA = await makeRequest("/api/auth/register", { method: "POST" }, {
      name: "Alice Engineer",
      email: userAEmail,
      password: "Password123!",
    });
    assert("User A registered successfully", regA.status === 201 && regA.data.success === true);
    const cookieA = extractCookie(regA.headers);

    const regB = await makeRequest("/api/auth/register", { method: "POST" }, {
      name: "Bob Hacker",
      email: userBEmail,
      password: "Password123!",
    });
    assert("User B registered successfully", regB.status === 201 && regB.data.success === true);
    const cookieB = extractCookie(regB.headers);

    // 5. User A creates Portfolio
    console.log("\n--- 5. User A Creates Portfolio with Resume Data ---");
    const createPortRes = await makeRequest(
      "/api/portfolios",
      {
        method: "POST",
        headers: { Cookie: cookieA },
      },
      {
        title: "Alice AI Portfolio",
        profile: {
          name: "Alice Engineer",
          headline: "Software Engineer",
          email: userAEmail,
          phone: "+1 555 123 4567",
          location: "Seattle, WA",
          professionalSummary: "Software engineer with background in Node.js and TypeScript services.",
        },
        skills: ["Node.js", "TypeScript", "React", "MongoDB", "Express", "Docker"],
        experience: [
          {
            position: "Full Stack Engineer",
            company: "Tech Cloud Corp",
            location: "Seattle, WA",
            startDate: "2021",
            endDate: "Present",
            currentlyWorking: true,
            description: "Built REST microservices and dashboard web applications using React and Node.js.",
            achievements: ["Maintained 99.9% service uptime", "Designed responsive portal"],
          },
        ],
        education: [
          {
            institution: "University of Washington",
            degree: "B.S. in Computer Science",
            startDate: "2017",
            endDate: "2021",
          },
        ],
        projects: [
          {
            title: "Task Orchestrator",
            description: "Distributed job runner written in TypeScript with worker pools and retry mechanisms.",
            technologies: ["TypeScript", "Node.js", "Redis"],
          },
        ],
        template: "modern",
      }
    );
    assert("User A created portfolio", createPortRes.status === 201 && createPortRes.data.success === true);
    const portfolioA = createPortRes.data.data.portfolio;
    const portfolioAId = portfolioA._id;

    // 6. Security: User B tries to analyze User A's portfolio (Cross-user ownership check)
    console.log("\n--- 6. Security: Cross-User Authorization Verification ---");
    const crossUserAnalyze = await makeRequest(
      "/api/ai/analyze-resume",
      {
        method: "POST",
        headers: { Cookie: cookieB },
      },
      { portfolioId: portfolioAId }
    );
    assert("User B forbidden (403) from analyzing User A's portfolio", crossUserAnalyze.status === 403);

    const crossUserHeadline = await makeRequest(
      "/api/ai/generate-headline",
      {
        method: "POST",
        headers: { Cookie: cookieB },
      },
      { portfolioId: portfolioAId }
    );
    assert("User B forbidden (403) from generating headlines for User A", crossUserHeadline.status === 403);

    // 7. AI Operations & Schema Validation / Graceful Degradation
    console.log("\n--- 7. AI Operations & Schema Validation / Graceful Degradation ---");
    if (isConfigured) {
      console.log("   [AI Provider is CONFIGURED: Running Live AI Generation]");

      // 7a. Comprehensive Analysis
      const fullAnalysis = await makeRequest(
        "/api/ai/analyze-resume",
        {
          method: "POST",
          headers: { Cookie: cookieA },
        },
        { portfolioId: portfolioAId }
      );
      assert("AI analyze-resume returned 200 OK", fullAnalysis.status === 200);
      assert("AI response has structured headline", typeof fullAnalysis.data.data.headline === "string");
      assert("AI response has professional summary", typeof fullAnalysis.data.data.professionalSummary === "string");
      assert("AI response has categorized skills object", typeof fullAnalysis.data.data.skills === "object");
      assert("AI response has seo metadata object", typeof fullAnalysis.data.data.seo === "object");

      // 7b. Headline Generation
      const headlineRes = await makeRequest(
        "/api/ai/generate-headline",
        {
          method: "POST",
          headers: { Cookie: cookieA },
        },
        { portfolioId: portfolioAId }
      );
      assert("AI generate-headline returned 200 OK", headlineRes.status === 200);
      assert("AI generated headline suggestions array", Array.isArray(headlineRes.data.data.suggestions));

      // 7c. Summary Generation
      const summaryRes = await makeRequest(
        "/api/ai/generate-summary",
        {
          method: "POST",
          headers: { Cookie: cookieA },
        },
        { portfolioId: portfolioAId, length: "medium" }
      );
      assert("AI generate-summary returned 200 OK", summaryRes.status === 200);
      assert("AI returned short/medium/detailed summary variations", typeof summaryRes.data.data.medium === "string");

      // 7d. Skills Categorization
      const skillsRes = await makeRequest(
        "/api/ai/analyze-skills",
        {
          method: "POST",
          headers: { Cookie: cookieA },
        },
        { portfolioId: portfolioAId }
      );
      assert("AI analyze-skills returned 200 OK", skillsRes.status === 200);
      assert("AI returned technical categories", Array.isArray(skillsRes.data.data.categories));

      // 7e. SEO Generation
      const seoRes = await makeRequest(
        "/api/ai/generate-seo",
        {
          method: "POST",
          headers: { Cookie: cookieA },
        },
        { portfolioId: portfolioAId }
      );
      assert("AI generate-seo returned 200 OK", seoRes.status === 200);
      assert("AI returned metaTitle and metaDescription", typeof seoRes.data.data.metaTitle === "string");
    } else {
      console.log("   [AI Provider is NOT configured in current test env — verifying graceful degradation 503]");
      const unconfigAnalyze = await makeRequest(
        "/api/ai/analyze-resume",
        {
          method: "POST",
          headers: { Cookie: cookieA },
        },
        { portfolioId: portfolioAId }
      );
      assert("Unconfigured AI returns 503 Service Unavailable gracefully", unconfigAnalyze.status === 503);
      assert("Error response returns AI_NOT_CONFIGURED code", unconfigAnalyze.data.code === "AI_NOT_CONFIGURED");
    }

    // 8. Manual Non-AI Portfolio CRUD & Publishing (Must NEVER be broken by AI)
    console.log("\n--- 8. Portfolio Regression: Manual Edits, Saving & Publishing ---");
    const updateRes = await makeRequest(
      `/api/portfolios/${portfolioAId}`,
      {
        method: "PUT",
        headers: { Cookie: cookieA },
      },
      {
        profile: {
          name: "Alice Engineer, M.S.",
          headline: "Senior Cloud & Distributed Systems Architect",
          email: userAEmail,
          phone: "+1 555 123 4567",
          location: "Seattle, WA",
          professionalSummary: "Engineered scalable cloud applications with TypeScript and Node.js.",
        },
      }
    );
    assert("Manual portfolio update succeeds without AI dependency", updateRes.status === 200 && updateRes.data.success === true);

    // 9. Publish & Public URL
    const publishRes = await makeRequest(
      `/api/portfolios/${portfolioAId}/publish`,
      {
        method: "POST",
        headers: { Cookie: cookieA },
      }
    );
    const pubData = publishRes.data?.portfolio || publishRes.data?.data?.portfolio;
    assert("Portfolio publishes successfully", publishRes.status === 200 && pubData?.status === "published");

    const slug = pubData?.slug;
    const publicPortRes = await makeRequest(`/api/public/${slug}`);
    const pubPort = publicPortRes.data?.portfolio || publicPortRes.data?.data?.portfolio;
    if (!pubPort || pubPort.profile?.name !== "Alice Engineer, M.S.") {
      console.log("DEBUG publicPortRes:", JSON.stringify(publicPortRes.data));
    }
    assert("Public portfolio resolves by slug without authentication", publicPortRes.status === 200 && !!pubPort && pubPort.profile?.name === "Alice Engineer, M.S.");
    assert("Public portfolio does NOT leak private AI prompts or usage logs", pubPort?.aiUsage === undefined);

    // Summary
    console.log("\n==================================================================");
    console.log(`STEP 6 VERIFICATION SUMMARY: ${passedTests} / ${totalTests} PASSED`);
    console.log("==================================================================");

    if (passedTests === totalTests) {
      console.log("🎉 STEP 6 IMPLEMENTATION VERIFIED SUCCESSFULLY!");
      process.exit(0);
    } else {
      console.error("⚠️ SOME TESTS FAILED. Please review the output above.");
      process.exit(1);
    }
  } catch (err) {
    console.error("FATAL ERROR during test execution:", err);
    process.exit(1);
  }
}

runStep6Tests();
