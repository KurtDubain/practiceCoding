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
// 4、对象的dfs（递归、非递归）和bfs
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
// 13、深拷贝（解决循环应用）
// 14、翻转二叉树
// 15、零钱兑换
// 16、-_转驼峰命名
// 17、快排
// 18、求每个元素在数组中比他小的其他元素的个数
// 19、手写new和寄生组合式继承
// 20、反转链表