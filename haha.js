async function a() {
  console.log(1);
  await b();
  console.log(2);
}
async function b() {
  new Promise((resolve, reject) => {
    console.log(3);
    resolve(4);
    console.log(5);
  })
    .then((val) => {
      console.log(val);
      throw new Error(6);
    })
    .catch((err) => {
      console.log(err);
    });
}
console.log(7);
a();
setTimeout(() => {
  console.log(8);
}, 0);
const p = new Promise((resolve, reject) => {
  console.log(9);
  resolve(10);
}).then((val) => {
  console.log(val);
});
p.then((val) => {
  console.log("p:then", val);
});
console.log("script end");

// 7 1 3 9 script end
