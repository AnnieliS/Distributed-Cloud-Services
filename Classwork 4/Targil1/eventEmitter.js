const Emitter = require('events');
const moment = require('moment');
const emitter = new Emitter();

emitter.on("whats the time", () => {
console.log (`time is ${moment().format("MMM Do YY")}`);
}

)

emitter.emit("whats the time");