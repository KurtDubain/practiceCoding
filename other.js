// 其他算法的记录

// 翻转数字（带有符号，且有数字范围）
function reverse( x ) {
    // 判断是否为负数
    const isNe = x < 0
    // 全部转正数
    let num = Math.abs(x)

    let reverseNum = 0
    // 计算数值部分的翻转数值
    while( num > 0){
        reverseNum = reverseNum *10 +(num % 10)
        num = Math.floor(num /10)
    }
    // 处理负数
    if(isNe){
        reverseNum = - reverseNum
    }
    // 判断范围是否超出规定
    if(reverseNum < Math.pow(-2,31) || reverseNum > Math.pow(2,31) - 1){
        return 0
    }
    return reverseNum

}

// 计算一个数组，数组数值为给定数组的对应的除去自身值的乘积
function multiply( A ) {
    let n = A.length
    // 构建所有元素的左乘积和右乘积
    let leftRes = new Array(n)
    let rightRes = new Array(n)
    // 构建最后的结果
    let lastRes = new Array(n)

    // 逐次计算
    leftRes[0] = 1
    for(let i = 1;i < n;i++){
        leftRes[i] = leftRes[i - 1]*A[i - 1]
    }
    rightRes[n-1] = 1
    for(let i = n-2;i >= 0;i--){
        rightRes[i] = rightRes[i + 1]*A[i+1]
    }
    // 将左右的成绩计算，赋值给对应的总结果
    for(let i = 0;i < n;i++){
        lastRes[i] = leftRes[i] * rightRes[i]
    }
    return lastRes

}

// 数组扁平化
function flatArray(arr){
    let result = []
    for(let i = 0;i < arr.length-1 ;i++){
        if(Array.isArray(arr[i])){
            result = result.concat(flatArray(arr[i]))
        }else{
            result.push(arr[i])
        }
    }
    return result
}

// 寻找最大递增字符串长度
function findMax(str){
    if(!str){
        return ''
    }
    let maxSubstr = ''
    let curSubstr = str[0]

    for(let i = 0; i < str.length; i++){
        if(str[i] > str[i - 1]){
            curSubstr += str[i]
        }else{
            if(curSubstr.length > maxSubstr.length){
                maxSubstr = curSubstr
            }
            curSubstr = str[i]
        }
    }
    if(curSubstr.length > maxSubstr.length){
        maxSubstr = curSubstr
    }
    
    return maxSubstr
}

// 全排列
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
  
//   const nums = [1, 2, 3];
//   const permutations = permute(nums);
//   console.log(permutations);

//   最大子序和
function maxSubArray(nums) {
    if (!nums || nums.length === 0) {
      return 0;
    }
  
    let maxSum = nums[0]; // 最大子序和
    let currentSum = nums[0]; // 当前子序和
  
    for (let i = 1; i < nums.length; i++) {
      // 如果当前子序和小于0，则从当前元素重新开始计算子序和
      currentSum = Math.max(nums[i], currentSum + nums[i]);
      // 更新最大子序和
      maxSum = Math.max(maxSum, currentSum);
    }
  
    return maxSum;
  }
  
//   // 示例用法
//   const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
//   const result = maxSubArray(nums);
//   console.log(result); // 输出 6，对应子序列 [4, -1, 2, 1]
  
//   数组去重
function uniqueUsingIndexOf(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) === -1) {
        result.push(arr[i]);
      }
    }
    return result;
  }
//   千分位分隔符
  function formatNumberWithCommas(number) {
    if (typeof number !== 'number') {
      return number; // 返回原值，或者抛出异常
    }
  
    const strNumber = number.toString();
    const parts = strNumber.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1] || '';
  
    // 对整数部分添加逗号
    let formattedInteger = '';
    let count = 0;
    for (let i = integerPart.length - 1; i >= 0; i--) {
      formattedInteger = integerPart[i] + formattedInteger;
      count++;
      if (count === 3 && i > 0) {
        formattedInteger = ',' + formattedInteger;
        count = 0;
      }
    }
  
    // 合并整数和小数部分
    const formattedNumber = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  
    return formattedNumber;
  }
// 数组扁平并排序去重
  function flattenAndSort(arr) {
    // 将嵌套数组拍平
    const flatArray = arr.reduce((result, current) => result.concat(current), []);
  
    // 排序并去重
    const sortedAndUnique = Array.from(new Set(flatArray)).sort((a, b) => a - b);
  
    return sortedAndUnique;
  }

  // x可以拆成x-1，1或者a，b(a*b=x)；将数组中的每个数字全拆成1的最少次数，js实现算法
