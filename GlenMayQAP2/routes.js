// Handles routing and logging on event emitters

const fs = require("fs");
const EventEmitter = require("events");
const logEvents = require("./logEvents");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.addListener("route", (url, event, msg, statusCode) => {
  const date = new Date();
  console.log(
    date.toLocaleString() +
      " * " +
      event.toUpperCase() +
      " * " +
      statusCode +
      " * ." +
      url +
      " * " +
      msg
  );
  logEvents(url, event.toUpperCase(), msg, statusCode);
});

const indexPage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit(
    "route",
    event,
    "information",
    statusCode,
    "Home page visited."
  );
};

const newsPage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit(
    "route",
    event,
    "information",
    statusCode,
    "News page visited."
  );
};

const aboutPage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit(
    "route",
    event,
    "information",
    statusCode,
    "About page visited."
  );
};

const contactPage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit(
    "route",
    event,
    "information",
    statusCode,
    "Contact page visited."
  );
};

const subscribePage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit(
    "route",
    event,
    "information",
    statusCode,
    "Subscribe page visited."
  );
};

const noContentPage = (path, event, res) => {
  myEmitter.emit(
    "route",
    event,
    "error",
    statusCode,
    "No content to deliver, request understood."
  );
};

const fourOfourPage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit("route", event, "error", statusCode, "Page not found.");
};

const refusedPage = (path, event, res) => {
  displayFile(path, res);
  myEmitter.emit("route", event, "error", statusCode, "Access forbidden.");
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
  refusedPage,
  refusedPage,
  noContentPage,
};
