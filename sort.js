// 排序类的算法

// 快速排序
function quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const pivot = arr[Math.floor(Math.random()*arr.length)]
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
  

// 归并排序

function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
  }
  
  function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
  
// 冒泡排序
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
  

// 选择排序
function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
  }

//   插入排序
function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      const current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    return arr;
  }
  

// 二分法
function binary(arr,target){
    let left = 0
    let right = arr.length - 1
    while(left <= right){
        mid = Math.floor((left+right)/2)
        if( target === a[mid] ){
            return mid
        }else if(target > a[mid]){
            left = mid + 1
        }else{
            right = mid - 1
        }
    }
    return -1
}

// 数组乱序算法
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 合并有序数组
function mergeSortedArrays(nums1, m, nums2, n) {
  let p1 = m - 1; // 指向 nums1 末尾
  let p2 = n - 1; // 指向 nums2 末尾
  let p = m + n - 1; // 合并后数组的末尾索引

  while (p1 >= 0 && p2 >= 0) {
      if (nums1[p1] > nums2[p2]) {
          nums1[p] = nums1[p1];
          p1--;
      } else {
          nums1[p] = nums2[p2];
          p2--;
      }
      p--;
  }

  // 将剩余的 nums2 元素合并到 nums1 中
  while (p2 >= 0) {
      nums1[p] = nums2[p2];
      p2--;
      p--;
  }
}

// 找出数组中非最大数字的个数
function countNotNum(arr){
  if(arr.length <= 1){
    return 0
  }
  let maxNum = Math.max(...arr)
  let count = 0
  for(let i = 0; i < arr.length ; i++){
    if(a[i] !== maxNum){
      count ++
    }
  }
  return count
}

function sortColors(nums) {
  let low = 0;
  let high = nums.length - 1;
  let i = 0;

  while (i <= high) {
    if (nums[i] === 0) {
      [nums[i], nums[low]] = [nums[low], nums[i]];
      low++;
      i++;
    } else if (nums[i] === 1) {
      i++;
    } else if (nums[i] === 2) {
      [nums[i], nums[high]] = [nums[high], nums[i]];
      high--;
    }
  }
}

// 测试
// const colors = [2, 0, 2, 1, 1, 0];
// sortColors(colors);
// console.log(colors); // 输出 [0, 0, 1, 1, 2, 2]

function nextGreaterElement(nums1, nums2) {
  const result = [];
  const stack = [];

  const map = new Map();

  // 遍历 nums2，将每个元素与它的下一个更大元素建立映射关系
  for (let i = 0; i < nums2.length; i++) {
    while (stack.length > 0 && nums2[i] > stack[stack.length - 1]) {
      map.set(stack.pop(), nums2[i]);
    }
    stack.push(nums2[i]);
  }

  // 遍历 nums1，根据映射关系找到下一个更大元素
  for (let i = 0; i < nums1.length; i++) {
    result.push(map.get(nums1[i]) || -1);
  }

  return result;
}

// // 测试
// const nums1 = [4, 1, 2];
// const nums2 = [1, 3, 4, 2];
// const result = nextGreaterElement(nums1, nums2);
// console.log(result); // 输出 [ 3, -1, -1 ]

