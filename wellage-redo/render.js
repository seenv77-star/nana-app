const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ deviceScaleFactor: 1 });
  await p.goto('file://' + process.cwd() + '/mock.html');
  await p.waitForTimeout(500);
  for (const id of ['img2', 'img3', 'aplus']) await p.locator('#' + id).screenshot({ path: id + '.png' });
  await b.close();
})();
