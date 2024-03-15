const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timeStart");
    resolve("success");
    console.log("timeEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
console.log(4);
