const http = require("http");
const routes = require("./routes.js");
const { news } = require("./news.js");

const server = http.createServer(async (req, res) => {
  let path = "./views/";
  let newsPromise = await news();
  console.log(req.url, req.method);
  switch (req.url) {
    case "/":
      path += "homepage.html";
      res.statusCode = 200;
      routes.indexPage(path, req.url, res, res.statusCode);
      break;
    case "/news":
      path += "news.html";
      res.statusCode = 200;
      res.writeHead(res.statusCode, { "Content-Type": "application/json" });
      res.write(newsPromise);
      routes.contactPage(path, req.url, res);
      res.end;
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
      res.statusCode = 200;
      res.setHeader("Set-cookie", "subscription=New");
      routes.subscribePage(path, req.url, res);
      break;
    case "/bio":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    case "/news":
      path += "news.html";
      res.statusCode = 200;
      routes.newsPage(path, req.url, res);
      break;
    case "/nocontent":
      path += path;
      res.statusCode = 204;
      console.log(
        `Content recieved, no need to send data back. Error code: ${res.statusCode}`
      );
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
  console.log("Listening on port 3000.");
});
