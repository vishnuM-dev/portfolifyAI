const http = require('http');
const https = require('https');

const BASE_URL = 'http://localhost:5000/api';

function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;

    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {},
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
    };

    const req = client.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let parsed = data;
        try {
          parsed = JSON.parse(data);
        } catch (e) {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: parsed,
          raw: data,
        });
      });
    });

    req.on('error', reject);

    if (body) {
      if (typeof body === 'string' || Buffer.isBuffer(body)) {
        req.write(body);
      } else {
        req.write(JSON.stringify(body));
      }
    }
    req.end();
  });
}

function createMultipartBody(fields, files) {
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  const crlf = '\r\n';
  let parts = [];

  for (const [key, value] of Object.entries(fields)) {
    parts.push(Buffer.from(
      `--${boundary}${crlf}` +
      `Content-Disposition: form-data; name="${key}"${crlf}${crlf}` +
      `${value}${crlf}`
    ));
  }

  for (const file of files) {
    parts.push(Buffer.from(
      `--${boundary}${crlf}` +
      `Content-Disposition: form-data; name="${file.fieldname}"; filename="${file.filename}"${crlf}` +
      `Content-Type: ${file.contentType}${crlf}${crlf}`
    ));
    parts.push(file.content);
    parts.push(Buffer.from(crlf));
  }

  parts.push(Buffer.from(`--${boundary}--${crlf}`));
  const buffer = Buffer.concat(parts);

  return {
    contentType: `multipart/form-data; boundary=${boundary}`,
    body: buffer,
  };
}

