// 1、大数相加
function bigNumAdd(str1,str2){
    let i = str1.length-1
    let j = str2.length-1
    let carry = 0
    let result = []
    while(i>=0||j>=0||carry>0){
        let num1 = i>=0?parseInt(str1[i]):0
        let num2 = j>=0?parseInt(str2[j]):0

        let sum = num1+num2+carry
        result.unshift(sum%10)
        carry = Math.floor(sum/10)
    }
    return result.join('')
}
// 2、instanceof手写
function NewInstanceof(obj,constructor){
    if(obj===null||typeof(obj)!=='object'){
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
        if(timer!==null){
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
        })
    }
}
// 4、对象的dfs（递归、非递归）和bfs和层级遍历多叉树
function dfsObj1(obj){
    console.log(obj)
    for(let key in obj){
        if(typeof(obj[key])==='object'&&obj[key]!==null){
            dfsObj1(obj[key])
        }
    }
}
function dfsObj2(obj){
    const stack = [obj]
    while(stack.length>0){
        let current = stack.pop()
        console.log(current)
        for(let key in current){
            if(typeof(current[key])==='object'&&current[key]!==null){
                stack.push(current[key])
            }
        }
    }
}
function bfsObj(obj){
    const queue = [obj]
    while(stack.length>0){
        let current = stack.shift()
        console.log(current)
        for(let key in current){
            if(typeof(current[key])==='object'&&current[key]!==null){
                queue.push(current[key])
            }
        }
    }
}
function bfsMuchTree(root){
    if(!root){
        return
    }
    const queue = [root]
    const result = []
    while(queue.length>0){
        const cur = queue.unshift()
        result.push(cur.val)
        for(let child in cur.children){
            queue.push(child)
        }
    }
}
// 5、16进制转10进制
function Ch16To10(str){
    const keyArr = '0123456789ABCDEF'
    let sum = 0
    for(let i = 0;i<str.length;i++){
        const curStr = str[i]
        const trueNum = keyArr.indexOf(curStr.toUpperCase())
        sum = sum*16+trueNum
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
            return result
        }
        function parseVal(value){
            if(!isNaN(value)){
                return Number(value)
            }
            if(value.startWith('"')&&value.endWith('"')&&value.length>=2){
                return value.slice(1,-1)
            }
            return value
        }
        return parse()
    }
}
// 7、手写固定和
function findSum(arr,target){
    const newMap = new Map()
    const result = []
    for(let i = 0;i <arr.length;i++){
        if(newMap.has(target-arr[i])){
            result.push([arr[i],target-arr[i]])
        }
        newMap.set(arr[i],i)
    }
    return result
}
// 8、函数柯里化func(1)(2)(3)
function curry(func){
    return function curried(...args){
        if(args.length>=func.length){
            return fn.apply(this,...args)
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
        const results = []
        let finish = 0
        if(arr.length===0){
            resolve(results)
        }
        arr.forEach((promise,index) => {
            Promise.resolve(promise)
            .then(value=>{
                results[index] = value
                finish++

                if(finish===arr.length){
                    resolve(results)
                }
            })
            .catch(error=>{
                reject(error)
            })
        });
    })
}
// 10、长字符串在长文本中的查找
function findLongStr(strDad,strSon){
    let index = strDad.indexOf(strSon)
    return index
}
// 11、实现LRU
class LRUCache{
    constructor(capacity){
        this.capacity = capacity
        this.cache = new Map()
    }
    get(key){
        if(this.cache.has(key)){
            const value = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key,value)
            return value
        }
        return -1
    }
    put(key,value){
        if(this.cache.has(key)){
            this.cache.delete(key)
        }else if(this.cache.size>=this.capacity){
            const oldestKey = this.cache.keys().next().value
            this.cache.delete(oldestKey)
        }
        this.cache.set(key,value)
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
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}
function myBind(context,...args){
    const fn = this
    return function(...newArgs){
        return fn.apply(context,args.concat(...newArgs))
    }
}
// 13、深拷贝（解决循环应用）
function Deepclone(obj,visited = new Map()){
    if(typeof(obj)!=='object'||obj===null){
        return obj
    }
    if(visited.has(obj)){
        return visited.get(obj)
    }
    const clone = Array.isArray(obj)?[]:{}
    visited.set(obj,clone)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            clone[key] = Deepclone(obj[key],visited)
        }
    }
    return clone

}
// 14、翻转二叉树
function reverseTree(root){
    if(!root){
        return
    }
    const left = reverseTree(root.left)
    const right = reverseTree(root.right)

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
            if(coin<=i){
                dp[i] = Math.min(dp[i],dp[i-coin]+1)
            }
        }
    }
    return dp[account]
}
// 16、-_转驼峰命名
function changeToCamel(str){
    const charArr = str.split(/[-_]/)
    const result = [charArr[0]]
    for(let i = 1;i<charArr.length;i++){
        const char = charArr[i]
        result.push(char.charAt(0).toUpperCase()+char.slice(1))
    }
    return result.join('')
}
// 17、快排
function quickSort(arr){
    if(arr.length<=1){
        return arr
    }
    let p = Math.floor(arr.length/2)
    let right = []
    let left = []
    let mid = []
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
    let result = []
    const arrNew = arr.slice().sort((a,b)=>a-b)
    for(let i = 0;i<arr.length;i++){
        result.push(arrNew.indexOf(arr[i]))
    }
    return result
}
// 19、手写new和寄生组合式继承

function myNew(constructor,...args){
    const newObj = Object.create(constructor.prototype)
    const result = constructor.apply(newObj,args)
    return result instanceof Object?result:newObj
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
    if(!head||!head.next){
        return true
    }
    let fast = head
    let slow = head
    while(fast.next.next&&fast.next){
        fast = fast.next.next
        slow = slow.next
    }
    let newHead = reverseNodeList(slow)
    let p1 = head
    let p2 = newHead
    while(p1&&p2){
        if(p1.val !== p2.val ){
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