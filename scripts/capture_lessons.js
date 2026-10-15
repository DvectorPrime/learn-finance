const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const screenshotsDir = path.join(__dirname, '..', 'screenshots');
const artifactDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\8e193345-3ef6-406b-b6ab-32f9d160558d\\screenshots';
const PORT = 9444;

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}
if (!fs.existsSync(artifactDir)) {
  fs.mkdirSync(artifactDir, { recursive: true });
}

const targets = [
  {
    name: 'mobile_home_module1.png',
    url: 'http://localhost:3000',
    width: 390,
    height: 844,
    mobile: true,
    setupScript: "sessionStorage.setItem('learn_finance_guest_preview', 'true'); window.location.reload();",
  },
  {
    name: 'mobile_lesson_L01.png',
    url: 'http://localhost:3000/lesson/L01',
    width: 390,
    height: 844,
    mobile: true,
    setupScript: "sessionStorage.setItem('learn_finance_preview_unlocked', 'true');",
  },
  {
    name: 'mobile_lesson_L02.png',
    url: 'http://localhost:3000/lesson/L02',
    width: 390,
    height: 844,
    mobile: true,
    setupScript: "sessionStorage.setItem('learn_finance_preview_unlocked', 'true');",
  },
  {
    name: 'mobile_lesson_L05.png',
    url: 'http://localhost:3000/lesson/L05',
    width: 390,
    height: 844,
    mobile: true,
    setupScript: "sessionStorage.setItem('learn_finance_preview_unlocked', 'true');",
  },
  {
    name: 'mobile_lesson_L15.png',
    url: 'http://localhost:3000/lesson/L15',
    width: 390,
    height: 844,
    mobile: true,
    setupScript: "sessionStorage.setItem('learn_finance_preview_unlocked', 'true');",
  },
  {
    name: 'ipad_lesson_L01.png',
    url: 'http://localhost:3000/lesson/L01',
    width: 768,
    height: 1024,
    mobile: false,
    setupScript: "sessionStorage.setItem('learn_finance_preview_unlocked', 'true');",
  },
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
  const userDataDir = path.join(__dirname, '..', '.chrome-cdp-profile-lessons');
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

      if (target.setupScript) {
        // Navigate once to origin to set sessionStorage, then navigate to target
        await sendCommand(ws, 'Page.navigate', { url: target.url });
        await sleep(500);
        await sendCommand(ws, 'Runtime.evaluate', {
          expression: target.setupScript
        });
        await sleep(400);
      }

      await sendCommand(ws, 'Page.navigate', { url: target.url });

      // Poll until DOM content is ready and spinner is gone
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

      await sleep(1000); // Allow smooth transitions and card animations to settle

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

  console.log('All lesson screenshots captured successfully.');
  chromeProc.kill();
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch {}
}

capture().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
