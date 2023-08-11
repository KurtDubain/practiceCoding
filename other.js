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

// 小A和小B拿到两个正整数x，y，他俩可以轮流对x+=1或x*=2，小A先手，谁的操作使得x>=y就算谁赢，小A赢则输出Awin，否则输出Bwin，js实现泛
function solve(x, y) {
  const dp = Array.from({length: y+1}, () => Array(y+1).fill(0));

  for (let j = y; j >= x; j--) {
      for (let i = j; i >= x; i--) {
          if (i >= j) {
              dp[i][j] = 1;
          } else {
              if (2*i >= j || dp[2*i][j] === 0) {
                  dp[i][j] = 1;
              }
              else if (i+1 >= j || dp[i+1][j] === 0) {
                  dp[i][j] = 1;
              }
          }
      }
  }

  return dp[x][y] === 1 ? 'AWin' : 'BWin';
}
// 制作相对面的骰子，使得相对的两面之和相等
function canConstructDie(nums) {
  nums.sort((a, b) => a - b);

  for (let i = 0, j = nums.length - 1; i < j; i++, j--) {
    if (nums[i] === nums[j]) {
      return "No";
    }
  }

  return "Yes";
}
// 小美最近在玩一个种田类游戏。

// 这个游戏的目的是赚尽可能多的钱，游戏中有 n 种作物，其中第 i 种作物从种植到作物成熟采摘需要 ti 天时间，种子买入价格为ai ，作物卖出价格为 bi（一个种子只会产出一个作物，种子可以重复购买）。 而游戏内总时间为 m 天，作物的种子种植和采摘、卖出等不耗时间，成熟之前作物没有价值。

// 假设小美只有一块土地（即每个时间只能有一个作物在生长），初始的钱足够多，小美想知道她最多能赚多少钱。解析题意，并使用js实现对应算法
function maxEarnings(n, m, t, a, b) {
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (j >= t[i - 1]) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - t[i - 1]] + b[i - 1] - a[i - 1]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][m];
}

// 示例用法
const n = 3;
const m = 6;
const crops = [
  { t: 2, a: 2, b: 5 },
  { t: 3, a: 3, b: 7 },
  { t: 4, a: 1, b: 6 }
];
// const result = maxEarnings(n, m, crops);
// console.log(result);
// 小美给你一个长度为 n 的01串（仅包含字符0和1的串），你可以删除这个串的一个前缀和一个后缀（可以为空），即保留一个原串的连续子串，操作之后整个串的代价为下面两部分之和：

// 1. 被删除的字符1的个数；

// 2. 剩下的子串的字符0的个数

// 你需要最小化操作的代价，并将其输出。

// 输入仅一行，一个长度为 n 的01字符串。

// 对于所有数据，1≤n≤105

function minCost(s) {
  let cost = [];
  let ones = 0;
  let zeros = 0;

  // 从左往右计算删除的字符 1 个数和字符 0 个数
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '1') {
      ones++;
    } else {
      zeros++;
    }
    cost[i] = { ones, zeros };
  }

  let minTotalCost = ones + zeros; // 初始操作代价为删除全部字符
  zeros = 0;

  // 从右往左依次删除后缀，更新操作代价
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === '0') {
      zeros++;
    }
    const totalCost = cost[i].ones + zeros;
    minTotalCost = Math.min(minTotalCost, totalCost);
  }

  return minTotalCost;
}

// 示例用法
const s = "101110110";
const result = minCost(s);
console.log(result);
// 小美正在参加一个比赛。

// 这个比赛总共有 2k 个人参加（包括小美），编号为1,2,...,2k，开始的时候所有人都在同一个小组。比试的规程如下：假设当前小组有 n 个人（n 为偶数），那么编号大小前 n/2 人分为一个新的小组，后 n/2 人分为一个新的小组，然后两个小组内部分别比试，决出各自的胜者，然后两个小组的胜者进行比试，胜者作为当前小组的优胜者，直到决出最初的小组的优胜者。当然一个人的小组优胜者肯定是他自己。例如如果当前小组有 4 个人，编号为1,2,3,4，那么就会将 1,2 分为一组，3,4分为一组分别比试，然后 1,2 中的胜者和 3,4 中的胜者再进行比试，决出整个小组的胜者。

// 由于每个人的能力各不相同，小美预测了所有人两两比试时的胜者，现在小美想知道预测最终的胜者是谁。解析题意，并使用js实现对应算法
function findFinalWinner(predictions) {
  const n = predictions.length;
  const queue = []; // 用于模拟比赛的队列

  // 将预测结果加入队列
  for (let i = 0; i < n; i++) {
    queue.push(i + 1); // 编号从 1 开始
  }

  while (queue.length > 1) {
    const newQueue = [];
    for (let i = 0; i < queue.length; i += 2) {
      const winner = predictions[queue[i] - 1] > predictions[queue[i + 1] - 1]
        ? queue[i]
        : queue[i + 1];
      newQueue.push(winner);
    }
    queue.splice(0, queue.length, ...newQueue); // 更新队列
  }

  return queue[0];
}

// 示例用法
const predictions = [2, 1, 3, 1, 2, 4, 3, 4];
const finalWinner = findFinalWinner(predictions);
console.log(finalWinner);
