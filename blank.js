function quickSort(arr){
    if(arr.length<=1){
        return arr
    }
    let q = arr[Math.floor(arr.length/2)]
    let right = []
    let left = []
    for(let i = 0;i<arr.length;i++){
        if(i===Math.floor(arr.length/2)){
            continue
        }
        if(arr[i]>=q){
            right.push(arr[i])
        }else{
            left.push(arr[i])
        }
    }
    return [...quickSort(left),q,...quickSort(right)]
}

let arr1 = [231,324,3,52,2431,4]
console.log(quickSort(arr1))