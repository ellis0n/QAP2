const fs = require("fs");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// load the logEvents module
const logEvents = require("./logEvents");

myEmitter.addListener("route", (event, level, msg) => {
  const d = new Date();
  console.log(d.toLocaleString() + " * " + level.toUpperCase() + " * " + msg);
  logEvents(event, level, msg);
});

// this is the index page
function indexPage(path, event, response) {
  displayFile(path, response);
  myEmitter.emit("route", event, "information", "the home page was visited.");
}

//this is the about page
function aboutPage(path, event, response) {
  displayFile(path, response);
  myEmitter.emit("route", event, "information", "the about page was visited.");
}

function contactPage(path, event, response) {
  displayFile(path, response);
  myEmitter.emit(
    "route",
    event,
    "information",
    "the contact page was visited."
  );
}

function subscribePage(path, event, response) {
  displayFile(path, response);
  myEmitter.emit(
    "route",
    event,
    "information",
    "the subscribe page was visited."
  );
}

function fourOfourPage(path, event, response) {
  displayFile(path, response);
  myEmitter.emit(
    "route",
    event,
    "error",
    "a routing error occured for the " + event + " route."
  );
}

function displayFile(path, response) {
  fs.readFile(path, function (err, data) {
    if (err) {
      console.log(err);
      response.end();
    } else {
      //console.log('file was served.')
      response.writeHead(response.statusCode, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    }
  });
}

module.exports = {
  indexPage,
  aboutPage,
  contactPage,
  subscribePage,
  fourOfourPage,
};
