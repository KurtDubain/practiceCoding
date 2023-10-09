const fun = function (str) {
    const arr = str.split(' ');
    const trees = JSON.parse(arr[0]);
    const answer = JSON.parse(arr[1]);
    const root = trees[0]
    const result = []
    const path = []
    path.push(root.deptName)
    buildTree(root)
    dfs(root)
    console.log(result)

    function dfs(root) {
        for (let i = 0; i < answer.length; i++) {
            if (root.set.has(answer[i])) {
                result[i] = path.join('-')
            }
        }
        if (root.subDeptIds.length === 0) return
        for (let i = 0; i < root.children.length; i++) {
            path.push(root.children[i].deptName)
            dfs(root.children[i])
            path.pop()
        }
    }

    function buildTree(root) {
        root.set = new Set(root.memberIds)
        if (root.subDeptIds.length === 0) return
        root.children = []
        const set = new Set(root.subDeptIds)
        for (let i = 0; i < trees.length; i++) {
            if (set.has(trees[i].deptId)) {
                root.children.push(trees[i])
                buildTree(trees[i])
            }
        }

    }
}

fun('[{"deptId":1,"deptName":"总部","subDeptIds":[2,3],"memberIds":[1,2]},{"deptId":2,"deptName":"分部1","subDeptIds":[],"memberIds":[3,4,5]},{"deptId":3,"deptName":"分部2","subDeptIds":[4],"memberIds":[6,7,8]},{"deptId":4,"deptName":"分部4","subDeptIds":[],"memberIds":[9,10]}] [2,4,6,9]')
