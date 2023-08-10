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