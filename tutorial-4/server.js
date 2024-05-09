const logEvent = require("./logEvent");
const path = require("path");
const http = require("http");
const fs = require("fs");
const fsPromise = require("fs").promises;

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

const PORT = process.env.PORT || 3500;

const serverFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromise.readFile(
      filePath,
      !contentType.includes('image') ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.log(error);
    emitter.emit("log", `${error.name}: ${error.message}`, 'errorLog.txt');
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  emitter.emit("log", `${req.url}\t${req.method}`, 'reqLog.txt')

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filepath;

  if (contentType === "text/html" && req.url === "/") {
    filepath = path.join(__dirname, "views", "index.html");
  }
  // users/users/desktop/my web/nodejs/Tutorial4/ => directory = __dirname
  // views
  //index.html

  // when ever someone inputs '/' as the url
  // the filepath = users/users/desktop/my web/nodejs/Tutorial4/views/index.html
  else if (contentType === "text/html" && req.url.slice(-1) === "/") {
    filepath = path.join(__dirname, "views", req.url);
  }
  // users/users/desktop/my web/nodejs/Tutorial4/ => directory = __dirname
  // views
  // req.url when the '/' is the last character like "/old/" or "/m/"
  //the file path = users/users/desktop/my web/nodejs/Tutorial4/views/me
  else if (contentType === "text/html") {
    filepath = path.join(__dirname, "views", req.url);
  } else {
    filepath = path.join(__dirname, req.url);
  }

  if (!extension && req.url.slice(-1) !== "/") filepath += ".html";
  //the file path = users/users/desktop/my web/nodejs/Tutorial4/views/me.html or
  //the file path = users/users/desktop/my web/nodejs/Tutorial4/views/me/
  // for example users/users/desktop/my web/nodejs/Tutorial4/views/me add .html because
  // there is no extension name and there is no "/" at the end

  const fileExists = fs.existsSync(filepath);
  // if a path for instance users/users/desktop/my-web/nodejs/Tutorial4/views/me.html is created
  // it checks our computer to see if the path is in the computer

  if (fileExists) {
    serverFile(filepath, contentType, res);
    // if the filepath  exists, then
    // now serve the everything about that file to the client side
  } else {
    switch (path.parse(filepath).base) {
      case "old-page":
        res.writeHead(301, { Location: "/new-page.html" });
        break;

      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;

      default:
        serverFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

// emitter.on("log", (msg) => logEvent(msg))

//     emitter.emit("log", "log event emitted")
