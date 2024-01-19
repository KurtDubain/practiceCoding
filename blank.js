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
    if(typeof obj !=='object'&&obj===null){
        return obj
    }
    if(visited.has(obj)){
        return visited.get(obj)
    }
    const clone = Array.isArray(obj)?[]:{}
    visited.
}
// 14、翻转二叉树
function reverseTree(root){
    if(!root){
        return
    }
    let left = reverseTree(root.left)
    let right = reverseTree(root.right)

    root.left = right
    root.reactive = left
    return root
}
// 15、零钱兑换
function findMoney(account,coins){
    const dp = new Array(account+1).fill(Infinity)
    dp[0] = 0
    for(let i = 0;i<account;i++){
        for(let coin of coins){
            if(i>=coin){
                dp[i]=Math.min(dp[i],dp[i-coin]+1)
            }
        }
    }
    return dp[account]
}
// 16、-_转驼峰命名
function changeToCamel(str){
    const result = []
    const strArr = str.split(/-_/)
    if(strArr.length===1){
        return strArr.join('')
    }else if(strArr.length>1){
        result.push(strArr[0])
        for(let i = 1;i<strArr.length;i++){
            const curStr = strArr[i]
            result.push(curStr.chatAt(0).toUpperCase()+curStr.slice(1))
        }
    }
    return result.join('')
}
// 17、快排
function quickSort(arr){
    if(arr.length<=1){
        return arr
    }
    const right = []
    const left = []
    const mid = []
    let p = Math.floor(arr.length/2)
    for(let i = 0;i<arr.length;i++){
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
    const result = constructor.apply(newObj,args)
    return result instanceof Object?result:newObj
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
    if(!head&&!head.next){
        return true
    }
    let slow = head
    let fast = head
    while(fast.next&&fast.next.next){
        slow = slow.next
        fast = fast.next.next
    }
    let part = reverseNodeList(slow)
    let p1 = head
    let p2 = part
    while(p1.next){
        if(p1.val !== p2.val){
            return false
        }
    }
    return true
}
function reverseNodeList(head){
    let pre = null
    let cur = head
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
    if(n===0){
        return 1
    }else{
        return x*NewPow(x,n-1)
    }
}
// 22、跳台阶
function jumpFloor1(n){
    if(n==1){
        return 1
    }else if(n==2){
        return 2
    }else{
        return jumpFloor1(n-1)+jumpFloor1(n-2)
    }
}
function jumpFloor2(n){
    if(n==1){
        return 1
    }else if(n==2){
        return 2
    }else{
        const dp = new Array(n+1)
        dp[1] = 1
        dp[2] = 2
        for(let i =3;i<dp;i++){
            dp[i] = dp[i-1]+dp[i-2]
        }
        return dp[n]
    }
}
// 23、打家劫舍
function rob1(arr){

}
// 24、最长无重复子串
function findLongStr(str){
    let start = 0
    let end = 0
    let maxSum = 0
    let maxStart = 0
    const set = new Set()
    while(start<str.length&&end<str.length){
        if(!set.has(str[end])){
            set.add(str[end],end)
            maxStart = start
            maxSum = Math.max(maxSum,end-start+1)
            end++
        }else{
            set.delete(str[start])
            start++
        }
    }
    return str.substr(maxStart,maxSum)
}
// 25、千分位转换
function changeK(str){
    const result = []
    const [intStr,decStr] = str.split('.')
    let count = 2
    for(let i = intStr.length-1;i>=0;i--){
        result.unshift(intStr[i])
        if(count===0||i!==0){
            result.unshift(',')
            count = 2
        }else{
            count --
        }
    }
    return decStr?result.join('')+'.'+decStr:result.join('')
}
// 26、括号闭合问题
function isClosed(str){
    const left = ['(','[','{']
    const right = [')',']','}']
    const stack = []
    for(let i = 0;i<str.length;i++){
        if(left.includes(str[i])){
            stack.push(str[i])
        }else{
            const curStr = stack.pop()
            if(right[left.indexOf(curStr)]!==str[i]){
                return false
            }
        }
    }
    return true
}
// 27、EventBus
class EventBus{
    constructor() {
        this.events = {}
    }
    on(name,func){
        if(!this.events[name]){
            this.events[name]=[]
        }
        this.events[name].push(func)
    }
    emit(name,...args){
        if(this.events[name]){
            this.events[name].forEach(func=>{
                func(...args)
            })
        }
    }
    off(name){
        if(this.events[name]){
            delete this.events[name]
        }
    }
}
// 28、Observer
class Observer{
    constructor(){
        this.subers = []
    }
    sub(name){
        this.subers.push(name)
    }
    unSub(name){
        this.subers = this.subers.filter((item)=>item!==name)
    }
    notify(data){
        this.subers.forEach(suber=>{
            suber.update(data)
        })
    }
}
class Suber{
    constructor(name){
        this.name = name
    }
    update(data){
        console.log(`i am ${this.name},update ${data}`)
    }
}
// 29、Promise的retry
function retry(func,count){
    return new Promise((resolve,reject)=>{
        let tryTime = 0
        function tryIt(){
            func()
            .then(res=>{
                resolve(res)
            })
            .catch(error=>{
                tryTime++
                if(count<tryTime){
                    reject(error)
                }
                tryIt()
            })
        }
        tryIt()
    })
}
// 30、Promise的递归调用
function DiguiPromise(arr){
    if(arr.length===0){
        return new Promise.resolve()
    }
    const curPro = arr[0]
    return curPro
    .then(res=>{
        arr.pop()
        console.log(res)
        DiguiPromise(arr)
    })
    .catch(error=>{
        arr.pop()
        console.log(error)
        DiguiPromise(arr)
    })

}
// 31、对象扁平化
function flattenObject(obj) {
    const result = {}
    function recurse(curObj,curKey){
        for(let key in curObj){
            if(curObj.hasOwnProperty(key)){
                const newKey = curKey?`${curKey}.${key}`:key
                if(typeof curObj[key]==='object'&&curObj[key]!==null){
                    recurse(curObj[key],newKey)
                }else{
                    result[newKey] = curObj[key]
                }
            }
        }
    }
    recurse(obj,'')
    return result
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
    const result = []
    function backtrack(start){
        if(start === nums.length){
            result.push([...nums])
            return
        }
        for(let i = start;i<nums.length;i++){
            [nums[start],nums[i]] = [nums[i],nums[start]]
            backtrack(start+1)
            [nums[start],nums[i]] = [nums[i],nums[start]]
        }
    }
    backtrack(0)
    return result
}
console.log(permute(1,2,3))
// 8、对角线遍历数组
function diagonalTraverse(matrix) {

}

// 9、数组转树
function arrayToTree(arr) {
    const map = {}
    const roots = []
    arr.forEach((item)=>{
        map[item.id]={...item,children:[]}
    })
    Object.values(map).forEach((node)=>{
        if(node.parentId !== null){
            map[node.parentId].children.push(node)
        }else{
            roots.push(node)
        }
    })
    return roots
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
    nums.sort((a,b)=>a-b)
    const result = []
    for(let i = 0;i<nums.length-2;i++){
        if(nums[i]>0){
            break
        }
        if(i > 0&& nums[i]===nums[i-1]){
            continue
        }
        let left = i+1
        let right = nums.length-1
        while(left<right){
            const sum = nums[i] + nums[left]+nums[right]
            if(sum===0){
                result.push([nums[i],nums[left],nums[right]])
                while(left<right&&nums[left]===nums[left+1]){
                    left++
                }
                while(left<right&&nums[right]===nums[right-1]){
                    right--
                }
                left++
                right--
            }else if(sum<0){
                left++
            }else{
                right--
            }
        }
    }
    return result
}


// 12、归并

function mergeSort(arr) {
    if(arr.length<=1){
        return arr
    }
    let mid = Math.floor(arr.length/2)
    let left = arr.slice(0,mid)
    let right = arr.slice(mid)
    return merge(mergeSort(left),mergeSort(right))
}

function merge(left, right) {
    const result = []
    let leftIndex = 0
    let rightIndex = 0
    while(leftIndex<left.length&&rightIndex<right.length){
        if(left[leftIndex]<right[rightIndex]){
            result.push(left[leftIndex])
            leftIndex++
        }else{
            result.push(right[rightIndex])
            rightIndex--
        }
    }
    return result.concat(left.slice(leftIndex).concat(right.slice(rightIndex)))
}   
// 限制并发2
function limitConcurrency(requests, limit) {

}
// 限制并发
function limitConcurrency(urls, maxConcurrency) {
    let runningCount = 0
    let index = 0
    function runNext(){
        if(runningCount>=maxConcurrency||index>=urls.length){
            return
        }
        const url = urls[index]
        index++
        runningCount+
        fetch(url)
        .then(res=>{
            console.log(res)
        })
        .catch(error=>{
            console.log(error)
        })
        .finally(()=>{
            runningCount--
            runNext()
        })
        runNext()
    }
    runNext()
}

