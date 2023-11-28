console.log(1)
new Promise(function (resolve,reject){
  console.log(6)
  reject(true)

  window.setTimeout(function (){
    console.log(7)
    resolve(false)
  },0)

}).then(function(){
  console.log(2)
},function(){
  console.log(3)
})
console.log(4)