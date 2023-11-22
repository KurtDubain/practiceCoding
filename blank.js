

// 5、vue3响应式
function reactive(obj) {
    const handlers = {
      get(target, key, receiver) {
        track(target, key);  // 追踪依赖
        return Reflect.get(target, key, receiver);
      },
      set(target, key, value, receiver) {
        const oldValue = target[key];
        const result = Reflect.set(target, key, value, receiver);
        if (oldValue !== value) {
          trigger(target, key);  // 触发更新
        }
        return result;
      },
      deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key);
        trigger(target, key);  // 触发更新
        return result;
      },
    };
  
    return new Proxy(obj, handlers);
  }
// 7、全排列
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
// 8、对角线遍历数组
function diagonalTraverse(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) {
      return [];
    }
  
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    let row = 0;
    let col = 0;
    let direction = 1;
  
    for (let i = 0; i < rows * cols; i++) {
      result.push(matrix[row][col]);
  
      row -= direction;
      col += direction;
  
      if (row >= rows) {
        row = rows - 1;
        col += 2;
        direction = -direction;
      }
      if (col >= cols) {
        col = cols - 1;
        row += 2;
        direction = -direction;
      }
      if (row < 0) {
        row = 0;
        direction = -direction;
      }
      if (col < 0) {
        col = 0;
        direction = -direction;
      }
    }
  
    return result;
  }
 
// 9、数组转树
function arrayToTree(arr) {
    const map = {};
    const roots = [];
  
    // 将数组中的每个元素创建成节点，并使用 id 作为键存储在 map 对象中
    arr.forEach((item) => {
      map[item.id] = { ...item, children: [] };
    });
    
  
    // 遍历每个节点，将其添加到其父节点的 children 数组中
    Object.values(map).forEach((node) => {
      if (node.parentId !== null) {
        map[node.parentId].children.push(node);
      } else {
        roots.push(node);
      }
    });
  
    return roots;
  }
  const arr = [
    { id: 1, parentId: null, name: 'Node 1' },
    { id: 2, parentId: 1, name: 'Node 2' },
    { id: 3, parentId: 1, name: 'Node 3' },
    { id: 4, parentId: 2, name: 'Node 4' },
    { id: 5, parentId: 2, name: 'Node 5' },
    { id: 6, parentId: 3, name: 'Node 6' },
    { id: 7, parentId: 4, name: 'Node 7' },
    { id: 8, parentId: 5, name: 'Node 8' },
  ]
  console.log(arrayToTree(arr))
// 10、三数之和
function threeSum(nums) {
    nums.sort((a, b) => a - b);  // 将数组进行排序
    const result = [];
  
    for (let i = 0; i < nums.length - 2; i++) {
      if (nums[i] > 0) {
        break;  // 如果当前数字大于0，则三数之和一定大于0，结束循环
      }
      if (i > 0 && nums[i] === nums[i - 1]) {
        continue;  // 去除重复的元素，避免重复计算
      }
  
      let left = i + 1;
      let right = nums.length - 1;
  
      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];
        if (sum === 0) {
          result.push([nums[i], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) {
            left++;  // 去除左指针重复的元素
          }
          while (left < right && nums[right] === nums[right - 1]) {
            right--;  // 去除右指针重复的元素
          }
          left++;
          right--;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }
  
    return result;
  }


// 12、归并

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

