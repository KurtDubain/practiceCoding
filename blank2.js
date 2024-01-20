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
        i--
        j--
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
// 21、递归实现Pow方法
function NewPow(x,n){
    if(n===0){
        return 1
    }
    return x*NewPow(x,n-1)
}
// 22、跳台阶
function jumpFloor1(n){
    if(n===0){
        return 0
    }else if(n===1){
        return 1
    }else if(n===2){
        return 2
    }else{
        return jumpFloor1(n-1)+jumpFloor1(n-2)
    }
}
function jumpFloor2(n){
    if(n <= 0){
        return 0 
    }else if(n ===1){
        return 1
    }else if(n===2){
        return 2
    }else{
        const dp = new Array(n+1)
        dp[1] = 1
        dp[2] = 2
        for(let i = 3;i<=n;i++){
            dp[i] = dp[i-1]+dp[i-2]
        }
        return dp[n]
    }
}
// 23、打家劫舍
function rob1(arr){
    const n = arr.length
    if(n === 0){
        return 0
    }
    if(n===1){
        return arr[0]
    }
    const dp = new Array(n)
    dp[0] = arr[0]
    dp[1] = Math.max(arr[0],arr[1])
    for(let i = 2;i<n;i++){
        dp[i] = Math.max(dp[i-1],dp[i-2]+arr[i])
    }
    return dp[n-1]
}
// 24、最长无重复子串
function findLongStr(str){
    let start = 0
    let end = 0
    let maxSum = 0
    let maxStart = 0
    const remSet = new Set()
    while(start<str.length&&end<str.length){
        if(!remSet.has(str[end])){
            remSet.add(str[end],end)
            // maxSum = Math.max(maxSum,end-start+1)
            if(end-start+1>maxSum){
                maxSum = end-start+1
                maxStart = start
            }
            end++
        }else{
            remSet.delete(str[start])
            start++
        }
    }
    return str.substr(maxStart,maxSum)
}
// 25、千分位转换
function changeK(str){
    const newArr = str.split('.')
    const [intArr,decArr] = newArr
    let count = 2
    const result = []
    for(let i = intArr.length-1;i>=0;i--){
        result.unshift(intArr[i])
        if(count===0&&i!==0){
            result.unshift(',')
            count = 2
        }else{
            count -- 
        }
    }
    return decArr?`${result.join('')}.${decArr}`:result.join('')
}
// 26、括号闭合问题
function isClosed(str){
    if(!str){
        return true
    }

    const queue = []
    const left = ['(','[','{']
    const right = [')',']','}']
    for(let i = 0; i<str.length; i++){
        const firstStr = str[i]
        if(left.includes(firstStr)){
            queue.push(firstStr)

        }else if(right.includes(firstStr)){
            let ShouldLast = queue.pop()
            if( ShouldLast !== left[right.indexOf(firstStr)]){
                return false
            }
        }
    }
    return true
}
// 27、EventBus

// 28、Observer

// 29、Promise的retry
function retry(func,count){
    return new Promise((resolve,reject)=>{
        let times = 0
        function tryIt(){
            func().
            then(result=>{
                resolve(result)
            })
            .catch((error)=>{
                if(times<count){
                    times++
                    tryIt()
                }else{
                    reject(error)
                }
            })
        }
        tryIt()
    })
}
// 30、Promise的递归调用
function DiguiPromise(arr){
    if(arr.length<1){
        return Promise.resolve()
    }
    let cur = arr[0]
    return cur.then(result=>{
        arr.pop()
        console.log(result)
        DiguiPromise(arr)
    }).catch(error=>{
        arr.pop()
        console.log(error)
        DiguiPromise(arr)
    })
}
// 31、对象扁平化
function flattenObject(obj) {
    const result = {};
  
    function recurse(currentObj, currentKey) {
      for (let key in currentObj) {
        if (currentObj.hasOwnProperty(key)) {
          const newKey = currentKey ? `${currentKey}.${key}` : key;
  
          if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
            recurse(currentObj[key], newKey);
          } else {
            result[newKey] = currentObj[key];
          }
        }
      }
    }
  
    recurse(obj, '');
  
    return result;
  }

  

