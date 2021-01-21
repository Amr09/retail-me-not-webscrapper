const playwright = require("playwright");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

async function getData() {
  const browser = await playwright.chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.retailmenot.com/view/doordash.com");
  const dataScriptSelector = "#__NEXT_DATA__";
  await page.waitForTimeout(500);
  let data = await page.$(dataScriptSelector);
  let text = await data.innerHTML();
  let jsonData = await JSON.parse(text);
  await browser.close();
  return jsonData;
}

app.get("/", async function (req, res) {
  res.send(await getData());
  res.end();
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
