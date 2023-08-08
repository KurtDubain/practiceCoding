// 树类的算法

class tree{
    constructor(val,left,right){
        this.left = null
        this.right = null
        this.val = val
    }
}
// 深度优先遍历
function dfs(root){
    if(!root){
        return 
    }
    console.log(root.val);
    dfs(root.left)
    dfs(root.right)
}
// 广度优先遍历
function bfs(root){

    if(!root){
        return
    }
    let result = []
    let queue = [root]
    while(queue.length > 0 ){
        const node = queue.shift()
        result.push(node.val)
        if(node.left){
            queue.push(node.left)
        }
        if(node.right){
            queue.push(node.right)
        }
    }
}
// 寻找最大路径
function findMaxTreeNode(root){
    let maxSum = -Infinity

    function dfs(node){
        if(!node){
            return
        }
        const leftSum = Math.max(dfs(node.left),0)
        const rightSum = Math.max(dfs(node.right),0)

        const pathSum = node.val + leftSum + rightSum
        maxSum = Math.max(maxSum,pathSum)
        return node.val + Math.max(leftSum,rightSum)
    }
    dfs(root)

    return maxSum
}
// 寻找从根节点出发的最大路径
function findMaxTreeNodeFromRoot(root){
    if(!root){
        return
    }
    let maxSum = -Infinity
    function dfs(node,curSum){
        if(!node){
            return
        }
        curSum += node.val
        if(!node.left &&!node.right){
            maxSum = Math.max(maxSum,curSum)
            return
        }
        dfs(node.left,curSum)
        dfs(node.right,curSum)
    }
    dfs(root,0)

    return maxSum
}
// 寻找目标路径
function findPathTarget(root,target){
    const path = []
    function dfs(node,path,curSum){
        if(!node){
            return
        }
        curSum += node.val
        path.push(node.val)

        if(!node.left && !node.right && curSum === target){
            path.push([...path])
        }
        dfs(node.left,path,curSum)
        dfs(node.right,path,curSum)

        path.pop()
    }
    dfs(root,[],0)

    return path
}