// 5、vue3响应式
function reactive(obj) {
    const handlers = {
      get(target, key, receiver) {
        track(target, key);  // 追踪依赖
        return Reflect.get(target, key, receiver);
      },
      set(target, key, value, receiver) {
        const oldValue = target[key];
        const result = Reflect.set(target, key, value, receiver);
        if (oldValue !== value) {
          trigger(target, key);  // 触发更新
        }
        return result;
      },
      deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key);
        trigger(target, key);  // 触发更新
        return result;
      },
    };
  
    return new Proxy(obj, handlers);
  }
// 7、全排列
function permute(nums) {
    const result = [];
    
    function backtrack(start) {
      if (start === nums.length) {
        result.push([...nums]);
        return;
      }
      
      for (let i = start; i < nums.length; i++) {
        [nums[start], nums[i]] = [nums[i], nums[start]];
        backtrack(start + 1); 
        [nums[start], nums[i]] = [nums[i], nums[start]];
      }
    }
    
    backtrack(0);
    return result;
  }
  console.log(permute(1,2,3))
// 8、对角线遍历数组
function diagonalTraverse(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) {
      return [];
    }
  
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    let row = 0;
    let col = 0;
    let direction = 1;
  
    for (let i = 0; i < rows * cols; i++) {
      result.push(matrix[row][col]);
  
      row -= direction;
      col += direction;
  
      if (row >= rows) {
        row = rows - 1;
        col += 2;
        direction = -direction;
      }
      if (col >= cols) {
        col = cols - 1;
        row += 2;
        direction = -direction;
      }
      if (row < 0) {
        row = 0;
        direction = -direction;
      }
      if (col < 0) {
        col = 0;
        direction = -direction;
      }
    }
  
    return result;
  }
 
// 9、数组转树
function arrayToTree(arr) {
    const map = {};
    const roots = [];
  
    // 将数组中的每个元素创建成节点，并使用 id 作为键存储在 map 对象中
    arr.forEach((item) => {
      map[item.id] = { ...item, children: [] };
    });
    
  
    // 遍历每个节点，将其添加到其父节点的 children 数组中
    Object.values(map).forEach((node) => {
      if (node.parentId !== null) {
        map[node.parentId].children.push(node);
      } else {
        roots.push(node);
      }
    });
  
    return roots;
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
    nums.sort((a, b) => a - b);  // 将数组进行排序
    const result = [];
  
    for (let i = 0; i < nums.length - 2; i++) {
      if (nums[i] > 0) {
        break;  // 如果当前数字大于0，则三数之和一定大于0，结束循环
      }
      if (i > 0 && nums[i] === nums[i - 1]) {
        continue;  // 去除重复的元素，避免重复计算
      }
  
      let left = i + 1;
      let right = nums.length - 1;
  
      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];
        if (sum === 0) {
          result.push([nums[i], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) {
            left++;  // 去除左指针重复的元素
          }
          while (left < right && nums[right] === nums[right - 1]) {
            right--;  // 去除右指针重复的元素
          }
          left++;
          right--;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }
  
    return result;
  }


// 12、归并

function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
  }
  
  function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
  
function limitConcurrency(requests, limit) {
    const results = [];  // 存储请求结果的数组
    let running = 0;  // 当前正在执行的请求数量
    let index = 0;  // 当前请求的索引
  
    async function runNext() {
      if (index >= requests.length) {
        return;  // 所有请求已经执行完毕
      }
  
      const current = index++;  // 当前请求的索引自增
      running++;  // 增加正在执行的请求数量
  
      try {
        const result = await requests[current]();  // 执行当前请求
        results[current] = result;  // 存储请求结果
      } catch (error) {
        results[current] = error;  // 存储请求错误信息
      }
  
      running--;  // 当前请求执行完毕，减少正在执行的请求数量
      runNext();  // 执行下一个请求
    }
  
    // 启动初始的请求
    while (running < limit && index < requests.length) {
      runNext();
    }
  
    // 返回一个 Promise，在所有请求执行完毕后进行 resolve
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (index >= requests.length && running === 0) {
          clearInterval(checkInterval);
          resolve(results);
        }
      }, 10);
    });
}

function limitConcurrency(arr, limit) {
    return new Promise((resolve,reject) => {
        let count = 0 
        const n = arr.length 
        const res = new Array(n)
        let index = 0
        function step(i){
            if(count === n) {
                resolve(res)
                return 
            }
            if(arr[index]){
                arr[index]().then(result => {
                    res[i] = result 
                    count++
                    step(index)
                }) 
            }
            index++
        }
        for(let i = 0; i < limit; i++){
            step(i)
        }
    })


}