function isPrime(num) {
  if (num <= 1) {
      return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
          return false;
      }
  }
  return true;
}

function minStepsTo1(num,count) {
  if (num <= 1) {
      return count;
  }
  if (isPrime(num)) {
      // count ++
      num = num - 1
      return minStepsTo1(num, count+1) 
  }
  for (let i = Math.floor(Math.sqrt(num)); i > 1 ; i--) {
      if (num % i === 0) {
          return minStepsTo1(i,0) + minStepsTo1(num / i,0) + count+1;
      }
  }
  return count;
}

function minStepsArray(arr) {
  const result = [];
  for (const num of arr) {
      let count = 0
      result.push(minStepsTo1(num,count));
      // debugger
  }
  return result;
}

  // 括号字符串所有子串的权值和，js实现算法
  function calcParenthesesSum(s) {
    let stack = [];
    let currentSum = 0;
    
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') {
        stack.push(currentSum);
        currentSum = 0;
      } else {
        currentSum = stack.pop() + Math.max(2 * currentSum, 1);
      }
    }
    
    return currentSum;
  }
  
  // 示例用法
  // const parenthesesString = "(()())";
  // const result = calcParenthesesSum(parenthesesString);
  // console.log("括号字符串所有子串的权值和：" + result);
  
  // 以下是一个 JavaScript 算法，用于实现将字符串的前 k 个字母变成大写，后 n-k 个字母变成小写：
  // 转换字符串
  function transformString(str, k) {
    if (k <= 0 || k > str.length) {
      return "Invalid k value";
    }
  
    let result = "";
  
    for (let i = 0; i < str.length; i++) {
      if (i < k) {
        result += str[i].toUpperCase();
      } else {
        result += str[i].toLowerCase();
      }
    }
  
    return result;
  }
  
  // 输入正整数n，输出一个正方形矩阵，要求包含的数为1~n^2，且相邻的数和为奇数，js实现算法
  function generateMatrix(n) {
    if (n <= 0) {
      return [];
    }
  
    const matrix = new Array(n).fill(null).map(() => new Array(n).fill(0));
  
    let num = 1;
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if ((i + j) % 2 === 0) {
          matrix[i][j] = num++;
        } else {
          matrix[i][j] = n * n - num + 1;
          num++;
        }
      }
    }
  
    return matrix;
  }
  // 示例用法
  // const n = 4;
  // const resultMatrix = generateMatrix(n);
  
  // for (let i = 0; i < n; i++) {
  //   console.log(resultMatrix[i].join(" "));
  // }



  // 长城数组，要求数组内每个数两边的数都相等，且和他本身不相等。输入n，和一个长度为n的任意数组，你需要修改其中的数，使得他变成长城数组，输出最少要修改几个数。js实现算法

  function minModifications(n, nums) {
    if (n <= 2) {
      return 0; // 长度小于等于2的数组无法满足条件
    }
  
    let modifications = 0;
  
    for (let i = 1; i < n - 1; i++) {
      if (nums[i] === nums[i - 1] || nums[i] === nums[i + 1] || nums[i] === nums[i - 1] + 1 || nums[i] === nums[i + 1] - 1) {
        // 修改当前数，使其满足条件
        modifications++;
        nums[i]++;
      }
    }
  
    return modifications;
  }
  
  // // 示例用法
  // const n = 6;
  // const nums = [3, 5, 3, 7, 5, 1];
  // const result = minModifications(n, nums);
  // console.log("最少操作次数：" + result);
  
// 给你n个数，让你分为k个子集，使得这k个子集的最大差值的和最大，js实现算法

function maxSumOfMaxDifferences(nums, k) {
  nums.sort((a, b) => b - a); // 对数组进行降序排序

  let maxSum = 0;

  for (let i = 0; i < k - 1; i++) {
    maxSum += nums[i] - nums[nums.length - i - 1];
  }
  return maxSum;
}

// 跳台阶（递归）（动态规划）

function jumpFloor(n) {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else if (n === 2) {
    return 2;
  } else {
    return jumpFloor(n - 1) + jumpFloor(n - 2);
  }
}
function jumpFloor2(n) {
  if (n <= 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else if (n === 2) {
    return 2;
  } else {
    const dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
  }
}

// 01相邻矩阵判断
function findMinOperations(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let minOperations = Infinity;

  for (let startWithZero = 0; startWithZero <= 1; startWithZero++) {
      let operations = 0;

      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
              const expected = (i + j) % 2 === startWithZero ? '0' : '1';

              if (matrix[i][j] !== expected) {
                  operations++;
              }
          }
      }

      minOperations = Math.min(minOperations, operations);
  }

  return minOperations;
}