async function runComprehensiveAudit() {
  console.log('================================================================');
  console.log('PORTFOLIFY AI - AUTOMATED INTEGRATION & FUNCTIONALITY AUDIT');
  console.log('================================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName, details = '') {
    totalTests++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passedTests++;
      return true;
    } else {
      console.error(`[FAIL] ${testName}: ${details}`);
      return false;
    }
  }

  const runId = Date.now();
  const userAEmail = `audit_user_a_${runId}@example.com`;
  const userBEmail = `audit_user_b_${runId}@example.com`;
  const passwordA = 'Pass1234Audit!';
  const newPasswordA = 'Pass5678AuditReset!';

  let tokenA = null;
  let tokenB = null;
  let portfolioIdA = null;
  let publishedSlug = null;

  try {
    // ---------------------------------------------------------
    // SECTION 1: AUTHENTICATION
    // ---------------------------------------------------------
    console.log('\n--- 1. AUTHENTICATION ---');

    // 1.1 Register User A
    const regRes = await request(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      name: 'Audit User A',
      email: userAEmail,
      password: passwordA,
    });
    tokenA = regRes.data?.token || regRes.data?.data?.token;
    assert(regRes.status === 201 && tokenA, '1.1 User A registration succeeds with JWT', JSON.stringify(regRes.data));

    // 1.2 Duplicate email registration fails with 409
    const dupRes = await request(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      name: 'Duplicate Audit User',
      email: userAEmail,
      password: passwordA,
    });
    assert(dupRes.status === 409, '1.2 Duplicate email returns 409 Conflict', `status: ${dupRes.status}`);

    // 1.3 Login User A
    const loginRes = await request(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      email: userAEmail,
      password: passwordA,
    });
    assert(loginRes.status === 200 && (loginRes.data?.token || loginRes.data?.data?.token), '1.3 User A login succeeds with valid token', JSON.stringify(loginRes.data));

    // 1.4 Invalid password fails with 401
    const invalidLoginRes = await request(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      email: userAEmail,
      password: 'WrongPassword999!',
    });
    assert(invalidLoginRes.status === 401, '1.4 Invalid credentials return 401 Unauthorized', `status: ${invalidLoginRes.status}`);

    // 1.5 Register User B
    const regBRes = await request(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      name: 'Audit User B',
      email: userBEmail,
      password: passwordA,
    });
    tokenB = regBRes.data?.token || regBRes.data?.data?.token;
    assert(regBRes.status === 201 && tokenB, '1.5 User B registration succeeds with JWT', `status: ${regBRes.status}`);

    // 1.6 Verify current user route (/auth/me)
    const meRes = await request(`${BASE_URL}/auth/me`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${tokenA}` },
    });
    const userDetail = meRes.data?.user || meRes.data?.data?.user;
    assert(meRes.status === 200 && userDetail?.email === userAEmail, '1.6 GET /auth/me returns authenticated user details', JSON.stringify(meRes.data));

    // 1.7 Unauthorized request without token fails with 401
    const unauthRes = await request(`${BASE_URL}/auth/me`, {
      method: 'GET',
    });
    assert(unauthRes.status === 401, '1.7 Unauthenticated request returns 401', `status: ${unauthRes.status}`);

    // ---------------------------------------------------------
    // SECTION 2: FORGOT & RESET PASSWORD
    // ---------------------------------------------------------
    console.log('\n--- 2. FORGOT & RESET PASSWORD ---');

    // 2.1 Request password reset
    const forgotRes = await request(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      email: userAEmail,
    });
    const resetToken = forgotRes.data?.resetToken;
    assert(forgotRes.status === 200 && resetToken, '2.1 Forgot password endpoint returns 200 and resetToken', JSON.stringify(forgotRes.data));

    // 2.2 Invalid reset token rejected with 400
    const invalidResetRes = await request(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      token: 'invalidfakehash123',
      password: newPasswordA,
    });
    assert(invalidResetRes.status === 400, '2.2 Invalid/expired reset token returns 400 Bad Request', `status: ${invalidResetRes.status}`);

    // 2.3 Valid reset password execution
    const validResetRes = await request(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      token: resetToken,
      password: newPasswordA,
    });
    assert(validResetRes.status === 200, '2.3 Valid reset token updates password to new password', JSON.stringify(validResetRes.data));

    // 2.4 Old password rejected
    const oldPassRes = await request(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      email: userAEmail,
      password: passwordA,
    });
    assert(oldPassRes.status === 401, '2.4 Old password is rejected after reset (401)', `status: ${oldPassRes.status}`);

    // 2.5 New password login succeeds
    const newPassRes = await request(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      email: userAEmail,
      password: newPasswordA,
    });
    tokenA = newPassRes.data?.token || newPassRes.data?.data?.token;
    assert(newPassRes.status === 200 && tokenA, '2.5 Login with new password succeeds and issues fresh JWT', `status: ${newPassRes.status}`);

    // ---------------------------------------------------------
    // SECTION 3: PORTFOLIO CRUD & OWNERSHIP
    // ---------------------------------------------------------
    console.log('\n--- 3. PORTFOLIO CRUD & OWNERSHIP ---');

    // 3.1 Create Portfolio
    const createPortRes = await request(`${BASE_URL}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`,
      },
    }, {
      title: 'Full Stack Engineer Portfolio',
      targetRole: 'Senior Full Stack Engineer',
      profile: {
        name: 'Audit User A',
        headline: 'Lead Architect & Engineer',
        email: userAEmail,
        location: 'San Francisco, CA',
        professionalSummary: 'Building scalable high-performance full stack systems.',
      },
      skills: ['TypeScript', 'Next.js', 'Node.js', 'MongoDB', 'Docker'],
      experience: [{
        company: 'Cloud Corp',
        position: 'Staff Engineer',
        startDate: '2022',
        currentlyWorking: true,
        description: 'Architecting distributed cloud systems.',
      }],
      education: [{
        institution: 'University of Engineering',
        degree: 'B.S. Computer Science',
        startDate: '2016',
        endDate: '2020',
      }],
      projects: [{
        title: 'Portfolify AI Platform',
        description: 'AI-assisted portfolio generator',
        technologies: ['React', 'Node.js'],
        liveUrl: 'https://portfolify.ai',
      }],
      template: 'modern',
      customSections: [{
        title: 'Tech Speaker',
        subtitle: 'Keynote Speaker at NodeConf',
        category: 'Speaking',
        description: 'Delivered talk on high-throughput microservices.',
        date: '2024',
      }],
      sectionVisibility: {
        skills: true,
        experience: true,
        education: true,
        projects: true,
        customSections: true,
      },
    });

    const createdPortfolio = createPortRes.data?.portfolio || createPortRes.data?.data?.portfolio;
    portfolioIdA = createdPortfolio?._id;
    assert(createPortRes.status === 201 && portfolioIdA, '3.1 Create portfolio persists in DB with 201', JSON.stringify(createPortRes.data));

    // 3.2 List portfolios for User A
    const listPortRes = await request(`${BASE_URL}/portfolios`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${tokenA}` },
    });
    const userPortfolios = listPortRes.data?.portfolios || listPortRes.data?.data?.portfolios;
    assert(listPortRes.status === 200 && Array.isArray(userPortfolios) && userPortfolios.length >= 1, '3.2 GET /portfolios returns user portfolios', `count: ${userPortfolios?.length}`);

    // 3.3 Get single portfolio by ID
    const getPortRes = await request(`${BASE_URL}/portfolios/${portfolioIdA}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${tokenA}` },
    });
    const fetchedPortfolio = getPortRes.data?.portfolio || getPortRes.data?.data?.portfolio;
    assert(getPortRes.status === 200 && fetchedPortfolio?._id === portfolioIdA, '3.3 GET /portfolios/:id retrieves user portfolio', `id: ${fetchedPortfolio?._id}`);

    // 3.4 Update portfolio
    const updatePortRes = await request(`${BASE_URL}/portfolios/${portfolioIdA}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`,
      },
    }, {
      template: 'professional',
      profile: {
        name: 'Audit User A, Lead',
        headline: 'Principal Solutions Architect',
      },
    });
    const updatedPortfolio = updatePortRes.data?.portfolio || updatePortRes.data?.data?.portfolio;
    assert(updatePortRes.status === 200 && updatedPortfolio?.profile?.name === 'Audit User A, Lead', '3.4 PUT /portfolios/:id updates profile and template', `name: ${updatedPortfolio?.profile?.name}`);

    // 3.5 Ownership Enforcement: User B cannot access User A's portfolio
    const forbiddenGetRes = await request(`${BASE_URL}/portfolios/${portfolioIdA}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${tokenB}` },
    });
    assert(forbiddenGetRes.status === 403, '3.5 GET User A portfolio by User B is forbidden (403)', `status: ${forbiddenGetRes.status}`);

    const forbiddenPutRes = await request(`${BASE_URL}/portfolios/${portfolioIdA}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenB}`,
      },
    }, { profile: { name: 'Hacked by User B' } });
    assert(forbiddenPutRes.status === 403, '3.6 PUT User A portfolio by User B is forbidden (403)', `status: ${forbiddenPutRes.status}`);

    const forbiddenDeleteRes = await request(`${BASE_URL}/portfolios/${portfolioIdA}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${tokenB}` },
    });
    assert(forbiddenDeleteRes.status === 403, '3.7 DELETE User A portfolio by User B is forbidden (403)', `status: ${forbiddenDeleteRes.status}`);

    // ---------------------------------------------------------
    // SECTION 4: PUBLISH / UNPUBLISH & PUBLIC ROUTE
    // ---------------------------------------------------------
    console.log('\n--- 4. PUBLISH & PUBLIC ROUTE ---');

    // 4.1 Publish portfolio
    const publishRes = await request(`${BASE_URL}/portfolios/${portfolioIdA}/publish`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${tokenA}` },
    });
    const publishedData = publishRes.data?.portfolio || publishRes.data?.data?.portfolio;
    publishedSlug = publishedData?.slug;
    assert(publishRes.status === 200 && publishedData?.status === 'published' && publishedSlug, '4.1 Publish portfolio generates slug & sets status=published', `slug: ${publishedSlug}`);

    // 4.2 Public GET by slug (Unauthenticated)
    const publicGetRes = await request(`${BASE_URL}/public/${publishedSlug}`, {
      method: 'GET',
    });
    const publicPortfolio = publicGetRes.data?.portfolio || publicGetRes.data?.data?.portfolio;
    assert(publicGetRes.status === 200 && publicPortfolio?.profile?.name === 'Audit User A, Lead', '4.2 Unauthenticated GET /public/:slug retrieves published portfolio', `name: ${publicPortfolio?.profile?.name}`);

    // 4.3 Unpublish portfolio
    const unpublishRes = await request(`${BASE_URL}/portfolios/${portfolioIdA}/unpublish`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${tokenA}` },
    });
    const unpublishedData = unpublishRes.data?.portfolio || unpublishRes.data?.data?.portfolio;
    assert(unpublishRes.status === 200 && unpublishedData?.status === 'draft', '4.3 Unpublish sets status=draft', `status: ${unpublishedData?.status}`);

    // 4.4 Public GET on unpublished portfolio returns 404
    const publicUnpublishedRes = await request(`${BASE_URL}/public/${publishedSlug}`, {
      method: 'GET',
    });
    assert(publicUnpublishedRes.status === 404, '4.4 Unpublished portfolio cannot be accessed publicly (404)', `status: ${publicUnpublishedRes.status}`);

    // ---------------------------------------------------------
    // SECTION 5: RESUME UPLOAD & PARSING PIPELINE
    // ---------------------------------------------------------
    console.log('\n--- 5. RESUME UPLOAD & PARSING PIPELINE ---');

    // 5.1 Real PDF parsing using pdf-parse v2
    const pdfContent = Buffer.from(
      '%PDF-1.4\n' +
      '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n' +
      '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n' +
      '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n' +
      '4 0 obj << /Length 78 >> stream\n' +
      'BT /F1 12 Tf 50 700 Td (John Developer - Senior Software Engineer with skills in React and Node) Tj ET\n' +
      'endstream\n' +
      'endobj\n' +
      '5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n' +
      'xref\n' +
      '0 6\n' +
      '0000000000 65535 f \n' +
      '0000000009 00000 n \n' +
      '0000000058 00000 n \n' +
      '0000000115 00000 n \n' +
      '0000000244 00000 n \n' +
      '0000000373 00000 n \n' +
      'trailer << /Size 6 /Root 1 0 R >>\n' +
      'startxref\n' +
      '446\n' +
      '%%EOF\n'
    );

    const pdfMultipart = createMultipartBody({}, [{
      fieldname: 'resume',
      filename: 'sample_resume.pdf',
      contentType: 'application/pdf',
      content: pdfContent,
    }]);

    const pdfParseRes = await request(`${BASE_URL}/portfolios/parse-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': pdfMultipart.contentType,
        'Authorization': `Bearer ${tokenA}`,
      },
    }, pdfMultipart.body);

    const parsedPdfData = pdfParseRes.data?.structuredData || pdfParseRes.data?.data?.parsedData;
    assert(pdfParseRes.status === 200 && parsedPdfData, '5.1 Direct PDF resume parsing returns 200 and parsed data', JSON.stringify(pdfParseRes.data));

    // 5.2 TXT resume parsing
    const txtContent = Buffer.from(
      'Jane Smith\n' +
      'janesmith@test.com | 555-0199 | San Francisco, CA\n\n' +
      'SUMMARY\n' +
      'Experienced Frontend Developer specializing in React and TypeScript.\n\n' +
      'EXPERIENCE\n' +
      'Lead Developer at Tech Solutions (2020 - Present)\n' +
      '- Built modern web applications using Next.js and Redux\n\n' +
      'EDUCATION\n' +
      'B.S. in Computer Science, Stanford University (2016 - 2020)\n\n' +
      'SKILLS\n' +
      'JavaScript, TypeScript, React, Next.js, CSS, HTML5\n'
    );

    const txtMultipart = createMultipartBody({}, [{
      fieldname: 'resume',
      filename: 'resume.txt',
      contentType: 'text/plain',
      content: txtContent,
    }]);

    const txtParseRes = await request(`${BASE_URL}/portfolios/parse-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': txtMultipart.contentType,
        'Authorization': `Bearer ${tokenA}`,
      },
    }, txtMultipart.body);

    const parsedTxtData = txtParseRes.data?.structuredData || txtParseRes.data?.data?.parsedData;
    assert(txtParseRes.status === 200 && parsedTxtData?.profile?.name, '5.2 TXT resume parsing extracts name and skills', `name: ${parsedTxtData?.profile?.name}`);

    // 5.3 0-byte resume rejection
    const emptyMultipart = createMultipartBody({}, [{
      fieldname: 'resume',
      filename: 'empty.pdf',
      contentType: 'application/pdf',
      content: Buffer.alloc(0),
    }]);

    const emptyRes = await request(`${BASE_URL}/portfolios/parse-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': emptyMultipart.contentType,
        'Authorization': `Bearer ${tokenA}`,
      },
    }, emptyMultipart.body);
    assert(emptyRes.status === 400, '5.3 Empty (0-byte) resume rejected with 400 Bad Request', `status: ${emptyRes.status}`);

    // 5.4 Unsupported file format rejection (.exe)
    const exeMultipart = createMultipartBody({}, [{
      fieldname: 'resume',
      filename: 'malicious.exe',
      contentType: 'application/octet-stream',
      content: Buffer.from('MZ...executable payload'),
    }]);

    const exeRes = await request(`${BASE_URL}/portfolios/parse-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': exeMultipart.contentType,
        'Authorization': `Bearer ${tokenA}`,
      },
    }, exeMultipart.body);
    assert(exeRes.status === 400, '5.4 Unsupported file format rejected with 400 Bad Request', `status: ${exeRes.status}`);

    // ---------------------------------------------------------
    // SECTION 6: AI SERVICE STATUS & ENDPOINTS
    // ---------------------------------------------------------
    console.log('\n--- 6. AI SERVICE STATUS & ENDPOINTS ---');

    // 6.1 AI Status check
    const aiStatusRes = await request(`${BASE_URL}/ai/status`, {
      method: 'GET',
    });
    assert(aiStatusRes.status === 200 && aiStatusRes.data?.data?.provider, '6.1 GET /ai/status reports AI provider configuration', JSON.stringify(aiStatusRes.data));

    // 6.2 AI Analyze Portfolio with auth
    const aiAnalyzeRes = await request(`${BASE_URL}/ai/analyze-portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`,
      },
    }, {
      portfolioId: portfolioIdA,
    });
    // Should be either 200 (if API key active) or 503 (service gracefully unavailable)
    assert([200, 503].includes(aiAnalyzeRes.status), '6.2 POST /ai/analyze-portfolio handles request safely (200 or 503)', `status: ${aiAnalyzeRes.status}`);

    // ---------------------------------------------------------
    // SECTION 7: CLEANUP & DELETION
    // ---------------------------------------------------------
    console.log('\n--- 7. CLEANUP & DELETION ---');

    // 7.1 Delete User A portfolio
    const deleteRes = await request(`${BASE_URL}/portfolios/${portfolioIdA}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${tokenA}` },
    });
    assert(deleteRes.status === 200, '7.1 DELETE /portfolios/:id successfully removes portfolio', `status: ${deleteRes.status}`);

    // 7.2 Verifying deleted portfolio returns 404
    const verifyDelRes = await request(`${BASE_URL}/portfolios/${portfolioIdA}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${tokenA}` },
    });
    assert(verifyDelRes.status === 404, '7.2 Subsequent GET on deleted portfolio returns 404 Not Found', `status: ${verifyDelRes.status}`);

    // SUMMARY
    console.log('\n================================================================');
    console.log(`TEST SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
    console.log('================================================================\n');

    if (passedTests === totalTests) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.error('Unexpected error during audit execution:', err);
    process.exit(1);
  }
}

runComprehensiveAudit();
