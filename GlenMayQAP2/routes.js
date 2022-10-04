const fs = require("fs");
const EventEmitter = require("events");
const logEvents = require("./logEvents");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.addListener("route", (url, event, msg, res) => {
  const date = new Date();
  console.log(
    date.toLocaleString() +
      " * " +
      event.toUpperCase() +
      " * " +
      res.statusCode +
      " * ." +
      url +
      " * " +
      msg
  );
  logEvents(url, event.toUpperCase(), msg, res);
});

const indexPage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit("route", event, "information", "Home page visited.");
};

const newsPage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit("route", event, "information", "News page visited.");
};

const aboutPage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit("route", event, "information", "About page visited.");
};

const contactPage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit("route", event, "information", "Contact page visited.");
};

const subscribePage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit("route", event, "information", "Subscribe page visited.");
};

const fourOfourPage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit("route", event, "error", "Page not found.");
};

const displayFile = (path, res) => {
  fs.readFile(path, function (err, data) {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.writeHead(res.statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
};

module.exports = {
  indexPage,
  aboutPage,
  contactPage,
  subscribePage,
  fourOfourPage,
  newsPage,
};
