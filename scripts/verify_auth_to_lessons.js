const http = require('http');

async function api(path, options = {}) {
  const url = `http://localhost:5000/api${path}`;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, ok: res.ok, data };
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

async function run() {
  console.log('=====================================================');
  console.log('   PRODUCTION READINESS TEST: AUTH TO LESSON FLOW   ');
  console.log('=====================================================\n');

  // STEP 1: Verify /api/auth/reset completely wipes database
  console.log('[STEP 1] Testing /api/auth/reset wipes all data...');
  const resetRes = await api('/auth/reset', { method: 'POST' });
  assert(resetRes.status === 200 && resetRes.data.ok === true, 'Database reset endpoint returns 200 OK');

  // STEP 2: Verify Google Authentication endpoint rejects fake/test tokens
  console.log('\n[STEP 2] Testing Google OAuth strict token verification (Zero Mock/Bypass)...');
  
  const emptyGoogleRes = await api('/auth/google', {
    method: 'POST',
    body: {},
  });
  assert(emptyGoogleRes.status === 400, 'Rejects empty Google auth request (400)');

  const fakeIdTokenRes = await api('/auth/google', {
    method: 'POST',
    body: { idToken: 'fake_jwt_token_12345' },
  });
  assert(fakeIdTokenRes.status === 401, 'Rejects bogus Google ID Token (401 Unauthorized)');

  const fakeAccessTokenRes = await api('/auth/google', {
    method: 'POST',
    body: { accessToken: 'ya29.fake_access_token_67890' },
  });
  assert(fakeAccessTokenRes.status === 401, 'Rejects bogus Google Access Token (401 Unauthorized)');

  // STEP 3: Register a real user
  console.log('\n[STEP 3] Registering fresh production user...');
  const userEmail = `learner_${Date.now()}@testdomain.com`;
  const userPassword = 'SecurePassword2026!';
  const userDisplayName = 'Zainab Financial';

  const registerRes = await api('/auth/register', {
    method: 'POST',
    body: { email: userEmail, password: userPassword, displayName: userDisplayName },
  });
  assert(registerRes.status === 201 && registerRes.data.token, 'User registered successfully and received JWT');
  const token = registerRes.data.token;
  const user = registerRes.data.user;
  assert(user.email === userEmail, 'User email matches registration');
  assert(user.displayName === userDisplayName, 'Display name matches registration');

  // STEP 4: Login with credentials
  console.log('\n[STEP 4] Logging in with email & password...');
  const loginRes = await api('/auth/login', {
    method: 'POST',
    body: { email: userEmail, password: userPassword },
  });
  assert(loginRes.status === 200 && loginRes.data.token, 'User logged in successfully');
  const sessionToken = loginRes.data.token;

  // STEP 5: Auth verification with /me
  console.log('\n[STEP 5] Verifying session with /api/auth/me...');
  const meRes = await api('/auth/me', {
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  assert(meRes.status === 200 && meRes.data.user.id === user.id, 'Session verified via /api/auth/me');

  // STEP 6: Check Clean Empty State on Dashboard
  console.log('\n[STEP 6] Verifying dashboard has zero hardcoded/mock data...');
  const dashRes = await api('/dashboard', {
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  assert(dashRes.status === 200, 'Dashboard returned 200 OK');
  assert(dashRes.data.profile.totalXpEarned === 0, 'Initial XP is 0 (clean state)');
  assert(dashRes.data.profile.acornBalance === 0, 'Initial acorn balance is 0 (clean state)');
  assert(dashRes.data.activeGoal === null, 'Active goal is null (clean empty state)');

  // STEP 7: Fetch Curriculum & Lessons
  console.log('\n[STEP 7] Fetching curriculum lessons...');
  const currRes = await api('/curriculum/lessons');
  assert(currRes.status === 200 && currRes.data.lessons.length >= 21, 'Curriculum returned all 21 lessons');
  
  const lesson1 = currRes.data.lessons.find((l) => l.id === 'L01');
  assert(lesson1 !== undefined, 'Lesson 1 found in curriculum');
  console.log(`  Lesson 1 Title: "${lesson1.title}"`);
  console.log(`  Lesson 1 Groups: ${lesson1.groups.length}`);

  // STEP 8: Progress through Lesson 1 items
  console.log('\n[STEP 8] Progressing through Lesson 1 Items...');
  const item1Id = lesson1.groups[0].items[0].id;
  console.log(`  Completing Item 1: ${item1Id}`);

  const completeItem1 = await api(`/learner/progress/items/${item1Id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${sessionToken}` },
    body: { state: 'completed', activeSeconds: 45 },
  });
  assert(completeItem1.status === 200, 'Item 1 marked completed');

  // Check state update
  const stateRes1 = await api('/learner/state', {
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  assert(stateRes1.status === 200, 'Learner state fetched');
  assert(stateRes1.data.items_progress[item1Id].state === 'completed', 'Item 1 is recorded in SQLite as completed');
  assert(stateRes1.data.total_xp_earned === 25, 'Learner awarded 25 XP for item completion');
  assert(stateRes1.data.acorn_balance === 5, 'Learner awarded 5 acorns for item completion');

  // Complete Item 2
  const item2Id = lesson1.groups[0].items[1].id;
  console.log(`  Completing Item 2: ${item2Id}`);
  const completeItem2 = await api(`/learner/progress/items/${item2Id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${sessionToken}` },
    body: { state: 'completed', activeSeconds: 30 },
  });
  assert(completeItem2.status === 200, 'Item 2 marked completed');

  // STEP 9: Submit Assessment Attempt
  console.log('\n[STEP 9] Submitting assessment attempt...');
  // Find an assessment in lesson 1
  const assessmentId = lesson1.lesson_assessment?.id || 'L01.AS1';
  console.log(`  Submitting assessment: ${assessmentId}`);

  const assessSubmitRes = await api(`/learner/assessments/${assessmentId}/submit`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${sessionToken}` },
    body: {
      responses: [
        { prompt_id: 'P1', response: 'store_of_value' },
        { prompt_id: 'P2', response: 'medium_of_exchange' },
      ],
      activeSeconds: 60,
    },
  });
  assert(assessSubmitRes.status === 200, 'Assessment submitted and graded');
  assert(assessSubmitRes.data.attempt && assessSubmitRes.data.attempt.attempt_id, 'Attempt recorded');

  // Verify updated XP & state in Dashboard
  const dashRes2 = await api('/dashboard', {
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  assert(dashRes2.data.profile.totalXpEarned >= 50, 'Total XP incremented in dashboard');
  console.log(`  Updated XP: ${dashRes2.data.profile.totalXpEarned}`);
  console.log(`  Updated Acorns: ${dashRes2.data.profile.acornBalance}`);

  // STEP 10: Test Reset Button Endpoint Again
  console.log('\n[STEP 10] Testing "Reset data & start fresh" /auth/reset...');
  const finalReset = await api('/auth/reset', { method: 'POST' });
  assert(finalReset.status === 200 && finalReset.data.ok === true, 'Reset endpoint wiped all tables');

  // Check that prior user token is now invalid / user not found
  const meAfterReset = await api('/auth/me', {
    headers: { Authorization: `Bearer ${sessionToken}` },
  });
  assert(meAfterReset.status === 401 || meAfterReset.status === 404, 'Prior user is completely wiped from database');

  console.log('\n=====================================================');
  console.log('   🎉 ALL AUTH & LESSON PRODUCTION TESTS PASSED!    ');
  console.log('=====================================================');
}

run().catch((e) => {
  console.error('Test failed with error:', e);
  process.exit(1);
});
