// 1、大数相加
function bigNumAdd(str1,str2){
    let i = str1.length-1
    let j = str2.length-1
    let result = []
    let add = 0
    while(i>=0||j>=0||add>0){
        let curStr1 = i>=0?parseInt(str1[i]):0
        let curStr2 = j>=0?parseInt(str2[j]):0
        const sum = Math.floor(curStr1+curStr2+add)%10
        result.unshift(sum)
        add = Math.floor(curStr1+curStr2)/10
        i--
        j--
    }
    return result.join('')
}

// 2、instanceof手写
function NewInstanceof(obj,constructor){
    if(obj===null||typeof obj !=="object"){
        return false
    }
    let prototype = Object.getPrototypeOf(obj)
    while(prototype!==null){
        if(prototype===constructor.prototype){
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
        if(!timer){
            timer = setTimeout(()=>{
                func.apply(this,...args)
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
        },delay)
    }
}
// 4、对象的dfs（递归、非递归）和bfs和层级遍历多叉树
function dfsObj1(obj){
    if(!obj){
        return null
    }
    console.log(obj)
    for(let key in obj){
        if(typeof(obj[key])==='object'&&obj[key]!==null){
            dfsObj1(obj[key])
        }
    }
    
}
function dfsObj2(obj){
    if(!obj){
        return null
    }
    const stack = [obj]
    while(stack>0){
        const curObj = stack.pop()
        console.log(curObj)
        for(let key in curObj){
            if(typeof(curObj[key])==="object"&&curObj[key]!==null){
                stack.push(curObj[key])
            }
        }
    }
}
function bfsObj(obj){

}
function bfsMuchTree(root){

}
// 5、16进制转10进制
function Ch16To10(str){
    let str = '0123456789ABCDEF'
    let result = 0
    for(let i = 0;i<str.length;i++){
        const curNum = str[i]
        const curInt = str.indexOf(curNum.toUpperCase())
        result = result+16*curInt
    }
    return result
}
// 6、解析数组（JSON.parse）
function parseArr(str){
  let index = 0
  function parse(){
      const result = []
      while(index < str.length){
          const char = str[index]
          if(char === '['){
              index++
              result.push(parse())
          }else if(char === ']'){
              index++
              break
          }else if(char === ','){
              index++
          }else{
              let value = ''
              while(index<str.length&&str[index]!==','&&str[index]!==']'){
                  value += str[index]
                  index++
              }
              result.push(parseVal(value))
          }
          
      }
      return result
      function parseVal(value){
          if(!isNaN(value)){
              return Number(value)
          }
          if(value.startsWith('"')&&value.endsWith('"')&&value.length>=2){
              return value.slice(1,-1)
          }
          return value
      }
      
  }
  return parse()
}

// 7、手写固定和
function findSum(arr,target){
    const map = new Map()
    const result = []
    for(let i = 0;i<arr.length;i++){
        if(map.has(target-arr[i])){
            result.push([arr[i],target-arr[i]])
        }
        map.set(arr[i],arr[i])
    }
    return result
}
// 8、函数柯里化func(1)(2)(3)
function curry(func){
    return function curried(...args){
        if(args.length>=func.length){
            return func.apply(this,args)
        }else{
            return function(...newArgs){
                return curried.apply(this,args.concat(newArgs))
            }
        }
    }
}
// 9、手写Promise以及then以及All
function promiseAll(arr){
    return new Promise((resolve,reject)=>{
        let count = 0
        if(arr.length<1){
            resolve([])
        }
        const results = []
        for(let i = 0;i<arr.length;i++){
            arr[i]
            .then((result)=>{
                count++
                results[i] = result
                if(count===arr.length){
                    resolve(results)
                }
            })
            .catch(error=>{
                reject(error)
            })
        }
    })
}

// 10、长字符串在长文本中的查找
function findLongStr(strDad,strSon){

}
// 11、实现LRU
class LRUCache{
    constructor(capcity){
        this.capcity = capcity
        this.cache = new Map()
    }
    get(key){
        if(this.cache.has(key)){
            const curKeyVal = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key,curKeyVal)
            return curKeyVal
        }
        return -1
    }
    add(key,value){
        if(this.cache.has(key)){
            this.cache.delete(key)
        }else{
            if(this.cache.size>this.capcity){
                const lastKey = this.cache.keys().next().value
                this.cache.delete(lastKey)
            }
        }
        this.cache.set(key,value)
    }
    delete(key){
        if(this.cache.has(key)){
            this.cache.delete(key)
        }
    }
}
// 12、call、bind、apply方法手写
function myCall(context,arg){
    context = context||window
    const fn = Symbol('fn')
    context[fn] = this
    const result = context[fn](arg)
    delete context[fn]
    return result
}
function myApply(context,...args){
    context = context||window
    const fn = Symbol('fn')
    context[fn]=this
    const result = context[fn](...args)
    delete context[fn]
    return result
}
// 13、深拷贝（解决循环应用）
function Deepclone(obj,visited = new Map()){
    if(typeof obj !=='object'||obj===null){
        return obj
    }
    if(visited.has(obj)){
        return visited.get(obj)
    }
    const cloneObj = Array.isArray(obj)?[]:{}
    visited.set(obj,cloneObj)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            cloneObj[key] = Deepclone(obj[key],visited)
        }
    }
    return cloneObj
}
// 14、翻转二叉树
function reverseTree(root){
    
}
// 15、零钱兑换
function findMoney(account,coins){

}
// 16、-_转驼峰命名
function changeToCamel(str){

}
// 17、快排
function quickSort(arr){
  
}
// 18、求每个元素在数组中比他小的其他元素的个数
function findSmaller(arr){

}
// 19、手写new和寄生组合式继承

function myNew(constructor,...args){

}

// function Person(name){
//   this.name = name
// }
// Person.prototype.introduceMe= function(){
//   console.log(`i am ${this.name}`)
// }

// function Child(name,sex){
//   Person.call(this,name)
//   this.sex = sex
// }
// Child.prototype = Object.create(Person.prototype)
// Child.prototype.constructor = Child

// Child.prototype.haha = function(){
//   console.log(`i am ${this.name},i am ${this.sex}`)
// }
// 20、回文链表
function isBackList(head){

}
function reverseNodeList(head){

}
// 21、递归实现Pow方法
function NewPow(x,n){

}
// 22、跳台阶
function jumpFloor1(n){

}
function jumpFloor2(n){

}
// 23、打家劫舍
function rob1(arr){

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



// 5、vue3响应式
function reactive(obj) {

}
// 7、全排列
function permute(nums) {

}
console.log(permute(1,2,3))
// 8、对角线遍历数组
function diagonalTraverse(matrix) {

}

// 9、数组转树
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
// 10、三数之和
function threeSum(nums) {
 
}


// 12、归并

function mergeSort(arr) {
  
}

function merge(left, right) {

}
// 限制并发2
function limitConcurrency(requests, limit) {

}
// 限制并发
function limitConcurrency(urls, maxConcurrency) {

}

