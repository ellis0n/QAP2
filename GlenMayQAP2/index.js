const http = require("http");
const routes = require("./routes.js");

const server = http.createServer((req, res) => {
  let path = "./views/";
  console.log(req.url, req.method);
  console.log(req);
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      routes.indexPage(path, req.url, res);
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      routes.aboutPage(path, req.url, res);
      break;
    case "/contact":
      path += "contact.html";
      res.statusCode = 200;
      routes.contactPage(path, req.url, res);
      break;
    case "/subscribe":
      path += "subscribe.html";
      res.setHeader("Set-cookie", "subscription=New");
      routes.subscribePage(path, req.url, res);
      break;
    case "/about-me":
      // this is a redirect for a deprecated route
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      routes.fourOfourPage(path, req.url, res);
      break;
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening on port 3000.");
});
