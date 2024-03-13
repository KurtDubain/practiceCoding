// function quickSort(arr, left = 0, right = arr.length - 1) {
//   if (left < right) {
//     let p = getP(arr, left, right);
//     quickSort(arr, left, p - 1);
//     quickSort(arr, p + 1, right);
//   }
//   return arr;
// }
// function getP(arr, left, right) {
//   let p = arr[right];
//   let i = left;
//   for (let j = left; j < right; j++) {
//     if (arr[j] < p) {
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//       i++;
//     }
//   }
//   [arr[i], arr[right]] = [arr[right], arr[i]];
//   return i;
// }
// let arr = [3, 6, 8, 10, 1, 2, 1];
// console.log(quickSort(arr));
function threeSum(arr) {
  const result = [];
  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    let left = i + 1;
    let right = arr.length - 1;
    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];
      if (sum === 0) {
        result.push([arr[i], arr[left], arr[right]]);
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      }
    }
  }
  return result;
}
const arr = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(arr));
