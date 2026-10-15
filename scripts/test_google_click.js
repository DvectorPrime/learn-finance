const { spawn } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9335;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendCommand(ws, method, params = {}, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const timer = setTimeout(() => {
      ws.removeEventListener('message', handler);
      reject(new Error(`Command ${method} timed out`));
    }, timeoutMs);

    const handler = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          clearTimeout(timer);
          ws.removeEventListener('message', handler);
          if (msg.error) {
            reject(new Error(msg.error.message));
          } else {
            resolve(msg.result);
          }
        }
      } catch (err) {}
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function testClick() {
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`
  ], { stdio: 'ignore' });

  for (let i = 0; i < 20; i++) {
    await sleep(400);
    try {
      const res = await fetch(`http://localhost:${PORT}/json/version`);
      if (res.ok) break;
    } catch {}
  }

  const newTabRes = await fetch(`http://localhost:${PORT}/json/new`, { method: 'PUT' });
  const tabData = await newTabRes.json();
  const ws = new WebSocket(tabData.webSocketDebuggerUrl);

  await new Promise((resolve) => ws.onopen = resolve);

  const consoleLogs = [];
  ws.addEventListener('message', (event) => {
    try {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
        consoleLogs.push(`[BROWSER CONSOLE] ${msg.params.type}: ${text}`);
      }
    } catch {}
  });

  await sendCommand(ws, 'Runtime.enable');
  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Page.navigate', { url: 'http://localhost:3000/login' });

  await sleep(3000);

  // Evaluate Google client id in window
  const envCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: "({ googleClientId: process?.env?.NEXT_PUBLIC_GOOGLE_CLIENT_ID, hasGoogleScript: !!window.google, hasAccounts: !!window.google?.accounts })",
    returnByValue: true
  });
  console.log('Client env check:', envCheck.result.value);

  // Click the Google button
  const clickRes = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('button[aria-label="Continue with Google"]');
      if (!btn) return 'Button not found';
      btn.click();
      return 'Button clicked';
    })()`,
    returnByValue: true
  });
  console.log('Click result:', clickRes.result.value);

  await sleep(3000);

  // Check if modal popped up or what is on screen
  const domCheck = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const modal = document.querySelector('.fixed.inset-0');
      const modalText = modal ? modal.innerText : null;
      return { hasModal: !!modal, modalText };
    })()`,
    returnByValue: true
  });
  console.log('DOM check after click:', domCheck.result.value);

  console.log('\n--- Captured Browser Logs ---');
  consoleLogs.forEach(l => console.log(l));

  chromeProc.kill();
}

testClick().catch(console.error);
