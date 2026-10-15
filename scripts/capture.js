const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const screenshotsDir = path.join(__dirname, '..', 'screenshots');
const artifactDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\8e193345-3ef6-406b-b6ab-32f9d160558d\\screenshots';
const PORT = 9333;

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

const targets = [
  { name: 'mobile_home_guest.png', url: 'http://localhost:3000', width: 390, height: 844, mobile: true, isGuest: true },
  { name: 'mobile_welcome.png', url: 'http://localhost:3000', width: 390, height: 844, mobile: true },
  { name: 'mobile_register.png', url: 'http://localhost:3000/register', width: 390, height: 844, mobile: true },
  { name: 'mobile_login.png', url: 'http://localhost:3000/login', width: 390, height: 844, mobile: true },
  { name: 'ipad_welcome.png', url: 'http://localhost:3000', width: 768, height: 1024, mobile: false }
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendCommand(ws, method, params = {}, timeoutMs = 35000) {
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

async function capture() {
  const userDataDir = path.join(__dirname, '..', '.chrome-cdp-profile');
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch {}

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${userDataDir}`
  ], { stdio: 'ignore' });

  console.log(`Spawned Chrome with CDP on port ${PORT}...`);
  
  let versionData = null;
  for (let i = 0; i < 20; i++) {
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

  console.log('Connected to Chrome CDP version endpoint.');

  for (const target of targets) {
    console.log(`Setting viewport and navigating to ${target.url} for ${target.name} (${target.width}x${target.height})...`);
    
    // Create blank tab
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
        width: target.width,
        height: target.height,
        deviceScaleFactor: 2,
        mobile: target.mobile
      });

      // Navigate to target URL
      await sendCommand(ws, 'Page.navigate', { url: target.url });

      if (target.isGuest) {
        await sleep(600);
        await sendCommand(ws, 'Runtime.evaluate', {
          expression: "sessionStorage.setItem('learn_finance_guest_preview', 'true'); window.location.reload();"
        });
      }

      // Poll until DOM content is ready
      for (let i = 0; i < 30; i++) {
        await sleep(500);
        try {
          const evalRes = await sendCommand(ws, 'Runtime.evaluate', {
            expression: "(!document.querySelector('.animate-spin') && !document.querySelector('svg.animate-spin')) && (!!document.querySelector('h1') || !!document.querySelector('h2') || !!document.querySelector('[data-road]'))"
          });
          if (evalRes && evalRes.result && evalRes.result.value === true) {
            break;
          }
        } catch {}
      }
      if (target.scrollY) {
        await sendCommand(ws, 'Runtime.evaluate', {
          expression: `window.scrollTo(0, ${target.scrollY})`
        });
        await sleep(600);
      }

      const screenshotResult = await sendCommand(ws, 'Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false
      });

      const buffer = Buffer.from(screenshotResult.data, 'base64');
      const outPath = path.join(screenshotsDir, target.name);
      const brainPath = path.join(artifactDir, target.name);
      fs.writeFileSync(outPath, buffer);
      fs.writeFileSync(brainPath, buffer);
      console.log(`Saved screenshot: ${outPath} & ${brainPath} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Failed to capture ${target.name}:`, err);
    } finally {
      ws.close();
      await fetch(`http://localhost:${PORT}/json/close/${tabData.id}`);
    }
  }

  console.log('All screenshots captured successfully.');
  chromeProc.kill();
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch {}
}

capture().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
