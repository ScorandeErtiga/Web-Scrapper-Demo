const puppeteer = require("puppeteer");

module.exports.getPrice = async (url) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true
  });
  try {
    console.log("start");

    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
    );
    //var url = "https://www.amazon.in/Samsung-Fully-Automatic-WA62M4100HY-TL-Imperial/dp/B0747XV38N/ref=sr_1_1?dchild=1&pf_rd_p=2890ff01-c470-4516-a2eb-887bd7e4c219&pf_rd_r=8D5T0MDG7Q78G81Z2XW9&qid=1592564346&refinements=p_85%3A10440599031&rps=1&s=kitchen&sr=1-1";
    await page.goto(url);
    const priceElement = await page.$("#priceblock_ourprice");
    const strPrice = await (await priceElement.getProperty("textContent")).jsonValue();
    var refinedPrice = strPrice.replace(/,|₹| /g,'');
    const price = parseFloat(refinedPrice);
    await browser.close();
    console.log(price);
    return price;
    } catch (err) {
        console.log(err.message);
        await browser.close();
  }
};