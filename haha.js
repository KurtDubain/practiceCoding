let x = 10;
let obj = {
  x: 20,
  f: function () {
    console.log(this.x);
  },
  s: function () {
    console.log(this.x);
    function fn() {
      console.log(this.x);
    }
    return fn;
  },
};
let fn = obj.f;
fn();
// 10
obj.f();
// 20
obj.s()();
// 10 20
