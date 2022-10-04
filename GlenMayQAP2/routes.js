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
      " * ." +
      url +
      " * " +
      msg
  );
  logEvents(url, event.toUpperCase(), msg, res);
});

function indexPage(path, event, res) {
  displayFile(path, res);
  myEmitter.emit("route", event, "information", "Home page visited.");
}

function dailyPage(path, event, res) {
  displayFile(path, res);
  myEmitter.emit("route", event, "information", "Daily page visited.");
}

function aboutPage(path, event, res) {
  displayFile(path, res);
  myEmitter.emit("route", event, "information", "About page visited.");
}

function contactPage(path, event, res) {
  displayFile(path, res);
  myEmitter.emit("route", event, "information", "Contact page visited.");
}

function subscribePage(path, event, res) {
  displayFile(path, res);
  myEmitter.emit("route", event, "information", "Subscribe page visited.");
}

function fourOfourPage(path, event, res) {
  displayFile(path, res);
  myEmitter.emit("route", event, "error", "Page not found.");
}

function displayFile(path, res) {
  fs.readFile(path, function (err, data) {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.writeHead(res.statusCode, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
}

module.exports = {
  indexPage,
  aboutPage,
  contactPage,
  subscribePage,
  fourOfourPage,
  dailyPage,
};
