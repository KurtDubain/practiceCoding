// 用于记录前端常见的算法

// 解析XML为DOM树的代码
function parseXML(xmlString) {
    const stack = [];//用于存储解析过程中的节点
    let currentNode = null;//当前节点
    let tagName = "";//当前标签名
    let textContent = "";//当前文本内容
  
    for (let i = 0; i < xmlString.length; i++) {
      if (xmlString[i] === "<") {
        // 开始标签
        if (xmlString[i + 1] !== "/") {
          // 获取标签名
          const nextSpaceIndex = xmlString.indexOf(" ", i + 1);
          const nextCloseIndex = xmlString.indexOf(">", i + 1);
          const endIndex = Math.min(nextSpaceIndex, nextCloseIndex);
          tagName = xmlString.substring(i + 1, endIndex);
          //在找到空格和大于号之后，使用substring方法提取标签名
  
          // 创建节点
          const node = { tagName, attributes: {}, children: [], parent: currentNode };
          stack.push(node);
          currentNode = node;
          //创建了一个节点对象，该节点的属性包括'tagName'、'attributes'、'children'、'parent',然后将该节点对象推入栈中，并将当前节点更新为新创建的节点
  
          // 解析属性
          let attrName = "";//用于暂存属性名
          let attrValue = "";//用于暂存属性值
          for (let j = endIndex + 1; j < xmlString.length; j++) {
            if (xmlString[j] === "=") {
              attrName = xmlString.substring(endIndex + 1, j);//当遇到“=”时，则将“attrName”更新为等号前的字符串，即属性名。
            }
            if (xmlString[j] === "\"" || xmlString[j] === "'") {
              const nextQuoteIndex = xmlString.indexOf(xmlString[j], j + 1);
              attrValue = xmlString.substring(j + 1, nextQuoteIndex);
              j = nextQuoteIndex;
              currentNode.attributes[attrName] = attrValue;
              attrName = "";
              attrValue = "";
            }
          //如果遇到单引号或双引号，则表示属性值的开始和结束，通过查找下一个相同的引号位置，提取出属性值，并将属性名和属性值存储在当前节点的attributes对象中
            if (xmlString[j] === ">") {
              break;
            }//解析完成
            endIndex = j;
          }
        }
        // 结束标签
        else {
          currentNode.textContent = textContent.trim();
          textContent = "";
          currentNode = stack.pop();
        }
      } else {
        textContent += xmlString[i];
      }
    }
    return currentNode;
  }

//   深拷贝
function Deepclone(obj){
    if(obj === null || typeof(obj)!==Object){
        return obj
    }
    let clone
    if(Array.isArray(obj)){
        clone = []
        for(let i = 0;i< obj.length;i++){
            clone[i] = Deepclone(obj[i])
        }
    }
    else{
        clone = {}
        for(key in obj){
            clone[key] = Deepclone(obj[key])
        }
    }
    return clone
}
// 节流
function throttle(func,delay){
    let timer = null
    return function(...arg){
        if(!timer){
            timer = setTimeout(()=>{
                func.apply(this,arg)
                timer = null
            },delay)
        }
    }
}
// 防抖
function debounce(func,delay){
    let timer = null
    return function(...arg){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            func.apply(this,arg)
        },delay)
    }
}
// new的原生实现
function myNew(constructor, ...args) {
  const newObj = Object.create(constructor.prototype);
  const result = constructor.apply(newObj, args);
  return result instanceof Object ? result : newObj;
}

// call的原生实现
Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

// 示例
// function greet(name) {
//   console.log(`Hello, ${name}! My name is ${this.name}.`);
// }

// const person = { name: 'Alice' };
// greet.myCall(person, 'Bob'); // 输出: Hello, Bob! My name is Alice.


// bind的原生实现
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.apply(context, args.concat(newArgs));
  };
};

// 示例
// function greet(name) {
//   console.log(`Hello, ${name}! My name is ${this.name}.`);
// }

// const person = { name: 'Alice' };
// const boundGreet = greet.myBind(person, 'Bob');
// boundGreet('Charlie'); // 输出: Hello, Bob! My name is Alice.


// apply的原生实现
Function.prototype.myApply = function(context, args = []) {
  context = context || window;
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

// 示例
// function greet(name) {
//   console.log(`Hello, ${name}! My name is ${this.name}.`);
// }

// const person = { name: 'Alice' };
// greet.myApply(person, ['Bob']); // 输出: Hello, Bob! My name is Alice.
function mySetInterval(fn, interval) {
  let timerId;

  function intervalFn() {
    fn(); // 执行传入的函数
    timerId = setTimeout(intervalFn, interval); // 递归调用自身
  }

  timerId = setTimeout(intervalFn, interval); // 第一次调用
  return function() {
    clearTimeout(timerId); // 返回一个函数用于清除定时器
  };
}

// 测试
// const cancelInterval = mySetInterval(() => {
//   console.log('Interval function');
// }, 1000);

// // 运行一段时间后，手动取消定时器
// setTimeout(() => {
//   cancelInterval(); // 清除定时器
// }, 5000);

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('promises must be an array'));
    }

    const results = [];
    let completedCount = 0;

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((result) => {
          results[i] = result;
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    }
  });
}

// 测试
// const promise1 = Promise.resolve(1);
// const promise2 = new Promise((resolve) => setTimeout(() => resolve(2), 1000));
// const promise3 = Promise.reject('Error');

// myPromiseAll([promise1, promise2, promise3])
//   .then((results) => {
//     console.log('All promises resolved:', results);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

class AsyncQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.tasks = [];
    this.runningCount = 0;
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      this.runTasks();
    });
  }

  runTasks() {
    while (this.runningCount < this.concurrency && this.tasks.length > 0) {
      const { task, resolve, reject } = this.tasks.shift();
      this.runningCount++;

      task()
        .then((result) => {
          this.runningCount--;
          resolve(result);
          this.runTasks();
        })
        .catch((error) => {
          this.runningCount--;
          reject(error);
          this.runTasks();
        });
    }
  }
}

// // 测试
// const asyncQueue = new AsyncQueue(2);

// const delay = (ms, value) =>
//   new Promise((resolve) => setTimeout(() => resolve(value), ms));

// asyncQueue.enqueue(() => delay(1000, 'Task 1'))
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// asyncQueue.enqueue(() => delay(1500, 'Task 2'))
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// asyncQueue.enqueue(() => delay(500, 'Task 3'))
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// 循环引用判断
function hasCircularReference(obj) {
  let seen = new WeakSet();

  function detect(obj) {
    if (typeof obj === 'object' && obj !== null) {
      if (seen.has(obj)) {
        return true; // 循环引用
      }
      seen.add(obj);
      for (let key in obj) {
        if (detect(obj[key])) {
          return true; // 循环引用
        }
      }
      seen.delete(obj);
    }
    return false;
  }

  return detect(obj);
}
function deepCopy(obj, visited = new Map()) {
  // 如果是基本数据类型或者 null，则直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 检查是否已经拷贝过该对象
  if (visited.has(obj)) {
    return visited.get(obj);
  }

  // 创建新的对象或数组
  const clone = Array.isArray(obj) ? [] : {};

  // 记录已经拷贝过的对象，以便处理循环引用
  visited.set(obj, clone);

  // 递归拷贝对象的每个属性或元素
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepCopy(obj[key], visited);
    }
  }

  return clone;
}