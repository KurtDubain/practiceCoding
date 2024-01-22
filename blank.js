
// 13、深拷贝（解决循环应用）
function Deepclone(obj,visited = new Map()){
    if(obj===null||typeof(obj)!=='object'){
        return obj
    }
    if(visited.has(obj)){
        return visited.get(obj)
    }
    const clone = Array.isArray(obj)?[]:{}
    visited.set(obj,clone)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            clone[key] = Deepclone(obj[key])
        }
    }
    return clone
}


// 15、零钱兑换
function findMoney(account,coins){
    const dp = new Array(account+1).fill(Infinity)
    dp[0] = 0
    for(let i = 1;i<account+1;i++){
        for(let coin of coins){
            if(coin<=i){
                dp[i]=Math.max(dp[i],dp[i-coin]+1)
            }
        }
    }
    return dp[account]
}

// 24、最长无重复子串
function findLongStr(str){
    let start = 0
    let end = 0
    let maxStart = 0
    let maxLength = 0
    const set = new Set()
    while(start<str.length&&end<str.length){
        if(!set.has(str[end])){
            if(maxLength<(end-start+1)){
                maxLength = end-start+1
                maxStart = start
            }
            set.add(str[end],end)
            end++
        }else{
            set.delete(str[start])
            start++
        }
    }
    return str.substr(maxStart,maxLength)
}

// 31、对象扁平化
function flattenObject(obj) {
    const result = {}
    function flat(curObj,curKey){
        for(let key in curObj){
            if(curObj.hasOwnProperty(key)){
                const newKey = curKey?`${curKey}.${key}`:key
                if(curObj[key]!==null&&typeof(curObj[key])==='object'){
                    flat(curObj[key],newKey)
                }else{
                    result.push(curKey)
                }
            }
        }
    }
    flat(obj,'')
    return result
}


// 7、全排列
function permute(nums) {
    const result = []
    function backtrack(start){
        if(start === nums.length-1){
            result.push(...nums)
            return
        }
        for(let i = start;i<nums.length;i++){
            [nums[i],nums[start]] = [nums[start],nums[i]]
            backtrack(start+1)
            [nums[i],nums[start]] = [nums[start],nums[i]]
        }
    }
    backtrack(0)
    return result
}
console.log(permute(1,2,3))


// 9、数组转树
function arrayToTree(arr) {
    const roots = []
    const map = []
    arr.map(item=>{
        arr[item.id] = {...item,children:[]}
    })
    Object.values(map).forEach(node=>{
        if(node.parentId!==null){
            map[node.parentId].children.push(node)
        }else{
            roots.push(node)
        }
    })
    return roots
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
//   console.log(arrayToTree(arr))
// 10、三数之和
function threeSum(nums,n) {
    nums.sort((a,b)=>a-b)
    const result = []
    for(let i =0;i<nums.length;i++){
        if(nums[i]>n){
            break
        }
        if(nums[i]===nums[i-1]){
            continue
        }
        let left = i+1
        let right = nums.length-1
        while(left<right){
            const sum = nums[i]+nums[left]+nums[right]
            if(sum === n){
                result.push([nums[i],nums[left],nums[right]])
                while(nums[left]===nums[left+1]&&left<right){
                    left++
                }
                while(nums[right]===nums[right-1]&&right>left){
                    right--
                }
            }else if(sum<n){
                left++
            }else{
                right--
            }
        }
    }
    return result
}


// 限制并发
function limitConcurrency(urls, maxConcurrency) {
    return new Promise((resolve,reject)=>{
        const result = []
        function tryIt(){
            if(result.length===urls.length){
                resolve(result)
            }
            
        }
        for(let i = 0;i<maxConcurrency;i++){
            tryIt()
        }
    })
}   

function findTargetPath(root, target) {

  }

  // 删除相邻重复链表
function deleteRepeatNode(head){

}