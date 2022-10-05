// Written by Glen May, 2022-10-04
// Creates a server with simple routing

const http = require("http");
const routes = require("./routes.js");
// This is the "daily" module
const { news } = require("./news.js");

//Instantiate server
const server = http.createServer(async (req, res) => {
  let path = "./views/";
  let newsPromise = await news();
  console.log(req.url, req.method);
  switch (req.url) {
    //Index page
    case "/":
      path += "homepage.html";
      res.statusCode = 200;
      statusCode = res.statusCode;
      routes.indexPage(path, req.url, res);
      break;
    // Stringified JSON not parsed, unsure how to integrate with HTML using res.write()
    case "/news":
      path += "news.html";
      res.statusCode = 200;
      statusCode = res.statusCode;
      res.writeHead(res.statusCode, { "Content-Type": "application/json" });
      res.write(newsPromise);
      routes.contactPage(path, req.url, res);
      res.end;
      break;
    // About page
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      statusCode = res.statusCode;
      routes.aboutPage(path, req.url, res);
      break;
    // Contact
    case "/contact":
      path += "contact.html";
      res.statusCode = 200;
      statusCode = res.statusCode;
      routes.contactPage(path, req.url, res);
      break;
    // Subscribe (set cookies, should be on event separate)
    case "/subscribe":
      path += "subscribe.html";
      res.statusCode = 200;
      statusCode = res.statusCode;
      res.setHeader("Set-cookie", "subscription=New");
      routes.subscribePage(path, req.url, res);
      break;
    // Deprecated link, redirect with code
    case "/bio":
      res.statusCode = 301;
      statusCode = res.statusCode;
      res.setHeader("Location", "/about");
      res.end();
      break;
    // No content to return, page doesnt change or reload
    case "/nocontent":
      res.statusCode = 204;
      statusCode = res.statusCode;
      routes.noContentPage(statusCode);
      res.end();
      break;
    case "/forbidden":
      path += "forbidden.html";
      res.statusCode = 403;
      statusCode = res.statusCode;
      routes.forbiddenPage(path, req.url, res, statusCode);
      res.end();
      break;
    case "/refused":
      path += "refused.html";
      res.statusCode = 401;
      statusCode = res.statusCode;
      routes.refusedPage(path, req.url, res, statusCode);
      break;
    // No page found 404
    default:
      path += "404.html";
      res.statusCode = 404;
      statusCode = res.statusCode;
      routes.fourOfourPage(path, req.url, res, statusCode);
      break;
  }
});

server.listen(3000, "localhost", () => {
  console.log("Listening on port 3000.");
});
