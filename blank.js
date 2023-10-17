// function findSubarrayWithSumK(nums, k) {
//     const map = new Map(); // 用于存储前缀和及其出现次数
//     map.set(0, [-1]); // 初始化前缀和为0的索引数组为[-1]
//     let sum = 0; // 当前的前缀和
//     const result = []; // 存储和为 k 的子数组
  
//     for (let i = 0; i < nums.length; i++) {
//       sum += nums[i];
//       if (map.has(sum - k)) {
//         const indexes = map.get(sum - k); // 获取前缀和为 sum - k 的索引数组
//         for (const index of indexes) {
//           result.push(nums.slice(index + 1, i + 1)); // 将子数组加入结果数组
//         }
//       }
//       if (!map.has(sum)) {
//         map.set(sum, []);
//       }
//       map.get(sum).push(i); // 将当前前缀和的索引加入索引数组
//     }
//     return result;
//   }
  
// function subarraySum(nums, k) {
//     let count = 0; // 计数器，记录和为 k 的子数组个数
//     let sum = 0; // 前缀和
//     const prefixSumMap = new Map(); // 前缀和及其出现次数的映射表
//     prefixSumMap.set(0, [-1]); // 初始化前缀和为 0 的索引为 -1
  
//     const result = []; // 用于存储和为 k 的子数组的起始和终止索引
  
//     for (let i = 0; i < nums.length; i++) {
//       sum += nums[i];
//       if (prefixSumMap.has(sum - k)) {
//         const indices = prefixSumMap.get(sum - k);
//         count += indices.length;
//         result.push(...indices.map((index) => [index + 1, i])); // 将起始和终止索引存入 result
//       }
//       if (prefixSumMap.has(sum)) {
//         prefixSumMap.get(sum).push(i);
//       } else {
//         prefixSumMap.set(sum, [i]);
//       }
//     }
  
//     return { count, result };
//   }

function findSubarray(nums, k) {
    const result = [];
  
    function backtrack(start, currSum, currArr) {
      if (currSum === k) {
        result.push([...currArr]);
      }
  
      for (let i = start; i < nums.length; i++) {
        currArr.push(nums[i]);
        backtrack(i + 1, currSum + nums[i], currArr);
        currArr.pop();
      }
    }
  
    backtrack(0, 0, []);
  
    return result;
  }
  // 使用示例
  const nums = [3, 1, 7, 2, -3, 1, 4];
  const k = 7;
  const subarrays = findSubarray(nums, k);
  console.log(subarrays);