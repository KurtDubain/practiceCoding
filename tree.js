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
function findTargetPath(root, target) {
    const result = [];
    
    function dfs(node, path, curSum) {
      if (!node) {
        return;
      }
      
      curSum += node.val;
      path.push(node.val);
  
      if (!node.left && !node.right && curSum === target) {
        result.push([...path]);
      }
      
      dfs(node.left, path, curSum);
      dfs(node.right, path, curSum);
  
      path.pop();
    }
    
    dfs(root, [], 0);
  
    return result;
  }

// 二叉平衡树
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        return node ? node.height : 0;
    }

    getBalanceFactor(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    rotateLeft(node) {
        const newRoot = node.right;
        node.right = newRoot.left;
        newRoot.left = node;
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        newRoot.height = Math.max(this.getHeight(newRoot.left), this.getHeight(newRoot.right)) + 1;
        return newRoot;
    }

    rotateRight(node) {
        const newRoot = node.left;
        node.left = newRoot.right;
        newRoot.right = node;
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        newRoot.height = Math.max(this.getHeight(newRoot.left), this.getHeight(newRoot.right)) + 1;
        return newRoot;
    }

    insert(val, node = this.root) {
        if (!node) {
            return new TreeNode(val);
        }

        if (val < node.val) {
            node.left = this.insert(val, node.left);
        } else if (val > node.val) {
            node.right = this.insert(val, node.right);
        } else {
            // 重复值不插入
            return node;
        }

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        const balanceFactor = this.getBalanceFactor(node);

        // 左子树高度大于右子树
        if (balanceFactor > 1 && val < node.left.val) {
            return this.rotateRight(node);
        }

        // 右子树高度大于左子树
        if (balanceFactor < -1 && val > node.right.val) {
            return this.rotateLeft(node);
        }

        // 左右子树高度差超过1
        if (balanceFactor > 1 && val > node.left.val) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // 右左子树高度差超过1
        if (balanceFactor < -1 && val < node.right.val) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }
}

// // 示例
// const avlTree = new AVLTree();
// avlTree.root = avlTree.insert(10);
// avlTree.root = avlTree.insert(20);
// avlTree.root = avlTree.insert(30);
// console.log(avlTree.root); // 输出 AVLTree 的根节点
function bfs(root) {
    if (!root) {
      return;
    }
    let result = [];
    let queue = [root];
    while (queue.length > 0) {
      const levelSize = queue.length;
      let currentLevel = [];
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        currentLevel.push(node.val);
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }
      result.push(currentLevel);
    }
    return result;
  }

// 输入中序遍历和后续遍历的结果，构造树
  function buildTree(inorder, postorder) {
    if (inorder.length === 0 || postorder.length === 0) {
      return null;
    }
  
    const rootVal = postorder.pop();
    const root = new TreeNode(rootVal);
    const rootIndexInorder = inorder.indexOf(rootVal);
  
    root.right = buildTree(inorder.slice(rootIndexInorder + 1), postorder);
    root.left = buildTree(inorder.slice(0, rootIndexInorder), postorder);
  
    return root;
  }

function reverseTree(root){
    if(root === null){
        return null
    }
    
    const left = reverseTree(root.left)
    const right = reverseTree(root.right)

    root.left = right
    root.right = left

    return root
}
// 树转数组
function TreeToArray(arrayData){
    let result = []
    for(let i = 0;i<arrayData.length;i++){
        let item = arrayData[i]
        let children = item.children
        result.push(item)
        if(children&&children.length){
            // ArrayToTree(children)
            result = result.concat(arrayData(children))
        }
    }
    return result
}
// 数组转树
function ArrayToTree1(arr){
    let root = []
    let parent2ChildrenMap = {}
    for(let i = 0;i<arr.length;i++){
        let item = arr[i]
        if(item.pid === null){
            root.push(item)
        }else{
            if(!parent2ChildrenMap[item.pid]){
                parent2ChildrenMap[item.pid]=[]
            }
            parent2ChildrenMap[item.pid].push(item)
        }
    }
    for(let i = 0;i<arr.length;i++){
        let item = arr[i]
        if(parent2ChildrenMap[item.id]){
            item.children = parent2ChildrenMap[item.id]
        }
    }
    return root
}

// 数组转树2
function ArrayToTree2(arr,parentId = null){
    const tree = []
    for(let i = 0;i<arr.length;i++){
        const item = arr[i]
        if(item.pid===parentId){
            const child = ArrayToTree2(arr,item.pid)
            const newItem = {...item,child}
            tree.push(newItem)
        }
    }
    return tree
}
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