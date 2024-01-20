function Ch16To10(str){
    const strArr = '0123456789ABCDEF'
    let sum = 0
    for(let i = 0;i<str.length;i++){
        const curStr = str[i]
        const curNum = strArr.indexOf(curStr)
        sum = 16*sum+curNum
    }
    return sum
}
console.log(Ch16To10('1A'))