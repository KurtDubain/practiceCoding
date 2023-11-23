
// 31、对象扁平化
function flatObj(obj){
  const result = {}
  function flat(curObj,curKey){
    for(let key in curObj){
      if(curObj.hasOwnProperty(key)){
        const newKey = curKey?`${curKey}.${key}`:key
        if(typeof curObj[key]==='object'&&curObj[key]!==null){
          flat(curObj[key],newKey)
        }else{
          result[newKey]= curObj[key]
        }
      }
    }
  }
  flat(obj,'')
  return result
}


// 7、全排列

function sortAll(arr){
  const result = []
  function backtrack(start){
    if(start===arr.length){
      result.push([...arr])
      return
    }
    for(let i = start;i<arr.length;i++){
      [arr[i],arr[start]]=[arr[start],arr[i]]
      backtrack(start+1)
      [arr[i],arr[start]]=[arr[start],arr[i]]
    }
  }
  backtrack(0)
  return result
}

// 9、数组转树
function arrayToTree(arr){
  const map = {}
  const roots = []

  arr.forEach((item)=>{
    map[item.id]={...item,children:[]}
  })

  Object.values(map).forEach(node=>{
    if(node.pid!==null){
      map[node.pid].children.push(node)
    }else{
      roots.push(node)
    }
  })
  return roots

}

//   console.log(arrayToTree(arr))
// 10、三数之和
function threeSum(arrs,sum){
  arrs.sort((a,b)=>a-b)
  const result = []

  for(let i = 0;i<arrs.length;i++){
    if(arrs[i]>sum){
      break
    }
    if(i>0&&arrs[i]===arrs[i-1]){
      continue
    }
    let left = i+1
    let right = arrs.length-1
    while(left<right){
      const sumNew = arrs[i]+arrs[left]+arrs[right]
      if(sum===sumNew){
        result.push([arrs[i],arrs[right],arrs[left]])
        while(left<right&&arrs[left]===arrs[left+1]){
          left++
        }
        while(right>left&&arrs[right]===arrs[right-1]){
          right--
        }
      }
      else if(sumNew>sum){
        left++
      }else{
        right--
      }

    }
  }
  return result

}

// 12、归并
function mergeSort(arr){
  if(arr.length<2){
    return arr
  }
  let mid = Math.floor(arr.length/2)
  let left = arr.slice(0,mid)
  let right = arr.slice(mid)
  return merge(mergeSort(left),mergeSort(right))
}
function merge(left,right){
  const result = []
  let leftIndex = 0
  let rightIndex = 0
  while(leftIndex<left.length&&right<right){
    if(left[leftIndex]<right[rightIndex]){
      result.push(left[leftIndex])
      leftIndex++
    }else{
      result.push(right[rightIndex])
      rightIndex++
    }
  }
  return result.concat(left.slice(leftIndex).concat(right.slice(rightIndex)))
}





