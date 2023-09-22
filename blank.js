function getMaxDisjointSubarrayProduct(nums) {
    if (nums.length === 0) {
      return 0;
    }
  
    let maxProduct = nums[0];
    let positiveMax = nums[0];
    let negativeMax = nums[0];
  
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] > 0) {
        positiveMax = Math.max(nums[i], positiveMax * nums[i]);
        negativeMax = negativeMax * nums[i];
      } else if (nums[i] < 0) {
        const temp = positiveMax;
        positiveMax = Math.max(nums[i], negativeMax * nums[i]);
        negativeMax = Math.min(nums[i], temp * nums[i]);
      } else {
        positiveMax = 0;
        negativeMax = 0;
      }
  
      maxProduct = Math.max(maxProduct, positiveMax);
    }
  
    return maxProduct;
  }
  
  // 示例用法
  const nums = [2, -3, 1, 0, -2, 4, -5, -6, 3];
  const maxProduct = getMaxDisjointSubarrayProduct(nums);
  console.log(maxProduct);