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
  
