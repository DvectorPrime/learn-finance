const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const screenshotsDir = path.join(__dirname, '..', 'screenshots');
const artifactDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\8e193345-3ef6-406b-b6ab-32f9d160558d\\screenshots';
const PORT = 9338;

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendCommand(ws, method, params = {}, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const timer = setTimeout(() => {
      ws.removeEventListener('message', handler);
      reject(new Error(`Command ${method} timed out after ${timeoutMs}ms`));
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

async function run() {
  const userDataDir = path.join(__dirname, '..', '.chrome-cdp-profile-auth-prod');
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch {}

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${userDataDir}`,
  ], { stdio: 'ignore' });

  console.log(`Spawned Chrome with CDP on port ${PORT}...`);

  let versionData = null;
  for (let i = 0; i < 30; i++) {
    await sleep(500);
    try {
      const res = await fetch(`http://localhost:${PORT}/json/version`);
      if (res.ok) {
        versionData = await res.json();
        break;
      }
    } catch {}
  }

  if (!versionData) {
    chromeProc.kill();
    throw new Error('Chrome did not start debugging endpoint in time');
  }

  console.log('Connected to Chrome CDP.');

  const targets = [
    { name: 'mobile_login_prod.png', url: 'http://localhost:3000/login' },
    { name: 'mobile_register_prod.png', url: 'http://localhost:3000/register' },
    { name: 'mobile_lesson_prod.png', url: 'http://localhost:3000/lesson/L01', isGuest: true },
  ];

  for (const target of targets) {
    console.log(`Navigating to ${target.url} for ${target.name}...`);
    const newTabRes = await fetch(`http://localhost:${PORT}/json/new`, { method: 'PUT' });
    const tabData = await newTabRes.json();
    const ws = new WebSocket(tabData.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    try {
      await sendCommand(ws, 'Page.enable');
      await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true,
      });

      if (target.isGuest) {
        await sendCommand(ws, 'Page.addScriptToEvaluateOnNewDocument', {
          source: `
            sessionStorage.setItem('learn_finance_guest_preview', 'true');
            sessionStorage.setItem('learn_finance_preview_unlocked', 'true');
          `,
        });
      }

      await sendCommand(ws, 'Page.navigate', { url: target.url });
      await sleep(target.isGuest ? 5000 : 3000);

      const screenshotResult = await sendCommand(ws, 'Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
      });

      const buffer = Buffer.from(screenshotResult.data, 'base64');
      fs.writeFileSync(path.join(screenshotsDir, target.name), buffer);
      fs.writeFileSync(path.join(artifactDir, target.name), buffer);
      console.log(`Saved screenshot: ${target.name} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Failed to capture ${target.name}:`, err);
    } finally {
      ws.close();
      await fetch(`http://localhost:${PORT}/json/close/${tabData.id}`);
    }
  }

  chromeProc.kill();
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch {}
  console.log('All screenshots captured successfully.');
}

run().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
