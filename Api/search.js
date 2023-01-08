const express = require("express");
const cheerio = require("cheerio");
const unirest = require("unirest");
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const url =
      "https://www.google.com/search?q=" + encodeURI(req.query.search);
    const response = await unirest.get(url).headers({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (HTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
    });
    const $ = cheerio.load(response.body);
    let results = [];

    $("div.MjjYud").each((i, el) => {
      if ($("div.MjjYud").length !== i + 1) {
        if ($(el).find(".lyLwlc").text()) {
          results[i] = {
            title: $(el).find(".DKV0Md").text(),
            snippet: $(el).find(".lyLwlc").text(),
            link: $(el).find(".iUh30 span").first().text(),
          };
        }
      } else {
        res.status(200).json(results);
      }
    });
  } catch (e) {
    res.status(303).json(e);
  }
});

module.exports = router;
