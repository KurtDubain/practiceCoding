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
// 7、手写固定和
// 8、函数柯里化func(1)(2)(3)

// 9、手写Promise以及then以及All
// 10、长字符串在长文本中的查找
// 11、实现LRU
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

// 15、零钱兑换

// 16、-_转驼峰命名

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
// 20、反转链表
