var buzzfeed = require("buzzfeed-headlines");

buzzfeed(function (err, headlines) {
  console.log(headlines);
  // an array of rediculous headlines
});
