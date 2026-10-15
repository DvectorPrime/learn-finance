const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9555;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendCommand(ws, method, params = {}, timeoutMs = 20000) {
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

async function test() {
  const userDataDir = path.join(__dirname, '..', '.chrome-cdp-profile-test');
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

  const newTabRes = await fetch(`http://localhost:${PORT}/json/new`, { method: 'PUT' });
  const tabData = await newTabRes.json();
  const ws = new WebSocket(tabData.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');
  
  // Listen to console messages
  ws.addEventListener('message', (event) => {
    try {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('[BROWSER CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description));
      }
    } catch {}
  });

  await sendCommand(ws, 'Page.navigate', { url: 'http://localhost:3000/lesson/L01' });
  await sleep(1500);
  await sendCommand(ws, 'Runtime.evaluate', {
    expression: "sessionStorage.setItem('learn_finance_preview_unlocked', 'true'); window.location.reload();"
  });
  await sleep(2000);

  // We are on Slide 1. Click Continue to go to Item 2 (choice_with_reflection)
  console.log('Clicking continue on Slide 1...');
  await sendCommand(ws, 'Runtime.evaluate', {
    expression: "document.querySelectorAll('button')[document.querySelectorAll('button').length - 1].click()"
  });
  await sleep(1000);

  // Now on Item 2: ChoiceWithReflection
  const item2Info = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const h2 = document.querySelector('h2')?.innerText;
      const buttons = Array.from(document.querySelectorAll('button')).map(b => ({ text: b.innerText, disabled: b.disabled }));
      const textareas = Array.from(document.querySelectorAll('textarea')).map(t => ({ placeholder: t.placeholder, value: t.value }));
      const inputs = Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, value: i.value, checked: i.checked }));
      return { h2, buttons, textareas, inputs };
    })()`,
    returnByValue: true
  });
  console.log('Item 2 State:', JSON.stringify(item2Info.result.value, null, 2));

  // Type in textarea WITHOUT selecting radio button
  console.log('Typing in textarea WITHOUT selecting radio...');
  await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const ta = document.querySelector('textarea');
      if (ta) {
        ta.value = 'Trading shirts for salt allows a common medium of exchange';
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        ta.dispatchEvent(new Event('change', { bubbles: true }));
      }
    })()`
  });
  await sleep(500);

  const check1 = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Submit'));
      return btn ? { text: btn.innerText, disabled: btn.disabled } : null;
    })()`,
    returnByValue: true
  });
  console.log('Button state after typing ONLY in textarea:', check1.result.value);

  // Now click radio button as well
  console.log('Clicking radio button A...');
  await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const input = document.querySelector('input[type="radio"]');
      if (input) {
        input.click();
      }
    })()`
  });
  await sleep(500);

  const check2 = await sendCommand(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Submit'));
      return btn ? { text: btn.innerText, disabled: btn.disabled } : null;
    })()`,
    returnByValue: true
  });
  console.log('Button state after selecting radio AND typing:', check2.result.value);

  ws.close();
  chromeProc.kill();
  try {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  } catch {}
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
