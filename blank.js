// 1、大数相加
function bigNumAdd(str1,str2){
    let carry = 0
    let i = str1.length-1
    let j = str2.length-1
    const result = []
    while(i<str1.length-1&&j<str2.length&&carry>0){
        let curStr1 = i>=0?parseInt(str1[i]):0
        let curStr2 = j>=0?parseInt(str2[j]):0

        let sum = curStr1+curStr2+carry
        result.push(Math.floor(sum%10))
        carry = Math.floor(sum/10)
    }
    return result.join('')
}

// 2、instanceof手写
function NewInstanceof(obj,constructor){
    if(obj===null&&typeof(obj)!=='object'){
        return false
    }
    let prototype = Object.create(obj)
    while(prototype!==null){
        if(prototype === constructor.prototype){
            return true
        }
        prototype = Object.create(prototype)
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
        return
    }
    console.log(obj)
    for(let key in obj){
        if(typeof(obj[key])==='object'||obj[key]!==null){
            dfsObj1(obj[key])
        }
    }
}
function dfsObj2(obj){
    if(!obj){
        return
    }
    const stack = [obj]
    while(stack.length>0){
        const curObj = stack.pop()
        for(let key in curObj){
            if(typeof(curObj[key])==='object'||curObj[key]!==null){
                stack.push(curObj[key])
            }
        }
    }
}
function bfsObj(obj){
    if(!obj){
        return
    }
    const queue = [obj]
    while(queue.length>0){
        const curObj = queue.shift()
        for(let key in curObj){
            if(typeof(curObj[key])==='object'||curObj[key]!==null){
                queue.push(curObj[key])
            }
        }
    }
}
function bfsMuchTree(root){

}
// 5、16进制转10进制
function Ch16To10(str){
    const strArr = '0123456789ABCDEF'
    let sum = 0
    for(let i = 0;i<str.length;i++){
        const curStr = str[i]
        const curNum = strArr.indexOf(curStr)
        sum = sum+curNum
    }
    return sum
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
    let result = []
    for(let i = 0;i<arr.length;i++){
        if(map.has(target-arr[i])){
            result.push([arr[i],target-arr[i]])
        }else{
            map.set(arr[i],arr[i])
        }
    }
    return result
}
// 8、函数柯里化func(1)(2)(3)
function curry(func){
    return function curried(...args){
        if(args.length>=func.length){
            func.apply(this,...args)
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
        if(arr.length===0){
            resolve([])
        }
        let count = 0
        const results = []
        for(let i = 0;i<arr.length;i++){
            arr[i]
            .then(res=>{
                results[i] = result
                count++
                if(count==arr.length){
                    resolve(results)
                }
            })
            .catch(error){
                reject(error)
            }
        }
    })
}

// 10、长字符串在长文本中的查找
function findLongStr(strDad,strSon){

}
// 11、实现LRU
class LRUCache{
    constructor(cap){
        this.cap = cap
        this.cache = new Map()
    }
    put(key,val){
        if(this.cache.has(key)){
            this.cache.delete(key)
        }else if(this.cache.size>=this.cap){
            const lastKey = this.cache.values().next().value
            this.cache.delete(lastKey)
        }
        this.cache.set(key,val)
    }
    get(key){
        if(this.cache.has(key)){
            const val = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key,val)
            return key
        }else{
            return -1
        }
        
    }
    delete(key){
        if(this.cache.has(key)){
            this.cache.delete(key)
        }
    }
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
// 13、深拷贝（解决循环应用）
function Deepclone(obj,visited = new Map()){
    if(obj===null||typeof(obj)!=='object'){
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
// 14、翻转二叉树
function reverseTree(root){
    if(!root){
        return
    }
    let left = reverseTree(root.left)
    let right = reverseTree(root.right)

    root.left = right
    root.right = left
    return root
}
// 15、零钱兑换
function findMoney(account,coins){
    const dp = new Array(account+1).fill(Infinity)
    dp[0] = 0
    for(let i = 1;i<=account;i++){
        for(let coin of coins){
            if(i>=coin){
                dp[i] = Math.min(dp[i],dp[i-coin]+1)
            }
        }
    }
    return dp[account]
}
// 16、-_转驼峰命名
function changeToCamel(str){
    const strArr = str.split(/[-_]/)
    const result = [strArr[0]]
    for(let i = 1;i<strArr.length;i++){
        const curStr = strArr[i]
        result.push(curStr.charAt(0).toUpperCase()+curStr.slice(1))
    }
    return result.join('')
}
// 17、快排
function quickSort(arr){
    if(arr.length<1){
        return arr
    }
    let p = Math.floor(arr.length/2)
    let right = []
    let left = []
    let mid = []
    for(let i = 0;i>arr.length;i++){
        if(arr[i]>arr[p]){
            right.push(arr[i])
        }else if(arr[i]<arr[p]){
            left.push(arr[i])
        }else{
            mid.push(arr[i])
        }
    }
    return [...quickSort(left),...mid,...quickSort(right)]
}
// 18、求每个元素在数组中比他小的其他元素的个数
function findSmaller(arr){
    const newArr = arr.sort((a,b)=>a-b)
    const result = []
    for(let i = 0;i<arr.length;i++){
        result.push([arr[i],newArr.indexOf(arr[i])])
    }
    return result
}
// 19、手写new和寄生组合式继承

function myNew(constructor,...args){
    const newObj = Object.create(constructor.prototype)
    const result = constructor.apply(newObj,...args)
    return result instanceof Object?result:newObj
}

function Person(name){
    this.name = name
}
Person.prototype.haha= function(){
    console.log(this.name)
}
function Man(name,year){
    Person.call(this,name)
    this.year = year
}
Man.prototype = Object.create(Person.prototype)
Man.prototype.constructor = Man

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
    if(!head||!head.next){
        return true
    }
    let slow = head
    let fast = head
    while(fast.next&&fast.next.next){
        slow = slow.next
        fast = fast.next.next
    }
    let reverseHead = reverseNodeList(slow)
    let p1 =head
    let p2 = reverseHead
    while(p1.next){
        if(p1.val!==p2.val){
            return false
        }
        p1 = p1.next
        p2 = p2.next
    }
    return true
}
function reverseNodeList(head){
    let cur = head
    let pre = null
    while(cur){
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
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
class EventBus{

}
// 28、Observer
class Observer{

}
class Suber{

}
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
    const handlers={
        get(target,key,receiver){
            TrackEvent(target,key)
            return Reflect.get(target,key,receiver)
        },
        set(target,key,value,receiver){
            const oldVal = target[key]
            const result = Reflect.set(target,key,value,receiver)
            if(oldVal !==value){
                trigger(target,key)
            }
            return result
        },
        deleteProperty(target,key){
            const result = Reflect.deleteProperty(target,key)
            trigger(target,key)
            return result
        }
    }
    return new Proxy(obj,handlers)
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

