const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("7b4790d43cee4409b2997a81ec30e7dc");

async function news() {
  let result;
  let array = [];
  await newsapi.v2
    .topHeadlines({
      q: "ukraine",
      category: "politics",
      language: "en",
      country: "us",
    })
    .then((response) => {
      result = JSON.stringify(response.articles);
    });
  return result;
}

module.exports = { news };
