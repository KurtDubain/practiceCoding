// 用于记录Vue的一些算法
// 全局事件总线
class Eventbus{
    constructor(){
        this.event = {}
    }
    on(name,func){
        if(!this.event[name]){
            this.event[name]=[]
        }
        this.event[name].push(func)
    }
    off(name){
        if(this.event[name]){
            delete this.event[name]
        }
    }
    emit(name,...args){
        if(this.event[name]){
            this.event[name].forEach(func=>[
                func(...args)
            ])
        }
    }
}

// 自定义指令对象
const myDirective = {
    // 当被绑定的元素插入到 DOM 中时
    inserted(el) {
      el.focus(); // 当插入到 DOM 中时，自动聚焦元素
    },
    // 当绑定元素的值更新时
    update(el, binding) {
      el.style.backgroundColor = binding.value; // 更新元素的背景颜色
    },
  };
  
  export default myDirective;
  // 全局注册
// import Vue from 'vue';
// import myDirective from './myDirective';

// Vue.directive('my-directive', myDirective);

// // 局部注册
// export default {
//   directives: {
//     myDirective,
//   },
// };

  // 手写 Promise.all
function customPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      const results = [];
      let completedCount = 0;
  
      for (let i = 0; i < promises.length; i++) {
        promises[i]
          .then(result => {
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
  
  // 手写 Promise.race
  function customPromiseRace(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i]
          .then(resolve)
          .catch(reject);
      }
    });
  }
  
//   // 测试
//   const promise1 = new Promise(resolve => setTimeout(() => resolve("Promise 1"), 1000));
//   const promise2 = new Promise(resolve => setTimeout(() => resolve("Promise 2"), 500));
//   const promise3 = new Promise((resolve, reject) => setTimeout(() => reject("Promise 3 Error"), 800));
  
//   customPromiseAll([promise1, promise2])
//     .then(results => console.log("Promise.all:", results))
//     .catch(error => console.error("Promise.all Error:", error));
  
//   customPromiseRace([promise1, promise2, promise3])
//     .then(result => console.log("Promise.race:", result))
//     .catch(error => console.error("Promise.race Error:", error));
  
// diff算法
function diffArrays(oldArray, newArray) {
  const patches = [];

  function compareArrays(oldArr, newArr, path = '') {
      if (!Array.isArray(oldArr) || !Array.isArray(newArr)) {
          if (oldArr !== newArr) {
              patches.push(`Change ${path}: ${oldArr} => ${newArr}`);
          }
          return;
      }

      for (let i = 0; i < Math.max(oldArr.length, newArr.length); i++) {
          const oldItem = oldArr[i];
          const newItem = newArr[i];

          const itemPath = path + `[${i}]`;

          if (i >= oldArr.length) {
              patches.push(`Add ${itemPath}: ${newItem}`);
          } else if (i >= newArr.length) {
              patches.push(`Remove ${itemPath}: ${oldItem}`);
          } else {
              compareArrays(oldItem, newItem, itemPath);
          }
      }
  }

  compareArrays(oldArray, newArray);
  return patches;
}

const oldArray = ['a', 'b', 'c', 'd'];
const newArray = ['b', 'a', 'd', 'e', 'f'];
const changes = diffArrays(oldArray, newArray);
// console.log(changes);

function diffObjects(oldObj, newObj, path = '') {
  const patches = [];

  function compareValues(oldVal, newVal, path) {
      if (typeof oldVal === 'object' && oldVal !== null && typeof newVal === 'object' && newVal !== null) {
          compareObjects(oldVal, newVal, path);
      } else if (oldVal !== newVal) {
          patches.push(`Change ${path}: ${oldVal} => ${newVal}`);
      }
  }

  function compareObjects(oldObj, newObj, path) {
      const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
      for (const key of allKeys) {
          const oldVal = oldObj[key];
          const newVal = newObj[key];
          const newPath = path ? `${path}.${key}` : key;
          if (!(key in oldObj)) {
              patches.push(`Add ${newPath}: ${newVal}`);
          } else if (!(key in newObj)) {
              patches.push(`Remove ${newPath}: ${oldVal}`);
          } else {
              compareValues(oldVal, newVal, newPath);
          }
      }
  }

  compareObjects(oldObj, newObj, path);
  return patches;
}