// 迭代器对象实现对Object中for of遍历键值的实现
let testObj = {
  a: 1,
  b: 2,
  c: 3
};

testObj[Symbol.iterator] = function() {
  let keys = Object.keys(this);
  let index = 0;

  return {
    next: () => {
      if (index < keys.length) {
        let key = keys[index];
        let value = this[key];
        index++;
        return { value: [key, value], done: false };
      } else {
        return { done: true };
      }
    }
  };
};

for (const [key, value] of testObj) {
  console.log(key, value);
}

Object.prototype[Symbol.iterator]=function*(){
  for(let key in this){
    if(this.hasOwnProperty(key)){
      yield[key,this[key]]
    }
  }
}

// 最小次数实现元素不重复
function minAddOneOperationsToMakeUnique(arr) {
  const uniqueSet = new Set();
  let operations = 0;

  for (const num of arr) {
      while (uniqueSet.has(num)) {
          num++;
          operations++;
      }
      uniqueSet.add(num);
  }

  return operations;
}

// 对比两个对象是否相等
function deepEqual(obj1, obj2) {
  // 检查基本数据类型的相等性
  if (obj1 === obj2) {
    return true;
  }

  // 检查对象类型的相等性
  if (typeof obj1 !== 'object' || obj1 === null ||
      typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  // 获取 obj1 和 obj2 的属性数组
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // 检查属性数量是否一致
  if (keys1.length !== keys2.length) {
    return false;
  }

  // 递归比较每个属性的值
  for (let key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  // 所有属性都相等
  return true;
}
// kmp算法
function buildPatternTable(pattern) {
  const table = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < pattern.length) {
    if (pattern[prefixIndex] === pattern[suffixIndex]) {
      table[suffixIndex] = prefixIndex + 1;
      prefixIndex++;
      suffixIndex++;
    } else if (prefixIndex === 0) {
      table[suffixIndex] = 0;
      suffixIndex++;
    } else {
      prefixIndex = table[prefixIndex - 1];
    }
  }

  return table;
}

function kmpSearch(text, pattern) {
  const patternTable = buildPatternTable(pattern);
  let textIndex = 0;
  let patternIndex = 0;
  const matchedIndices = [];

  while (textIndex < text.length) {
    if (text[textIndex] === pattern[patternIndex]) {
      if (patternIndex === pattern.length - 1) {
        matchedIndices.push(textIndex - pattern.length + 1);
        patternIndex = 0;
        textIndex++;
      } else {
        patternIndex++;
textIndex++;
      }
    } else if (patternIndex > 0) {
      patternIndex = patternTable[patternIndex - 1];
    } else {
      textIndex++;
    }
  }

  return matchedIndices;
}
// 改进kmp算法
function buildPatternTable(pattern) {
  const table = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < pattern.length) {
    if (pattern[prefixIndex] === pattern[suffixIndex]) {
      table[suffixIndex] = prefixIndex + 1;
      prefixIndex++;
      suffixIndex++;
    } else if (prefixIndex === 0) {
      table[suffixIndex] = 0;
      suffixIndex++;
    } else {
      prefixIndex = table[prefixIndex - 1];
    }
  }

  return table;
}

function kmpSearch(text, pattern) {
  const patternTable = buildPatternTable(pattern);
  let textIndex = 0;
  let patternIndex = 0;
  const matchedIndices = [];

  while (textIndex < text.length) {
    if (text[textIndex] === pattern[patternIndex]) {
      if (patternIndex === pattern.length - 1) {
        matchedIndices.push(textIndex - pattern.length + 1);
        patternIndex = patternTable[patternIndex];
      } else {
        textIndex++;
        patternIndex++;
      }
    } else if (patternIndex > 0) {
      patternIndex = patternTable[patternIndex - 1];
    } else {
      textIndex++;
    }
  }

  return matchedIndices;
}
// 深度优先遍历对象（递归和非递归）和广度优先遍历对象
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
      const current = stack.pop()
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
  while(queue.length>0){
      const current = queue.shift()
      console.log(current)
      for(let key in current){
          if(typeof(current[key])==='object'&&current[key]!==null){
              queue.push(current[key])
          }
      }
      
  }
}
