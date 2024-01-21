// 1、输出和引用类型存放顺序
// let obj1 = new Object()
// let obj2 = obj1
// obj1.name = '11'
// obj2.name = '22'
// console.log(obj1.name)
// 2、输出
// console.log(1)
// setTimeout(function(){
//     console.log(2)
// })
// new Promise(function(resolve){
//     console.log(3)
//     resolve()
// }).then(function(){
//     console.log(4)
// }).then(function(){
//     console.log(5)
// })
// console.log(6)
// 3、输出
// var names = 'windowPerson'
// let person={
//     names:'person',
//     sayName(){
//         console.log(this.names)
//     }
// }
// function say(){
//     let fun = person.sayName
//     fun()
//     person.sayName()
// }
// say()
// 4、输出
// console.log('script start')
// setTimeout(()=>{
//     console.log('setTimeout')
// })
// new Promise((resolve,reject)=>{
//     console.log('promise')
//     resolve()
// }).then(()=>{
//     console.log('promise1')
// }).then(()=>{
//     console.log('promise2')
// })
// console.log('script end')