const http = require("http");
const fs = require("fs");
const path = require("path");

const API_BASE = "http://localhost:5000/api";

function request(url, options = {}, bodyData = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: options.method || "GET",
      headers: options.headers || {},
    };

    const req = http.request(reqOptions, (res) => {
      let raw = "";
      res.on("data", (chunk) => (raw += chunk));
      res.on("end", () => {
        let json = null;
        try {
          json = JSON.parse(raw);
        } catch {
          json = raw;
        }

        const setCookie = res.headers["set-cookie"];
        let cookie = null;
        if (setCookie) {
          cookie = setCookie.map((c) => c.split(";")[0]).join("; ");
        }

        resolve({
          status: res.statusCode,
          headers: res.headers,
          cookie,
          data: json,
        });
      });
    });

    req.on("error", reject);

    if (bodyData) {
      if (Buffer.isBuffer(bodyData)) {
        req.write(bodyData);
      } else if (typeof bodyData === "string") {
        req.write(bodyData);
      } else {
        req.write(JSON.stringify(bodyData));
      }
    }
    req.end();
  });
}

async function runStep5E2ETest() {
  console.log("=================================================");
  console.log("🚀 STARTING PORTFOLIFY AI — STEP 5 FULL E2E TEST");
  console.log("=================================================");

  const timestamp = Date.now();
  const userAEmail = `user_a_${timestamp}@test.com`;
  const userBEmail = `user_b_${timestamp}@test.com`;
  const password = "Password123!";

  // 1. Health Check
  console.log("\n[Test 1] Health Check");
  const healthRes = await request(`${API_BASE}/health`);
  console.log(`Status: ${healthRes.status}, DB: ${healthRes.data?.database}`);
  if (healthRes.status !== 200 || healthRes.data?.database !== "connected") {
    throw new Error("Health check failed!");
  }

  // 2. Register & Login User A
  console.log("\n[Test 2] Register User A");
  const regARes = await request(
    `${API_BASE}/auth/register`,
    { method: "POST", headers: { "Content-Type": "application/json" } },
    { name: "User Alpha", email: userAEmail, password }
  );
  console.log(`User A Register Status: ${regARes.status}`);
  let cookieA = regARes.cookie;
  if (!cookieA) {
    const loginARes = await request(
      `${API_BASE}/auth/login`,
      { method: "POST", headers: { "Content-Type": "application/json" } },
      { email: userAEmail, password }
    );
    cookieA = loginARes.cookie;
  }
  console.log(`User A Authenticated: ${Boolean(cookieA)}`);

  // 3. Register & Login User B
  console.log("\n[Test 3] Register User B (for cross-user isolation test)");
  const regBRes = await request(
    `${API_BASE}/auth/register`,
    { method: "POST", headers: { "Content-Type": "application/json" } },
    { name: "User Beta", email: userBEmail, password }
  );
  let cookieB = regBRes.cookie;
  if (!cookieB) {
    const loginBRes = await request(
      `${API_BASE}/auth/login`,
      { method: "POST", headers: { "Content-Type": "application/json" } },
      { email: userBEmail, password }
    );
    cookieB = loginBRes.cookie;
  }
  console.log(`User B Authenticated: ${Boolean(cookieB)}`);

  // 4. Create Portfolio from Scratch
  console.log("\n[Test 4] Create Portfolio from Scratch (User A)");
  const createRes = await request(
    `${API_BASE}/portfolios`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieA,
      },
    },
    {
      template: "professional",
      profile: {
        name: "Alpha Developer",
        headline: "Principal Systems Architect",
        professionalSummary: "Experienced engineer creating enterprise distributed systems.",
        email: userAEmail,
      },
      skills: ["TypeScript", "Node.js", "MongoDB", "Distributed Systems"],
    }
  );
  console.log(`Create Status: ${createRes.status}`);
  const portfolioA = createRes.data?.data?.portfolio;
  if (!portfolioA || !portfolioA._id) {
    throw new Error(`Failed to create portfolio: ${JSON.stringify(createRes.data)}`);
  }
  console.log(`Created Portfolio ID: ${portfolioA._id}, Slug: ${portfolioA.slug}, Status: ${portfolioA.status}`);

  // 5. Read Portfolio List for User A
  console.log("\n[Test 5] List Portfolios for User A");
  const listRes = await request(`${API_BASE}/portfolios`, {
    headers: { Cookie: cookieA },
  });
  console.log(`List Status: ${listRes.status}, Total Portfolios: ${listRes.data?.data?.portfolios?.length}`);
  if (listRes.data?.data?.portfolios?.length !== 1) {
    throw new Error("Portfolio list count mismatch!");
  }

  // 6. Update Sections (Profile, Skills, Experience, Education, Projects, Certifications, Socials)
  console.log("\n[Test 6] Update Comprehensive Portfolio Data");
  const updateRes = await request(
    `${API_BASE}/portfolios/${portfolioA._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieA,
      },
    },
    {
      profile: {
        name: "Alpha Developer, Ph.D.",
        headline: "Lead Cloud & AI Architect",
        professionalSummary: "Over 10 years of hands-on experience designing cloud microservices and scalable AI pipelines.",
        email: userAEmail,
        phone: "+1 (555) 987-6543",
        location: "Seattle, WA",
        website: "https://alpha.dev",
      },
      skills: ["Node.js", "TypeScript", "React", "Next.js", "Docker", "Kubernetes", "MongoDB Atlas"],
      experience: [
        {
          company: "Acme Cloud Corp",
          position: "Lead Architect",
          location: "Seattle, WA",
          startDate: "2021",
          endDate: "Present",
          currentlyWorking: true,
          description: "Spearheaded the migration of core services to Kubernetes.",
          achievements: ["Reduced system latency by 45%", "Built automated CI/CD pipeline"],
        },
      ],
      education: [
        {
          institution: "University of Washington",
          degree: "Master of Science",
          fieldOfStudy: "Computer Science",
          startDate: "2016",
          endDate: "2018",
          grade: "3.95 GPA",
          description: "Focused on distributed storage and networking.",
        },
      ],
      projects: [
        {
          title: "CloudScaler AI",
          description: "Autonomous autoscaling engine for high-traffic microservices.",
          technologies: ["Node.js", "TypeScript", "Kubernetes"],
          githubUrl: "https://github.com/alpha/cloudscaler",
          liveUrl: "https://cloudscaler.dev",
        },
      ],
      certifications: [
        {
          name: "AWS Certified Solutions Architect - Professional",
          issuer: "Amazon Web Services",
          issueDate: "2023",
          credentialUrl: "https://aws.amazon.com/verify/123",
        },
      ],
      socialLinks: {
        github: "https://github.com/alpha",
        linkedin: "https://linkedin.com/in/alpha",
        twitter: "https://x.com/alpha_dev",
      },
      template: "modern",
    }
  );
  console.log(`Update Status: ${updateRes.status}`);
  const updatedPortfolio = updateRes.data?.data?.portfolio;
  if (updatedPortfolio.template !== "modern" || updatedPortfolio.skills.length !== 7) {
    throw new Error("Update data verification failed!");
  }
  console.log("Updated data successfully persisted!");

  // 7. Publish Validation Check (Validation errors on missing required fields)
  console.log("\n[Test 7] Publish Validation Check (Incomplete Portfolio)");
  // Create an incomplete draft portfolio
  const incompleteRes = await request(
    `${API_BASE}/portfolios`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieA,
      },
    },
    {
      profile: { name: "", headline: "", professionalSummary: "" },
      skills: [],
    }
  );
  const incompleteId = incompleteRes.data?.data?.portfolio?._id;
  const invalidPublish = await request(
    `${API_BASE}/portfolios/${incompleteId}/publish`,
    { method: "POST", headers: { Cookie: cookieA } }
  );
  console.log(`Incomplete Publish Status: ${invalidPublish.status} (Expected 422 Unprocessable Entity)`);
  if (invalidPublish.status !== 422) {
    throw new Error("Publishing an invalid portfolio did not return 422!");
  }
  // Delete the incomplete test portfolio
  await request(`${API_BASE}/portfolios/${incompleteId}`, {
    method: "DELETE",
    headers: { Cookie: cookieA },
  });

  // 8. Publish Valid Portfolio
  console.log("\n[Test 8] Publish Valid Portfolio (User A)");
  const publishRes = await request(
    `${API_BASE}/portfolios/${portfolioA._id}/publish`,
    { method: "POST", headers: { Cookie: cookieA } }
  );
  console.log(`Publish Status: ${publishRes.status}`);
  if (publishRes.status !== 200 || publishRes.data?.data?.portfolio?.status !== "published") {
    throw new Error("Failed to publish valid portfolio!");
  }
  const publishedSlug = publishRes.data.data.portfolio.slug;
  console.log(`Portfolio is now PUBLISHED at slug: ${publishedSlug}`);

  // 9. Access Public Portfolio (Without ANY login / auth headers)
  console.log("\n[Test 9] Access Public Portfolio without Auth");
  const publicRes = await request(`${API_BASE}/public/portfolios/${publishedSlug}`);
  console.log(`Public Portfolio Status: ${publicRes.status}`);
  if (publicRes.status !== 200 || !publicRes.data?.portfolio) {
    throw new Error("Public portfolio not reachable!");
  }
  const pubData = publicRes.data.portfolio;
  console.log(`Public Name: ${pubData.profile?.name}, Template: ${pubData.template}, Skills: ${pubData.skills.length}`);
  if (pubData.userId) {
    throw new Error("Public API must NOT expose internal userId!");
  }

  // 10. Unpublish Portfolio
  console.log("\n[Test 10] Unpublish Portfolio");
  const unpublishRes = await request(
    `${API_BASE}/portfolios/${portfolioA._id}/unpublish`,
    { method: "POST", headers: { Cookie: cookieA } }
  );
  console.log(`Unpublish Status: ${unpublishRes.status}, Status: ${unpublishRes.data?.data?.portfolio?.status}`);
  if (unpublishRes.data?.data?.portfolio?.status !== "draft") {
    throw new Error("Unpublish failed to set status to draft!");
  }

  // 11. Verify Public Route is 404 when Unpublished
  console.log("\n[Test 11] Verify Public Route Returns 404 for Unpublished Portfolio");
  const publicDraftRes = await request(`${API_BASE}/public/portfolios/${publishedSlug}`);
  console.log(`Public Access Status: ${publicDraftRes.status} (Expected 404)`);
  if (publicDraftRes.status !== 404) {
    throw new Error("Unpublished portfolio is still exposed on public route!");
  }

  // 12. Re-publish for Cross-user tests
  await request(
    `${API_BASE}/portfolios/${portfolioA._id}/publish`,
    { method: "POST", headers: { Cookie: cookieA } }
  );

  // 13. Cross-User Security Test (User B trying to edit/delete/publish User A's portfolio)
  console.log("\n[Test 12] Cross-User Security & Authorization Isolation");
  
  // User B tries to GET User A's private portfolio
  const userBGet = await request(`${API_BASE}/portfolios/${portfolioA._id}`, {
    headers: { Cookie: cookieB },
  });
  console.log(`User B GET User A's Portfolio Status: ${userBGet.status} (Expected 403 or 404)`);
  if (userBGet.status !== 403 && userBGet.status !== 404) {
    throw new Error("Security Violation: User B was able to access User A's private portfolio!");
  }

  // User B tries to PUT User A's portfolio
  const userBPut = await request(
    `${API_BASE}/portfolios/${portfolioA._id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json", Cookie: cookieB },
    },
    { profile: { name: "Hacked by User B" } }
  );
  console.log(`User B PUT User A's Portfolio Status: ${userBPut.status} (Expected 403 or 404)`);
  if (userBPut.status !== 403 && userBPut.status !== 404) {
    throw new Error("Security Violation: User B was able to modify User A's portfolio!");
  }

  // User B tries to UNPUBLISH User A's portfolio
  const userBUnpublish = await request(
    `${API_BASE}/portfolios/${portfolioA._id}/unpublish`,
    { method: "POST", headers: { Cookie: cookieB } }
  );
  console.log(`User B UNPUBLISH User A's Portfolio Status: ${userBUnpublish.status} (Expected 403 or 404)`);
  if (userBUnpublish.status !== 403 && userBUnpublish.status !== 404) {
    throw new Error("Security Violation: User B was able to unpublish User A's portfolio!");
  }

  // User B tries to DELETE User A's portfolio
  const userBDelete = await request(`${API_BASE}/portfolios/${portfolioA._id}`, {
    method: "DELETE",
    headers: { Cookie: cookieB },
  });
  console.log(`User B DELETE User A's Portfolio Status: ${userBDelete.status} (Expected 403 or 404)`);
  if (userBDelete.status !== 403 && userBDelete.status !== 404) {
    throw new Error("Security Violation: User B was able to delete User A's portfolio!");
  }

  // 14. Resume Parser Extraction & Structured Parsing Test
  console.log("\n[Test 13] Resume Upload & Structured Parsing Service");
  // Test with text/plain sample resume file
  const sampleResumeContent = `
Jane Doe
Senior Full Stack Engineer
jane.doe@example.com | +1 (555) 019-2834 | New York, NY
https://github.com/janedoe | https://linkedin.com/in/janedoe

PROFESSIONAL SUMMARY
Results-driven software architect with 8+ years of expertise in building enterprise web applications and microservices using React, Node.js, and TypeScript.

SKILLS
React, Next.js, Node.js, TypeScript, Express, MongoDB, PostgreSQL, Docker, AWS, GraphQL, Tailwind CSS

EXPERIENCE
Senior Software Engineer - Tech Solutions Inc. (2020 - Present)
- Architected high-concurrency microservices processing 10M daily events.
- Led a team of 6 engineers across 3 major product releases.

Software Engineer - Innovatech Labs (2017 - 2020)
- Designed full stack REST APIs and React frontends.

EDUCATION
Bachelor of Science in Computer Science - Columbia University (2013 - 2017)
3.85 GPA

PROJECTS
TaskStream
Enterprise project management tool with live collaboration.
Technologies: React, Node.js, WebSockets, MongoDB
GitHub: https://github.com/janedoe/taskstream
Demo: https://taskstream.dev

CERTIFICATIONS
AWS Certified Developer - Associate (2022)
Meta Certified Frontend Developer (2021)
`;

  // Create temporary resume file
  const resumeFilePath = path.join(__dirname, "sample_test_resume.txt");
  fs.writeFileSync(resumeFilePath, sampleResumeContent, "utf8");

  // Call the resume parser directly via service
  const ResumeParserService = require("./dist/services/resumeParserService").ResumeParserService;
  const rawText = await ResumeParserService.extractRawText(
    Buffer.from(sampleResumeContent, "utf-8"),
    "text/plain",
    "sample_test_resume.txt"
  );
  const parsedData = ResumeParserService.parseText(rawText);

  console.log("Parsed Resume Profile Name:", parsedData.profile?.name);
  console.log("Parsed Headline:", parsedData.profile?.headline);
  console.log("Parsed Email:", parsedData.profile?.email);
  console.log("Parsed Skills Count:", parsedData.skills?.length, parsedData.skills);
  console.log("Parsed Experience Count:", parsedData.experience?.length);
  console.log("Parsed Projects Count:", parsedData.projects?.length);
  console.log("Parsed Education Count:", parsedData.education?.length);

  if (
    !parsedData.profile?.name ||
    !parsedData.skills ||
    parsedData.skills.length === 0 ||
    !parsedData.experience ||
    parsedData.experience.length === 0
  ) {
    throw new Error("Resume parsing failed to extract required sections!");
  }
  console.log("Resume extraction & structured JSON parsing: PASS");

  // Clean up test file
  if (fs.existsSync(resumeFilePath)) {
    fs.unlinkSync(resumeFilePath);
  }

  // 15. Delete Portfolio by Owner
  console.log("\n[Test 14] Delete Portfolio by Owner (User A)");
  const deleteRes = await request(`${API_BASE}/portfolios/${portfolioA._id}`, {
    method: "DELETE",
    headers: { Cookie: cookieA },
  });
  console.log(`Delete Status: ${deleteRes.status}`);
  if (deleteRes.status !== 200) {
    throw new Error("Failed to delete portfolio!");
  }

  // Verify it is gone
  const getDeleted = await request(`${API_BASE}/portfolios/${portfolioA._id}`, {
    headers: { Cookie: cookieA },
  });
  console.log(`Verify Deleted Status: ${getDeleted.status} (Expected 404)`);
  if (getDeleted.status !== 404) {
    throw new Error("Deleted portfolio is still accessible!");
  }

  console.log("\n=================================================");
  console.log("🎉 ALL 14 STEP 5 E2E TESTS PASSED SUCCESSFULLY!");
  console.log("=================================================");
}

runStep5E2ETest().catch((err) => {
  console.error("\n❌ E2E TEST FAILED:", err);
  process.exit(1);
});
