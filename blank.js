function findLongStr(str){
    let start = 0
    let end = 0
    let maxSum = 0
    const remSet = new Set()
    while(start<str.length&&end<str.length){
        if(!remSet.has(str[end])){
            remSet.add(str[end],end)
            maxSum = Math.max(maxSum,end-start+1)
            end++
        }else{
            remSet.delete(str[start])
            start++
        }
    }
    return maxSum
}
console.log(findLongStr('abcceb'))