const logEvent = require("./logEvent");


const EventEmitter = require("events");

class MyEmitter extends EventEmitter{}

const emitter = new MyEmitter();

emitter.on("log", (msg) => logEvent(msg))

setImmediate(() => {
    emitter.emit("log", "log event emitted")
}, 2000)