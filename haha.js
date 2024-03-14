function sum(n) {
  let currentSum = n || 0;
  function f(next) {
    if (next === undefined) return currentSum;
    currentSum += next;
    return f;
  }
  // f.toString = function () {
  //   return currentSum;
  // };
  if (n == undefined) {
    return 0;
  } else {
    return f;
  }
}

console.log(sum()); // 0
console.log(sum(1)()); // 1
console.log(sum(1)(2)(2)()); // 5
const hh = sum(1)(3);
console.log(hh()); // 4
