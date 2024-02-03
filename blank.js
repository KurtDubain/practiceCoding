// 1、大数相加
function bigNumAdd(str1,str2){
  const result = []
  let carry = 0
  let i = str1.length-1
  let j = str2.length-1
  while(i>=0||j>=0||carry>0){
    const num1 = i>=0?parseInt(str1[i]):0
    const num2 = j>=0?parseInt(str2[j]):0
    let sum = num1 + num2 + carry
    result.push(Math.floor(sum%10))
    carry = Math.floor(sum/10)
    i--
    j--
  }
  return result.join('')
}

// 2、instanceof手写
function NewInstanceof(obj,constructor){
  if(obj===null||typeof obj !== obj){
    return false
  }
  let prototype = Object.getPrototypeOf(obj)
  while(prototype!==null){
    if(prototype === constructor.prototype){
      return true
    }
    prototype = Object.getPrototypeOf(prototype)
  }
  return false
}
// 3、节流、防抖
function throttle(func,delay){
  let timer = null
  return function(...args){
    if(timer===null){
      timer = setTimeout(()=>{
        func.apply(this,...args)
        // clearTimeout(timer)
        timer = null
      },delay)
    }
  }
}
function debounce(func,delay){
  let timer
  return function(...args){
    clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,...args)
      clearTimeout(timer)
    },delay)
  }
}

// 5、16进制转10进制
function Ch16To10(str){
  const strArr = '0123456789ABCDEF'
  let result = 0
  for(let i = 0;i<str.length;i++){
    let curStr = str[i]
    let curNum = parseInt(strArr.indexOf(curStr.toUpperCase()))
    result = curNum + 16*result
  }
  return result
}



// 8、函数柯里化func(1)(2)(3)
function curry(func){
  return function curried(...args){
    if(args.length>=func.length){
      return func.apply(this,...args)
    }else{
      return function(...newArgs){
        curried.apply(this,args.concat(newArgs))
      }
    }
  }
}
// 9、手写Promise以及then以及All
function promiseAll(arr){
  return new Promise((resolve,reject)=>{
    if(arr.length<1){
      resolve([])
    }
    const results = []
    let count = 0
    for(let i = 0;i<arr.length;i++){
      const promise = arr[i]
      promise
        .then((result) => {
          results[i] = result
          count++
          if(count==arr.length){
            resolve(results)
          }
        }).catch((err) => {
          reject(err)
        });
    }
  })
}


// 11、实现LRU
class LRUCache{

}
// 12、call、bind、apply方法手写
function myCall(context,arg){
  context = context || window
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](arg)
  delete context[fn]
  return result
}
function myApply(context,...args){
  context = context || window
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}
function myBind(context,...args){
  const fn = this
  return function(...newArgs){
    return fn.apply(context,args.concat(newArgs))
  } 
}
// 13、深拷贝（解决循环应用）
function Deepclone(obj,visited = new Map()){
  if(obj!==null&&typeof obj==='object'){
    return obj
  }
  if(visited.has(obj)){
    return visited.get(obj)
  }
  const clone = Array.isArray(obj)?[]:{}
  visited.set(obj,clone)
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      clone[key] = Deepclone(obj[key])
    }
  }
  return clone
}

// 15、零钱兑换
function findMoney(account,coins){

}



// 19、手写new和寄生组合式继承

function myNew(constructor,...args){

}

function Person(name){
    this.name = name
}
Person.prototype.introduceMe= function(){
    console.log(`i am ${this.name}`)
}

function Child(name,sex){
    Person.call(this,name)
    this.sex = sex
}
Child.prototype = Object.create(Person.prototype)
Child.prototype.constructor = Child

Child.prototype.haha = function(){
    console.log(`i am ${this.name},i am ${this.sex}`)
}
// 20、回文链表
function isBackList(head){

}
function reverseNodeList(head){

}



// 24、最长无重复子串
function findLongStr(str){

}
// 25、千分位转换
function changeK(str){

}
// 26、括号闭合问题
function isClosed(str){

}
// 27、EventBus

// 28、Observer

// 29、Promise的retry
function retry(func,count){

}
// 30、Promise的递归调用
function DiguiPromise(arr){

}
// 31、对象扁平化
function flattenObject(obj) {

  }

  

// 33、全排列
function permute(nums) {

  }
  console.log(permute(1,2,3))

// 35、数组转树
function arrayToTree(arr) {

  }
  const arr = [
    { id: 1, parentId: null, name: 'Node 1' },
    { id: 2, parentId: 1, name: 'Node 2' },
    { id: 3, parentId: 1, name: 'Node 3' },
    { id: 4, parentId: 2, name: 'Node 4' },
    { id: 5, parentId: 2, name: 'Node 5' },
    { id: 6, parentId: 3, name: 'Node 6' },
    { id: 7, parentId: 4, name: 'Node 7' },
    { id: 8, parentId: 5, name: 'Node 8' },
  ]
//   console.log(arrayToTree(arr))



// 37、归并

function mergeSort(arr) {
  }
  
  function merge(left, right) {

  }
  
// PromiseAll并且限制并发

function limitConcurrency(arr, limit) {
    
}

