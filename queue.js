// 括号闭合问题
function isClosed(str){
    if(!str){
        return true
    }

    const queue = []
    const left = ['(','[','{']
    const right = [')',']','}']
    for(let i = 0; i<str.length; i++){
        const firstStr = str[i]
        if(left.includes(firstStr)){
            queue.push(firstStr)

        }else if(right.includes(firstStr)){
            let ShouldLast = queue.pop()
            if( ShouldLast !== left[right.indexOf(firstStr)]){
                return false
            }
        }
    }
    return true
}
console.log(isClosed('[()]{}{[()()]()}'))
console.log(isClosed('[(()]'))