// 0-1 bp
function knapsack01(weights, values, capacity) {
    const n = weights.length;
    const dp = new Array(n + 1).fill(0).map(() => new Array(capacity + 1).fill(0));
  
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= capacity; j++) {
        if (weights[i - 1] <= j) {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i - 1]] + values[i - 1]);
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
  
    return dp[n][capacity];
  }
  
  // 示例用法
//   const weights = [2, 3, 4, 5];
//   const values = [3, 4, 5, 6];
//   const capacity = 5;
//   const result = knapsack01(weights, values, capacity);
//   console.log("0-1 背包问题的最大价值：" + result);

//   完全背包
function knapsackComplete(weights, values, capacity) {
    const n = weights.length;
    const dp = new Array(n + 1).fill(0).map(() => new Array(capacity + 1).fill(0));
  
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= capacity; j++) {
        if (weights[i - 1] <= j) {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - weights[i - 1]] + values[i - 1]);
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
  
    return dp[n][capacity];
  }
  
  // 示例用法
//   const weights = [2, 3, 4, 5];
//   const values = [3, 4, 5, 6];
//   const capacity = 5;
//   const result = knapsackComplete(weights, values, capacity);
//   console.log("完全背包问题的最大价值：" + result);
  
// 打家劫舍1，不能偷相邻的房间
function rob(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  const dp = new Array(n);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[n - 1];
}

// const houses = [2, 7, 9, 3, 1];
// console.log(rob(houses)); // 输出 12

// 打家劫舍2，形成一个环，仍旧是相邻房间不能被偷
function rob(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  
  // 拆分成两个子问题：1. 偷第一间房不偷最后一间，2. 偷最后一间房不偷第一间
  return Math.max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
}

function robRange(nums, start, end) {
  const n = end - start + 1;
  if (n === 1) return nums[start];
  
  const dp = new Array(n);
  dp[0] = nums[start];
  dp[1] = Math.max(nums[start], nums[start + 1]);
  
  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[start + i]);
  }
  
  return dp[n - 1];
}

// const houses = [2, 3, 2];
// console.log(rob(houses)); // 输出 3

// 打家劫舍3，结构为二叉树，相邻节点不能被偷
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function rob(root) {
  const result = robTree(root);
  return Math.max(result[0], result[1]);
}

function robTree(node) {
  if (node === null) {
    return [0, 0];
  }

  const left = robTree(node.left);
  const right = robTree(node.right);

  const robCurrent = node.val + left[1] + right[1];
  const skipCurrent = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

  return [robCurrent, skipCurrent];
}

// const root = new TreeNode(3);
// root.left = new TreeNode(2);
// root.right = new TreeNode(3);
// root.left.right = new TreeNode(3);
// root.right.right = new TreeNode(1);

// console.log(rob(root)); // 输出 7

// "最长字符串链" 问题可以使用动态规划来解决。给定一组单词，你需要找出其中的最长字符串链，其中每个单词可以通过删除一个字母变成另一个单词。
function longestStrChain(words) {
  words.sort((a, b) => a.length - b.length);
  const dp = new Array(words.length).fill(1);

  for (let i = 1; i < words.length; i++) {
    for (let j = 0; j < i; j++) {
      if (isPredecessor(words[j], words[i])) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

function isPredecessor(word1, word2) {
  if (word1.length + 1 !== word2.length) return false;
  
  let i = 0, j = 0;
  let diffCount = 0;

  while (i < word1.length && j < word2.length) {
    if (word1[i] !== word2[j]) {
      diffCount++;
      j++;
    } else {
      i++;
      j++;
    }
  }

  return diffCount <= 1;
}

const words = ["a", "b", "ba", "bca", "bda", "bdca"];
console.log(longestStrChain(words)); // 输出 4

// 最长递增子序列
function findMaxLength(arr){
  if(arr.length <= 1 ){
      return arr.length
  }

  let dp = new Array(arr.length).fill(1)
  let maxLength = 1
  for(let i = 1; i < arr.length; i++){
      for(let j = 0; j < i; j++){
          if(arr[i] > arr[j]){
              dp[i] = Math.max(dp[i], dp[j] + 1)
          }
      }
      maxLength = Math.max(maxLength, dp[i])
      
  }
  return maxLength

}

const arr = [10,9,2,5,3,7,101,18]
console.log(findMaxLength(arr))

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
