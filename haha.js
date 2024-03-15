var num = 1;
var obj = {
  num: 4,
  dbl: (function () {
    this.num *= 2;
    return function () {
      this.num *= 2;
    };
  })(),
};
var obj1 = obj.dbl;
obj1();
// obj.dbl();
// console.log(obj1());
// console.log(obj.dbl()());
console.log(num);
