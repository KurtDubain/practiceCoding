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
