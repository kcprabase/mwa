const child_process = require("child_process");
console.log("1: Start");
const fib33 = child_process.spawn("node",
    ["fib33.js"], { stdio: "inherit" });
const fib_30 = child_process.spawn("node",
    ["fib-30.js"], { stdio: "inherit" });
console.log("2. End");