// scripts/author/build_curriculum.js
// Assembles, validates, and writes the complete Module 1 curriculum into app_info/curriculum_patched.json

const fs = require('fs');
const path = require('path');

const glossaryData = require('./glossary_data');
const ch1Lessons = require('./chapter1_lessons');
const ch2Lessons = require('./chapter2_lessons');
const ch3Lessons = require('./chapter3_lessons');
const ch4Lessons = require('./chapter4_lessons');

const rootDir = path.resolve(__dirname, '../../');
const targetFile = path.join(rootDir, 'app_info', 'curriculum_patched.json');

console.log(`[BuildCurriculum] Reading existing curriculum from ${targetFile}...`);
const raw = fs.readFileSync(targetFile, 'utf8');
const data = JSON.parse(raw);

// 1. Update Glossary
console.log(`[BuildCurriculum] Updating glossary concepts (${glossaryData.length} entries)...`);
data.glossary = data.glossary || {};
data.glossary.concepts = glossaryData;

// 2. Update Module 1 Hierarchy Titles & Descriptions
const mod1 = data.learning_track.modules[0];
mod1.title = "Foundations of Money: Value, Prices, and Trade";
mod1.subtitle = "Master the origins and functions of money, inflation, macroeconomic cycles, and behavioural decision-making.";

// Submodule 1.1: Understanding Money
const sm1 = mod1.submodules[0];
sm1.title = "Understanding Money";
// Chapter 1
const ch1 = sm1.chapters[0];
ch1.title = "The Nature and Purpose of Money";
// Chapter 2
const ch2 = sm1.chapters[1];
ch2.title = "Why Your Money Buys Less";

// Submodule 1.2: How the Economy Affects Your Pocket
const sm2 = mod1.submodules[1];
sm2.title = "How the Economy Affects Your Pocket";
// Chapter 3
const ch3 = sm2.chapters[0];
ch3.title = "The Economy and Your Pocket";

// Submodule 1.3: How People Make Money Decisions
const sm3 = mod1.submodules[2];
sm3.title = "How People Make Money Decisions";
// Chapter 4
const ch4 = sm3.chapters[0];
ch4.title = "Your Brain and Your Money";

// 3. Inject Authored Lessons into Chapters
const allAuthoredLessons = {
  ...ch1Lessons,
  ...ch2Lessons,
  ...ch3Lessons,
  ...ch4Lessons
};

console.log(`[BuildCurriculum] Injecting ${Object.keys(allAuthoredLessons).length} fully authored lessons...`);

// Chapter 1: L01, L02, L03
ch1.lessons = [allAuthoredLessons.L01, allAuthoredLessons.L02, allAuthoredLessons.L03];

// Chapter 2: L04, L05, L06, L07
ch2.lessons = [allAuthoredLessons.L04, allAuthoredLessons.L05, allAuthoredLessons.L06, allAuthoredLessons.L07];

// Chapter 3: L08, L09, L10, L11
ch3.lessons = [allAuthoredLessons.L08, allAuthoredLessons.L09, allAuthoredLessons.L10, allAuthoredLessons.L11];

// Chapter 4: L12, L13, L14, L15
ch4.lessons = [allAuthoredLessons.L12, allAuthoredLessons.L13, allAuthoredLessons.L14, allAuthoredLessons.L15];

// 4. Update Module 2 to "Coming Soon"
if (data.learning_track.modules.length > 1) {
  const mod2 = data.learning_track.modules[1];
  mod2.title = "Your Money, Your Rules (Coming Soon)";
  mod2.subtitle = "Coming soon: Budgeting systems, saving strategies, debt acceleration, and investing fundamentals.";
  console.log(`[BuildCurriculum] Marked Module 2 as Coming Soon.`);
}

// 5. Verification & Linting
console.log(`[BuildCurriculum] Running verification suite...`);

let totalLessons = 0;
let totalGroups = 0;
let totalItems = 0;
let totalSlides = 0;
let totalCases = 0;
let totalWidgets = 0;
let totalQuizzes = 0;

const pidginPattern = /\b(wetin|dey\b|wahala|no be|don make|abeg)\b/i;
const pidginIssues = [];

for (const sm of mod1.submodules) {
  for (const ch of sm.chapters) {
    for (const l of ch.lessons) {
      totalLessons++;
      for (const ct of l.contents || []) {
        for (const g of ct.groups || []) {
          totalGroups++;
          for (const it of g.items || []) {
            totalItems++;
            if (it.kind === 'slide') totalSlides++;
            if (it.kind === 'case_study') totalCases++;
            if (it.kind === 'widget') totalWidgets++;
            if (it.kind === 'quiz') totalQuizzes++;

            if (it.authoring_status !== 'authored') {
              console.warn(`[WARN] Item ${it.id} authoring_status is '${it.authoring_status}'`);
            }

            if (it.kind === 'slide_set') {
              console.error(`[ERROR] Unauthored slide_set found in ${it.id}!`);
            }

            // Check for pidgin words
            const textToCheck = JSON.stringify(it);
            const match = textToCheck.match(pidginPattern);
            if (match) {
              pidginIssues.push({ itemId: it.id, matched: match[0], snippet: textToCheck.slice(Math.max(0, match.index - 20), match.index + 30) });
            }
          }
        }
      }
    }
  }
}

console.log(`[BuildCurriculum] Module 1 Summary:`);
console.log(`  Lessons: ${totalLessons} / 15`);
console.log(`  Groups:  ${totalGroups}`);
console.log(`  Items:   ${totalItems}`);
console.log(`    Slides:      ${totalSlides}`);
console.log(`    Case Studies:${totalCases}`);
console.log(`    Widgets:     ${totalWidgets}`);
console.log(`    Quizzes:     ${totalQuizzes}`);

if (pidginIssues.length > 0) {
  console.warn(`[WARN] Found ${pidginIssues.length} potential pidgin occurrences:`);
  for (const iss of pidginIssues.slice(0, 10)) {
    console.warn(`  Item ${iss.itemId}: '${iss.matched}' in "...${iss.snippet}..."`);
  }
} else {
  console.log(`[PASS] Zero pidgin words detected across all Module 1 content!`);
}

// 6. Write back to curriculum_patched.json
console.log(`[BuildCurriculum] Writing updated curriculum to ${targetFile}...`);
fs.writeFileSync(targetFile, JSON.stringify(data, null, 2), 'utf8');
console.log(`[BuildCurriculum] Successfully updated ${targetFile}!`);
