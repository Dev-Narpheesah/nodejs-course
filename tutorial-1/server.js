// console.log('Hello Nodejs');
// console.log('Welcome!!');

// const os = require('os')

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname)
// console.log(__filename)

const path = require("path");

const {add} = require('./math')


// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

console.log(path.parse(__filename));

console.log(add(7, 5))
// console.log(div(3, 5))
// console.log(sub(3, 5))
// console.log(mult(3, 5))
