const fibonacci = (num) => {
    if (num < 0) {
        return -1 * fibonacci(Math.abs(num))
    }
    if (num <= 2) {
        return 1;
    } else {
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
}

module.exports = fibonacci;
// console.log("Finonacci of 33 is", fibonacci(33));
// console.log("Finonacci of 30 is", fibonacci(30));
// console.log("Finonacci of -30 is", fibonacci(-30));