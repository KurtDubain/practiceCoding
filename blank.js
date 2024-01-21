
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

}

// 24、最长无重复子串
function findLongStr(str){

}

// 31、对象扁平化
function flattenObject(obj) {

}

// 5、vue3响应式
function reactive(obj) {
    const handlers={
        get(target,key,receiver){
            TrackEvent(target,key)
            return Reflect.get(target,key,receiver)
        },
        set(target,key,value,receiver){
            const oldVal = target[key]
            const result = Reflect.set(target,key,value,receiver)
            if(oldVal !==value){
                trigger(target,key)
            }
            return result
        },
        deleteProperty(target,key){
            const result = Reflect.deleteProperty(target,key)
            trigger(target,key)
            return result
        }
    }
    return new Proxy(obj,handlers)
}
// 7、全排列
function permute(nums) {

}
console.log(permute(1,2,3))


// 9、数组转树
function arrayToTree(arr) {

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
function threeSum(nums) {

}


// 限制并发
function limitConcurrency(urls, maxConcurrency) {
    
}

