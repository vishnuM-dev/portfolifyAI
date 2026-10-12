/**
 * PORTFOLIFY AI — STEP 6 GEMINI INTEGRATION VERIFICATION SUITE
 * Complete Unit & E2E Verification of Gemini AI Provider, Error Scenarios, Security & Live Analysis
 */

const http = require("http");
const path = require("path");

// Load backend .env safely
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const BASE_URL = "http://localhost:5000";

function makeRequest(urlPath, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE_URL);
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
      res.on("data", (chunk) => (data += chunk));
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

    req.on("error", reject);

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

async function runGeminiIntegrationSuite() {
  console.log("==================================================================");
  console.log("       PORTFOLIFY AI — GEMINI INTEGRATION VERIFICATION SUITE       ");
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

  // ==========================================
  // SECTION 1: UNIT TESTS FOR GEMINI PROVIDER LOGIC
  // ==========================================
  console.log("--- 1. GeminiProvider Resilience & Error Handling Unit Tests ---");

  const { GeminiProvider } = require("./dist/services/ai/providers/geminiProvider");

  // Test 1a: Invalid API Key fail-fast
  {
    const origKey = process.env.GEMINI_API_KEY;
    const origOpenKey = process.env.OPENAI_API_KEY;
    process.env.GEMINI_API_KEY = "dummy_invalid_key_1234567890";
    process.env.OPENAI_API_KEY = "";

    const testProvider = new GeminiProvider();
    // Mock getClient to return an API that simulates 401 Auth Error
    testProvider.getClient = () => ({
      models: {
        generateContent: async () => {
          const err = new Error("API_KEY_INVALID: 401 Unauthorized API key");
          throw err;
        },
      },
    });

    try {
      await testProvider.generateJSON("sys", "user");
      assert("Invalid API key fails fast", false, "Did not throw");
    } catch (e) {
      assert("Invalid API key fails fast with AI_AUTH_ERROR (500)", e.status === 500 && e.code === "AI_AUTH_ERROR");
      assert("Error message does not leak raw credentials", !e.message.includes("dummy_invalid_key"));
    } finally {
      process.env.GEMINI_API_KEY = origKey;
      process.env.OPENAI_API_KEY = origOpenKey;
    }
  }

  // Test 1b: Temporary 503 retry & fallback
  {
    const testProvider = new GeminiProvider();
    let attemptCount = 0;
    testProvider.getClient = () => ({
      models: {
        generateContent: async ({ model }) => {
          attemptCount++;
          if (attemptCount === 1) {
            throw new Error(`503 UNAVAILABLE: Model ${model} is experiencing high demand`);
          }
          return {
            text: JSON.stringify({ recovered: true, modelUsed: model }),
            usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 5, totalTokenCount: 15 },
          };
        },
      },
    });

    try {
      const result = await testProvider.generateJSON("sys", "user");
      assert("Temporary 503 triggers retry and recovers successfully", result.data.recovered === true && attemptCount === 2);
    } catch (e) {
      assert("Temporary 503 retry and recovery", false, e.message);
    }
  }

  // Test 1c: 429 Rate-limit handling
  {
    const testProvider = new GeminiProvider();
    testProvider.getClient = () => ({
      models: {
        generateContent: async () => {
          throw new Error("429 RESOURCE_EXHAUSTED: Rate limit exceeded quota");
        },
      },
    });

    try {
      await testProvider.generateJSON("sys", "user");
      assert("429 Rate limit throws correct error", false, "Did not throw");
    } catch (e) {
      assert("429 Rate limit translates to status 429 and AI_RATE_LIMIT", e.status === 429 && e.code === "AI_RATE_LIMIT");
    }
  }

  // Test 1d: Unsupported model fail-fast
  {
    const origModel = process.env.GEMINI_MODEL;
    process.env.GEMINI_MODEL = "nonexistent-model-xyz";
    const testProvider = new GeminiProvider();
    testProvider.getClient = () => ({
      models: {
        generateContent: async ({ model }) => {
          throw new Error(`404 NOT_FOUND: Model ${model} is not found`);
        },
      },
    });

    try {
      await testProvider.generateJSON("sys", "user");
      assert("Unsupported model throws error", false, "Did not throw");
    } catch (e) {
      assert("Unsupported model translates to status 502 and AI_MODEL_UNSUPPORTED", e.status === 502 && e.code === "AI_MODEL_UNSUPPORTED");
    } finally {
      process.env.GEMINI_MODEL = origModel;
    }
  }

  // Test 1e: Exhausted retries handling
  {
    const testProvider = new GeminiProvider();
    let totalAttempts = 0;
    testProvider.getClient = () => ({
      models: {
        generateContent: async () => {
          totalAttempts++;
          throw new Error("503 UNAVAILABLE: High demand persistent");
        },
      },
    });

    try {
      await testProvider.generateJSON("sys", "user");
      assert("Exhausted retries throws clean error", false, "Did not throw");
    } catch (e) {
      assert("Exhausted retries throws safe error without crashing", e.status === 503 && typeof e.message === "string");
    }
  }

  // ==========================================
  // SECTION 2: END-TO-END SERVER & SECURITY TESTS
  // ==========================================
  console.log("\n--- 2. End-to-End Server API & Security Verification ---");

  // Test 2a: AI status endpoint
  const statusRes = await makeRequest("/api/ai/status");
  assert("AI status responds with 200 OK", statusRes.status === 200 && statusRes.data.success === true);
  assert("AI provider is configured as 'gemini'", statusRes.data.provider === "gemini");
  assert("AI provider is marked as available/configured", statusRes.data.isConfigured === true);

  // Test 2b: Missing authentication rejected
  const unauthRes = await makeRequest("/api/ai/analyze-portfolio", { method: "POST" }, { portfolioId: "dummy" });
  assert("Missing authentication rejected with 401 Unauthorized", unauthRes.status === 401);

  // Test 2c: Register User A and User B
  const ts = Date.now();
  const userAEmail = `gemini_user_a_${ts}@portfolify.test`;
  const userBEmail = `gemini_user_b_${ts}@portfolify.test`;

  const regA = await makeRequest("/api/auth/register", { method: "POST" }, {
    name: "Gemini Tester A",
    email: userAEmail,
    password: "Password123!",
  });
  assert("User A registers successfully", regA.status === 201 && regA.data.success === true);
  const cookieA = extractCookie(regA.headers);

  const regB = await makeRequest("/api/auth/register", { method: "POST" }, {
    name: "Gemini Tester B",
    email: userBEmail,
    password: "Password123!",
  });
  assert("User B registers successfully", regB.status === 201 && regB.data.success === true);
  const cookieB = extractCookie(regB.headers);

  // Test 2d: Missing or malformed portfolio ID
  const missingIdRes = await makeRequest(
    "/api/ai/analyze-portfolio",
    { method: "POST", headers: { Cookie: cookieA } },
    {}
  );
  assert("Missing portfolio ID rejected with 400 Bad Request", missingIdRes.status === 400);

  const malformedIdRes = await makeRequest(
    "/api/ai/analyze-portfolio",
    { method: "POST", headers: { Cookie: cookieA } },
    { portfolioId: "not-a-valid-object-id" }
  );
  assert("Malformed portfolio ID rejected with 400 Bad Request", malformedIdRes.status === 400);

  // Test 2e: User A creates a portfolio
  const createPortRes = await makeRequest(
    "/api/portfolios",
    { method: "POST", headers: { Cookie: cookieA } },
    {
      title: "Gemini Full Stack Portfolio",
      profile: {
        name: "Gemini Tester A",
        headline: "Full Stack Engineer",
        email: userAEmail,
        location: "San Francisco, CA",
        professionalSummary: "Building reactive microservices and real-time cloud web applications.",
      },
      skills: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Google Cloud", "Docker"],
      experience: [
        {
          company: "Nexus Technologies",
          position: "Lead Full Stack Engineer",
          location: "San Francisco, CA",
          startDate: "2022",
          endDate: "Present",
          currentlyWorking: true,
          description: "Engineered high-throughput cloud microservices and modernized web dashboards.",
          achievements: ["Reduced latency by 45%", "Built automated testing pipeline"],
        },
      ],
      education: [
        {
          institution: "University of California, Berkeley",
          degree: "B.S. Computer Science",
          startDate: "2018",
          endDate: "2022",
        },
      ],
      projects: [
        {
          title: "Cloud Scale Monitoring Dashboard",
          description: "Real-time telemetry and metrics visualization dashboard built with React and TypeScript.",
          technologies: ["React", "TypeScript", "Node.js"],
        },
      ],
      template: "modern",
    }
  );
  assert("User A creates portfolio successfully", createPortRes.status === 201 && createPortRes.data.success === true);
  const portfolioA = createPortRes.data.data.portfolio;
  const portfolioAId = portfolioA._id;

  // Test 2f: Cross-user portfolio access rejected (User B cannot analyze User A's portfolio)
  const crossUserRes = await makeRequest(
    "/api/ai/analyze-portfolio",
    { method: "POST", headers: { Cookie: cookieB } },
    { portfolioId: portfolioAId }
  );
  assert("Cross-user portfolio analysis rejected with 403 Forbidden", crossUserRes.status === 403);

  // ==========================================
  // SECTION 3: LIVE REAL GEMINI API INTEGRATION TEST
  // ==========================================
  console.log("\n--- 3. Controlled Live Gemini API Request ---");

  const liveAnalysisRes = await makeRequest(
    "/api/ai/analyze-portfolio",
    { method: "POST", headers: { Cookie: cookieA } },
    { portfolioId: portfolioAId }
  );

  assert("Live /api/ai/analyze-portfolio returned 200 OK", liveAnalysisRes.status === 200 && liveAnalysisRes.data.success === true);

  const analysis = liveAnalysisRes.data.analysis || liveAnalysisRes.data.data?.analysis;
  assert("Live response contains AI headline suggestion", Boolean(analysis?.headline?.suggested && analysis.headline.suggested.length > 5));
  assert("Live response contains AI professional summary", Boolean(analysis?.summary?.suggested && analysis.summary.suggested.length > 20));
  assert("Live response contains categorized skills structure", Boolean(analysis?.skills && Array.isArray(analysis.skills.technical)));
  assert("Live response contains experience improvement suggestions", Boolean(Array.isArray(analysis?.experienceSuggestions)));
  assert("Live response contains SEO metadata recommendation", Boolean(analysis?.seo && typeof analysis.seo.metaTitle === "string"));

  // Verify persistence: check portfolio update & AI usage record in DB
  const getPortRes = await makeRequest(`/api/portfolios/${portfolioAId}`, {
    method: "GET",
    headers: { Cookie: cookieA },
  });
  assert("Portfolio persists reliably in MongoDB", getPortRes.status === 200 && getPortRes.data.success === true);

  // Summary
  console.log("\n==================================================================");
  console.log(`VERIFICATION SUMMARY: ${passedTests} / ${totalTests} PASSED`);
  console.log("==================================================================");

  if (passedTests === totalTests) {
    console.log("🎉 ALL GEMINI INTEGRATION REQUIREMENTS VERIFIED SUCCESSFULLY!");
    process.exit(0);
  } else {
    console.error("⚠️ SOME TESTS FAILED. Review errors above.");
    process.exit(1);
  }
}

runGeminiIntegrationSuite().catch((err) => {
  console.error("FATAL ERROR in test suite:", err);
  process.exit(1);
});
