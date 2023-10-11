// function getMaxDisjointSubarrayProduct(nums) {
//     if (nums.length === 0) {
//       return 0;
//     }
  
//     let maxProduct = nums[0];
//     let positiveMax = nums[0];
//     let negativeMax = nums[0];
  
//     for (let i = 1; i < nums.length; i++) {
//       if (nums[i] > 0) {
//         positiveMax = Math.max(nums[i], positiveMax * nums[i]);
//         negativeMax = negativeMax * nums[i];
//       } else if (nums[i] < 0) {
//         const temp = positiveMax;
//         positiveMax = Math.max(nums[i], negativeMax * nums[i]);
//         negativeMax = Math.min(nums[i], temp * nums[i]);
//       } else {
//         positiveMax = 0;
//         negativeMax = 0;
//       }
  
//       maxProduct = Math.max(maxProduct, positiveMax);
//     }
  
//     return maxProduct;
//   }
  
//   // 示例用法
//   const nums = [2, -3, 1, 0, -2, 4, -5, -6, 3];
//   const maxProduct = getMaxDisjointSubarrayProduct(nums);
//   console.log(maxProduct);
// const promise1 = new Promise((resolve,reject)=>{
//   console.log('promise1')
//   resolve('resolve1')
// })
// const promise2 = promise1.then(res=>{
//   console.log(res)
// })
// console.log('1',promise1)
// console.log('2',promise2)
class NodeList{
  constructor(val,next=null){
    this.val = val
    this.next = null
  }
}
function isBackNode(node){
  if(!node&&!node.next){
    return true
  }
  let slow = head
  let quick = head
  while(slow.next&&quick.next.next){
    slow = slow.next
    quick = quick.next.next
  }
  let midHead = reverse(slow)
  let p1 = head
  let p2 = midHead
  while(p1.next&&p2.next){
    if(p1.val!==p2.val){
      return false
    }
  }
  return true
}

function reverse(node){
  let cur = node
  let pre = null
  while(cur){
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
    
  }
  return pre
}