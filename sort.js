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

function fn1(a,b){
  console.log('hahaha',b);
  return{
    innerFn:function(c){
      return fn1(c,a)
    }
  }
}

fn1(1).innerFn(2).innerFn(3).innerFn(4)

function fn2(a,b){
  console.log('heihie',b);
  return{
    fn2:function(c){
      return fn2(c,a)
    }
  }
}

let a = fn2(1)
a.fn2(2)
a.fn2(3)
a.fn2(4)

let b = fn2().fn2(2)
b.fn2(3).fn2(4)
b.fn2(5).fn2(6)