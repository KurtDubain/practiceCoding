function ArrayToTree(arrayData){
    let result = []
    for(let i = 0;i<arrayData.length;i++){
        let item = arrayData[i]
        let children = item.children
        result.push(item)
        if(children&&children.length>0){
            result = result.concat(arrayData(children))
        }
    }
    return result
}
console.log(ArrayToTree([{},{},{},{}]))