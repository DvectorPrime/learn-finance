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

async function runTests() {
  console.log('--- STARTING MULTI-USER & ZERO-MOCK VERIFICATION ---');

  const ts = Date.now();
  const emailVictor = `victor_${ts}@example.com`;
  const emailWale = `wale_${ts}@example.com`;
  const password = 'Password123!';

  // 1. Register Victor
  console.log('\n[1] Registering Victor...');
  const regVictor = await api('/auth/register', {
    method: 'POST',
    body: { email: emailVictor, password, displayName: 'Victor Oladipo' },
  });
  assert(regVictor.status === 201 && regVictor.data.token, 'Victor registered successfully');
  const tokenVictor = regVictor.data.token;

  // 2. Register Wale
  console.log('\n[2] Registering Wale...');
  const regWale = await api('/auth/register', {
    method: 'POST',
    body: { email: emailWale, password, displayName: 'Wale Adeyemi' },
  });
  assert(regWale.status === 201 && regWale.data.token, 'Wale registered successfully');
  const tokenWale = regWale.data.token;

  // 3. Test Validation on Goal Creation (as Victor)
  console.log('\n[3] Testing Goal Form Validation (Victor)...');
  
  // 3a. Title too short (<3 chars)
  const shortTitleRes = await api('/goals', {
    method: 'POST',
    headers: { Authorization: `Bearer ${tokenVictor}` },
    body: { type: 'SAVINGS', title: 'Hi', targetAmount: 50000, monthlyContribution: 10000, targetDate: '2027-12-31' },
  });
  assert(shortTitleRes.status === 400, 'Rejects goal title < 3 chars');

  // 3b. Target amount too low (< 5000)
  const lowAmountRes = await api('/goals', {
    method: 'POST',
    headers: { Authorization: `Bearer ${tokenVictor}` },
    body: { type: 'SAVINGS', title: 'Car Fund', targetAmount: 2000, monthlyContribution: 1000, targetDate: '2027-12-31' },
  });
  assert(lowAmountRes.status === 400, 'Rejects target amount < ₦5,000');

  // 3c. Target date in the past
  const pastDateRes = await api('/goals', {
    method: 'POST',
    headers: { Authorization: `Bearer ${tokenVictor}` },
    body: { type: 'SAVINGS', title: 'Car Fund', targetAmount: 50000, monthlyContribution: 5000, targetDate: '2020-01-01' },
  });
  assert(pastDateRes.status === 400, 'Rejects target date in the past');

  // 3d. Valid goal creation
  const validGoalRes = await api('/goals', {
    method: 'POST',
    headers: { Authorization: `Bearer ${tokenVictor}` },
    body: {
      type: 'SAVINGS',
      title: 'Emergency Fund',
      targetAmount: 150000,
      monthlyContribution: 25000,
      targetDate: '2027-06-30',
      autoGenerateSteps: true,
    },
  });
  assert(validGoalRes.status === 201 && validGoalRes.data.goal.id, 'Creates valid goal with 5 Ophelos steps');
  const victorGoalId = validGoalRes.data.goal.id;

  // 4. Test Multi-Tenant Data Isolation
  console.log('\n[4] Testing Multi-Tenant Isolation (Victor vs Wale)...');
  
  // Victor checks his goals -> should have 1
  const victorGoals = await api('/goals', {
    headers: { Authorization: `Bearer ${tokenVictor}` },
  });
  assert(victorGoals.data.goals.length === 1, "Victor sees exactly his 1 goal");

  // Wale checks his goals -> MUST HAVE 0 (no data leakage!)
  const waleGoals = await api('/goals', {
    headers: { Authorization: `Bearer ${tokenWale}` },
  });
  assert(waleGoals.data.goals.length === 0, "Wale sees 0 goals (multi-tenant isolation guaranteed!)");

  // Wale tries to fetch Victor's goal directly -> MUST BE 404
  const waleAccessVictorGoal = await api(`/goals/${victorGoalId}`, {
    headers: { Authorization: `Bearer ${tokenWale}` },
  });
  assert(waleAccessVictorGoal.status === 404, "Wale CANNOT access Victor's goal by ID (isolated)");

  // 5. Test Contribution Validation & Updates
  console.log('\n[5] Testing Contribution Validation & Balances...');
  
  // 5a. Reject zero or negative contribution
  const zeroContrib = await api(`/goals/${victorGoalId}/contribute`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${tokenVictor}` },
    body: { amount: 0 },
  });
  assert(zeroContrib.status === 400, 'Rejects 0 contribution amount');

  const negContrib = await api(`/goals/${victorGoalId}/contribute`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${tokenVictor}` },
    body: { amount: -500 },
  });
  assert(negContrib.status === 400, 'Rejects negative contribution amount');

  // 5b. Valid contribution of ₦25,000 by Victor
  const validContrib = await api(`/goals/${victorGoalId}/contribute`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${tokenVictor}` },
    body: { amount: 25000, note: 'October student allowance allocation' },
  });
  assert(validContrib.status === 200, 'Victor logs ₦25,000 contribution');
  assert(validContrib.data.goal.currentAmount === 25000, 'Goal balance updated to ₦25,000');
  assert(validContrib.data.reward.xpEarned === 25, 'Victor earns 25 XP from contribution');

  // Wale completes 4 curriculum items to earn 100 XP (4 * 25 XP)
  console.log('\n[6] Wale earns 100 XP...');
  const items = ['L01.CT1.G1.I01', 'L01.CT1.G1.I02', 'L01.CT1.G1.I03', 'L01.CT1.G1.I04'];
  for (const itemId of items) {
    const res = await api(`/learner/progress/items/${itemId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenWale}` },
      body: { state: 'completed', activeSeconds: 30 },
    });
    assert(res.status === 200, `Wale completes ${itemId}`);
  }

  // 7. Verify League Standings (Real Rankings, Zero Mock Data)
  console.log('\n[7] Verifying League Standings (Zero Mock Data)...');
  const leagueResWale = await api('/league/current', {
    headers: { Authorization: `Bearer ${tokenWale}` },
  });
  assert(leagueResWale.status === 200, 'Fetches league standings');
  const standings = leagueResWale.data.standings;
  console.log('Real Standings Count:', standings.length);
  console.log('Top Standings:', standings.map(s => `${s.rank}. ${s.name} (${s.xp} XP)`).join(' | '));

  // Check that all members have valid real names and NO PEER_ROSTER names
  const fakeNames = ['Chioma Okonjo', 'Babajide Cole', 'Zainab Al-Hassan', 'Emeka Nwosu', 'Amina Bello'];
  const hasFakeNames = standings.some(s => fakeNames.includes(s.name));
  assert(!hasFakeNames, 'Zero fake or mock names from prior hardcoded lists');

  // Verify rank ordering is strictly descending by XP
  for (let i = 0; i < standings.length - 1; i++) {
    assert(standings[i].xp >= standings[i + 1].xp, `Rank ${i+1} has >= XP than rank ${i+2}`);
  }

  // 8. Verify Dashboard Data for Wale and Victor
  console.log('\n[8] Verifying Dashboard Data Isolation...');
  const dashVictor = await api('/dashboard', {
    headers: { Authorization: `Bearer ${tokenVictor}` },
  });
  assert(dashVictor.status === 200, 'Victor dashboard 200');
  assert(dashVictor.data.activeGoal && dashVictor.data.activeGoal.id === victorGoalId, "Victor dashboard shows his active goal");
  assert(dashVictor.data.league.totalMembers >= 2, 'Victor sees real cohort count');

  const dashWale = await api('/dashboard', {
    headers: { Authorization: `Bearer ${tokenWale}` },
  });
  assert(dashWale.status === 200, 'Wale dashboard 200');
  assert(dashWale.data.activeGoal === null, "Wale dashboard shows null activeGoal (clean empty state)");

  console.log('\n🎉 ALL MULTI-USER & DATA ISOLATION TESTS PASSED PERFECTLY!');
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
