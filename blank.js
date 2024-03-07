// 1、大数相加
function bigNumAdd(str1, str2) {}

// 2、instanceof手写
function NewInstanceof(obj, constructor) {}
// 3、节流、防抖
function throttle(func, delay) {}
function debounce(func, delay) {}

// 5、16进制转10进制
function Ch16To10(str) {}

// 8、函数柯里化func(1)(2)(3)
function curry(func) {}
// 9、手写Promise以及then以及All
function promiseAll(arr) {}

// 11、实现LRU
class LRUCache {}
// 12、call、bind、apply方法手写
function myCall(context, arg) {}
function myApply(context, ...args) {}
function myBind(context, ...args) {}
// 13、深拷贝（解决循环应用）
function Deepclone(obj, visited = new Map()) {}

// 15、零钱兑换
function findMoney(account, coins) {}

// 19、手写new和寄生组合式继承

function myNew(constructor, ...args) {}

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
function isBackList(head) {}
function reverseNodeList(head) {}

// 24、最长无重复子串
function findLongStr(str) {}
// 25、千分位转换
function changeK(str) {}

// 27、EventBus
class EventBus {}
// 28、Observer
class Observer {}
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
function arrayToTree(arr) {}
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
