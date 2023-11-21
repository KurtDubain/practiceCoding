// diff算法核心 采用双指针的方式 对比新老vnode的儿子节点
function updateChildren(el, oldChildren, newChildren) {
    let oldStartIndex = 0; // 老儿子的开始下标
    let oldStartVnode = oldChildren[0]; // 老儿子的第一个节点
    let oldEndIndex = oldChildren.length - 1; // 老儿子的结束下标
    let oldEndVnode = oldChildren[oldEndIndex] // 老儿子的最后一个节点
    let newStartIndex = 0; // 新儿子的开始下标
    let newStartVnode = newChildren[0]; // 新儿子的第一个节点
    let newEndIndex = newChildren.length - 1; // 新儿子的结束下标
    let newEndVnode = newChildren[newEndIndex] // 新儿子的最后一个节点
    
    // 根据key来创建老的儿子的index映射表，如{'a': 0, 'b': 1}代表key为'a'的节点在第一个位置，'b'在第二个位置
    const makeIndexBykey = (children) => {
      return children.reduce((memo, cur, index) => {
        memo[cur.key] =  index
        return memo
      }, {})
    }  
    const keysMap = makeIndexBykey(oldChildren)
    
    // 只有当新、老儿子的开始下标都小于等于结束下标时才循环，一方不满足就结束循环
    while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
       // 因为暴力对比过程把移动的vnode置为 undefined 如果不存在节点直接跳过
      if (!oldStartVnode) { 
          // 开始位置 向后 +1
        oldStartVnode = oldChildren[++oldStartIndex]
      } else if (!oldEndVnode) {
          // 结束位置 向前 -1
        oldEndVnode = oldChildren[--oldEndIndex]
      }
  
      if (isSameVnode(oldStartVnode, newStartVnode)) { 
        // 新前和后前相同
        // 递归比较儿子以及他们的子节点
        patch(oldStartVnode, newStartVnode)
        // 新，老开始下标 +1， 对应的节点变为 +1 后的节点
        oldStartVnode = oldChildren[++oldStartIndex]
        newStartVnode = newChildren[++newStartIndex]
      } else if (isSameVnode(oldEndVnode, newEndVnode)) {
        // 新后和旧后相同
        // 递归比较儿子以及他们的子节点
        patch(oldEndVnode, newEndVnode)
        // 新，老结束下标 -1， 对应的节点变为 -1 后的节点
        oldEndVnode = oldChildren[--oldEndIndex]
        newEndVnode = newChildren[--newEndIndex]
      } else if (isSameVnode(oldStartVnode, newEndVnode)) { 
        // 新后和旧前相同
        // 递归比较儿子以及他们的子节点
        patch(oldStartVnode, newEndVnode)
        // 开始节点的真实dom,移动到结束节点的下一个前点的前面
        el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
        // 老的开始下标 +1， 对应的节点变为 +1 后的节点
        oldStartVnode = oldChildren[++oldStartIndex]
        // 新的结束下标 -1， 对应的节点变为 -1 后的节点
        newEndVnode = newChildren[--newEndIndex]
      } else if (isSameVnode(oldEndVnode, newStartVnode)) { 
        // 新前和旧后相同
        // 递归比较儿子以及他们的子节点
        patch(oldEndVnode, newStartVnode)
        // 结束结束的真实dom，移动到开始节点的前面
        el.insertBefore(oldEndVnode.el, oldStartVnode.el)
        // 老的结束下标 -1， 对应的节点变为 -1 后的节点
        oldEndVnode = oldChildren[--oldEndIndex]
        // 新的开始下标 +1， 对应的节点变为 +1 后的节点
        newStartVnode = newChildren[++newStartIndex]
      } else {
        // 上述四种情况都不满足 那么需要暴力比对
        // 用新的开始节点的key，去老的子节点生成的映射表中查找
        const moveIndex = keysMap[newStartVnode.key]
        if (!moveIndex) { 
          // 如果没有找到直接把新节点的真实dom，插入到旧的开始节点的真实dom前面
          el.insertBefore(createElm(newStartVnode), oldStartVnode.el)
        } else {
           // 如果找到，取出该节点
          const moveNode = oldChildren[moveIndex] 
          // 原来的位置用undefined占位 避免数组塌陷  防止老节点移动走了之后破坏了初始的映射表位置
          oldChildren[moveIndex] = undefined
          // 把取出的节点的真实dom插入到开始节点的真实dom前面
          el.insertBefore(moveNode.el, oldStartVnode.el)
          patch(newStartVnode, moveNode) //比较
        }
        // 新的开始下标 +1, 对应的节点变为 +1 后的节点
        newStartVnode = newChildren[++newStartIndex]
      }
    }
    // 如果老节点循环完毕了 但是新节点还有，如用户追加了一个，需要把剩余的节点插入
    if (newStartIndex <= newEndIndex ) {
      for (let i = newStartIndex; i <= newEndIndex; i++) {
        // 这是一个优化写法 insertBefore的第一个参数是null等同于appendChild作用
        // 看一下 结束指针的下一个元素是否存在
        let anchor = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el
        el.insertBefore(createElm(newChildren[i]), anchor)
      }
    }
    // 如果新节点循环完毕了 但是老节点还有，如用户删除一个，需要把剩余的节点删除
    if (oldStartIndex <= oldEndIndex) {
      for (let i = oldStartIndex; i <= oldEndIndex; i++) {
         // 该节点不是占位节点，才做删除操作
        if (oldChildren[i] != null) {
          el.removeChild(oldChildren[i].el)
        }
      }
    }
 }
  