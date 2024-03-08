// 1、大数相加
function bigNumAdd(str1, str2) {
  let i = 0;
  let j = 0;
  let sum = 0;
  let carry = 0;
  while (i < str1.length && j < str2.length && carry > 0) {
    let num1 = i < str1.length ? parseInt(str1[i]) : 0;
    let num2 = j < str2.length ? parseInt(str2[j]) : 0;
    let temp = num1 + num2 + carry;
    sum = Math.floor(temp % 10);
    carry = Math.floor(temp / 10);
  }
  return sum;
}

// 2、instanceof手写
function NewInstanceof(obj, constructor) {
  if (typeof obj !== "object" || obj == null) {
    return false;
  }
  let prototype = Object.getPrototypeOf(obj);
  while (prototype != null) {
    if (prototype == constructor.prototype) {
      return true;
    }
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}
// 3、节流、防抖
function throttle(func, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, ...args);
        timer = null;
      }, delay);
    }
  };
}
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, ...args);
      clearTimeout(timer);
    }, delay);
  };
}

// 5、16进制转10进制
function Ch16To10(str) {
  const newStr = "0123456789ABCDEF";
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const curChar = str[i];
    const curNum = parseInt(newStr.indexOf(curChar.toUpperCase()));
    result = result * 10 + curNum;
  }
  return result;
}

// 8、函数柯里化func(1)(2)(3)
function curry(func) {
  return function curried(...args) {
    if (args.length > func.length) {
      return func.apply(this, ...args);
    } else {
      return function (...newArgs) {
        return curried.apply(this, args.concat(...newArgs));
      };
    }
  };
}
// 9、手写Promise以及then以及All
function promiseAll(arr) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const results = [];
    for (let i = 0; i < arr.length; i++) {
      const promise = arr[i];
      promise
        .then((result) => {
          results[i] = result;
          count++;
          if (count == arr.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

// 11、实现LRU
class LRUCache {}
// 12、call、bind、apply方法手写
function myCall(context, arg) {
  context = context || window;
  const fn = Symbol("fn");
  const result = context[fn](arg);
  delete context[fn];
  return result;
}
function myApply(context, ...args) {
  context = context || window;
  const fn = Symbol("fn");
  const result = context[fn](...args);
  delete context[fn];
  return result;
}
function myBind(context, ...args) {
  let fn = context;
  return fn.apply(this, ...args);
}
// 13、深拷贝（解决循环应用）
function Deepclone(obj, visited = new Map()) {
  if (obj == null || typeof obj !== "object") {
    return obj;
  }
  if (visited.has(obj)) {
    return visited.get(obj);
  }
  const clone = Array.isArray(obj) ? [] : {};
  visited.set(obj, clone);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = Deepclone(obj[key], visited);
    }
  }
  return clone;
}

// 15、零钱兑换
function findMoney(account, coins) {
  const dp = new Array(account + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 0; i < account; i++) {
    for (let coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[account];
}

// 19、手写new和寄生组合式继承

function myNew(constructor, ...args) {
  const newObj = Object.create(constructor.prototype);
  const result = constructor.apply(newObj, ...args);
  return result instanceof Object ? result : newObj;
}

function Person(name) {
  this.name = name;
}
Person.prototype.introduceMe = function () {
  console.log(`i am ${this.name}`);
};

function Child(name, sex) {
  Person.call(this, name);
  this.sex = sex;
}
Child.prototype = Object.create(Person.prototype);
Child.prototype.constructor = Child;

Child.prototype.haha = function () {
  console.log(`i am ${this.name},i am ${this.sex}`);
};
// 20、回文链表
function isBackList(head) {
  if (!head || !head.next) {
    return true;
  }
  let fast = head.next;
  let slow = head.next;
  while (fast.next.next && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  let newHead = reverseNodeList(slow.next);
  let p1 = head;
  let p2 = newHead;
  while (p1) {
    if (p1.val != p2.val) {
      return false;
    }
    p1 = p1.next;
    p2 = p2.next;
  }
  return true;
}
function reverseNodeList(head) {
  if (!head.next) {
    return head;
  }
  let cur = head;
  let pre = null;
  while (cur) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}

// 24、最长无重复子串
function findLongStr(str) {
  let left = 0;
  let right = 0;
  let maxLength = 0;
  let maxStart = 0;
  const set = new Set();
  while (left < str.length && right < str.length) {
    if (!set.has(str[right])) {
      if (maxLength < right - left + 1) {
        maxLength = right - left + 1;
        maxStart = left;
      }
      right++;
      set.add(str[right]);
    } else {
      set.delete(str[left]);
      left++;
    }
  }
  return maxLength;
}
// 25、千分位转换
function changeK(str) {
  const [int, dec] = str.split(".");
  const result = [];
  let count = 2;
  for (let i = int.length - 1; i > 0; i--) {
    if (count == 0 && i !== 0) {
      result.unshift(int[i]);
      result.unshift(",");
    } else {
      count--;
      result.unshift(int[i]);
    }
  }
  return dec ? `${result.join("")}.${dec}` : result.join("");
}

// 27、EventBus
class EventBus {
  constructor() {
    this.events = {};
  }
  on(name, func) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(func);
  }
  emit(name, ...args) {
    this.events[name].forEach((func) => {
      func(...args);
    });
  }
  delete(name) {
    if (this.events[name]) {
      delete this.events[name];
    }
  }
}
// 28、Observer
class Observer {
  constructor() {
    this.subers = [];
  }
  sub(name) {
    this.subers.push(name);
  }
  unSub(name) {
    this.subers = this.subers.filter((item) => item != name);
  }
  emit(data) {
    this.subers.forEach((name) => {
      name.haha(data);
    });
  }
}
class Suber {
  constructor(name) {
    this.name = name;
  }
  haha(data) {
    console.log(this.name, data);
  }
}
// 29、Promise的retry
function retry(func, count) {}
// 30、Promise的递归调用
function DiguiPromise(arr) {}
// 31、对象扁平化
function flattenObject(obj) {}

// 33、全排列
function permute(nums) {}
console.log(permute(1, 2, 3));

// 35、数组转树
function arrayToTree(arr) {
  let root = []
  let newRes = []
  newRes = arr.map(item=>{...item,children:[]})
}
const arr = [
  { id: 1, parentId: null, name: "Node 1" },
  { id: 2, parentId: 1, name: "Node 2" },
  { id: 3, parentId: 1, name: "Node 3" },
  { id: 4, parentId: 2, name: "Node 4" },
  { id: 5, parentId: 2, name: "Node 5" },
  { id: 6, parentId: 3, name: "Node 6" },
  { id: 7, parentId: 4, name: "Node 7" },
  { id: 8, parentId: 5, name: "Node 8" },
];
//   console.log(arrayToTree(arr))

// 37、归并

function mergeSort(arr) {}

function merge(left, right) {}

// PromiseAll并且限制并发

function limitConcurrency(arr, limit) {}
