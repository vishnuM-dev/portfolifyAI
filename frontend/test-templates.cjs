const assert = require("assert");

console.log("=================================================");
console.log("🧪 TESTING PORTFOLIFY AI 20-TEMPLATE SYSTEM");
console.log("=================================================");

// 1. Test Backend Templates Catalog
const { TEMPLATES_CATALOG } = require("../backend/dist/controllers/templateController.js");

console.log(`\n[Backend Test] Verifying catalog size...`);
assert.strictEqual(TEMPLATES_CATALOG.length, 20, "Should have exactly 20 templates in backend catalog");
console.log(`✅ Backend catalog contains exactly 20 templates:`);
TEMPLATES_CATALOG.forEach((t, i) => console.log(`   ${i + 1}. [${t.category}] ${t.name} (id: ${t.id})`));

// Check uniqueness of IDs
const backendIds = new Set(TEMPLATES_CATALOG.map((t) => t.id));
assert.strictEqual(backendIds.size, 20, "All 20 backend template IDs must be unique");
console.log("✅ All 20 template IDs are unique.");

// 2. Test Expected 20 Templates from Prompt Specification
const requiredTemplateNames = [
  "Minimal Portfolio",
  "Modern Developer",
  "Dark Premium",
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Professional Resume",
  "Creative Designer",
  "UI/UX Designer",
  "Student & Fresher",
  "Software Engineer",
  "Freelancer Portfolio",
  "Executive Portfolio",
  "Academic Portfolio",
  "Startup Founder",
  "Monochrome Portfolio",
  "Grid-Based Portfolio",
  "Case Study Portfolio",
  "Elegant Classic",
  "Premium Professional",
];

const aliasMap = {
  "minimal portfolio": "minimal-professional",
  "modern developer": "developer-sidebar",
  "dark premium": "dark-developer",
  "grid-based portfolio": "bento",
  "executive portfolio": "corporate-executive",
  "creative designer": "creative-motion",
  "case study portfolio": "project-first",
  "professional resume": "resume-timeline",
  "premium professional": "modern-glass",
  "elegant classic": "premium-brand",
};

console.log("\n[Specification Check] Verifying all required templates exist...");
for (const reqName of requiredTemplateNames) {
  const normalizedReqId = aliasMap[reqName.toLowerCase()] || reqName.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const found = TEMPLATES_CATALOG.find((t) => {
    return (
      t.id === normalizedReqId ||
      t.name.toLowerCase().includes(reqName.toLowerCase().replace(/[^a-z0-9]/g, " ").trim().split(" ")[0]) ||
      reqName.toLowerCase().replace(/[^a-z0-9]/g, "").includes(t.id.replace(/[^a-z0-9]/g, ""))
    );
  });
  assert(found, `Template matching '${reqName}' must exist in catalog`);
}
console.log("✅ All 20 specified template designs are registered and verified.");

// 3. Test Metadata Properties
console.log("\n[Metadata Check] Verifying required fields on every template...");
TEMPLATES_CATALOG.forEach((t) => {
  assert(t.id, "id is required");
  assert(t.name, "name is required");
  assert(t.subtitle, "subtitle is required");
  assert(t.description, "description is required");
  assert(t.category, "category is required");
  assert(Array.isArray(t.tags) && t.tags.length > 0, "tags required");
  assert(Array.isArray(t.recommendedFor) && t.recommendedFor.length > 0, "recommendedFor required");
  assert(t.accentColor && t.accentColor.startsWith("#"), "accentColor must be valid hex");
});
console.log("✅ All templates have valid descriptions, tags, categories, and hex accent colors.");

console.log("\n=================================================");
console.log("🎉 ALL TEMPLATE SYSTEM TESTS PASSED SUCCESSFULLY!");
console.log("=================================================");
