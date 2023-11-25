# 简单学习一下Vue2的diff算法的原理

本文主要介绍Vue2的核心代码和对比原理，同时会简单介绍一些Vue2diff的特性

**对于文中不严谨的地方，还望大家评论指出**

***
## 前言

简单说明一下本文的目录：
<div style="font-size:0.9rem">

>什么是diff，为什么要用

>实现原理（包含图示）

>核心代码总结

>其他相关信息
</div>


***
## 什么是diff，为什么要用到diff

Vue来更新DOM的方式是自己内部操作来实现的，换句话说，开发者不需要过多关注DOM变化的具体细节，只需要命令DOM变化即可。为了在实现操作渐变的基础上优化性能，Vue使用基于虚拟DOM的方式实现DOM的更新，虚拟DOM则是在直接操作真实DOM之前，会先生成一个旧的虚拟DOM，然后将旧DOM和新操作生成的新虚拟DOM进行对比，找出不同之处，进行对应的增删改查，而不是直接替代。通过这种方式，就能够尽可能高效率地实现DOM的更新，因此，本文着重说到其中旧DOM和新DOM对比的过程————也就是Diff算法。

Vue2的diff算法主要特点是“双端对比”。顾名思义，就是分别用头指针和尾指针分别指向新旧虚拟DOM，也就是一共四个指针，进行比对，最终获取对比结果。

接下来详细讲讲Vue2的diff的具体实现过程：

***
## 实现过程
<div style="font-size:0.9rem">
就像上面提到的，双端对比用到了四个指针，分别指向新旧VNode的头部和尾部，为了方便，我先定义这四个指针分别为“新头”（newStartVnode）、“新尾”（newEndVnode）、“旧头”（oldStartVnode）、“旧尾”（oldEndVnode）。
<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_1.jpeg " style="max-width:90%; height: auto;" >
</div>
这四个指针的对比流程如下：

- 新头对比旧头
- 新尾对比旧尾
- 新尾对比旧头
- 新头对比旧尾
- 暴力查找

在对比之后，会根据新VNode或者旧VNode是否有剩余来进行插入或删除操作，最后完成更新

</div>

### 新头对比旧头&&新尾对比旧尾
<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_2.jpeg " style="max-width:90%; height: auto;" >
</div>

- 首先对比新头和旧头，如果无差异，那么保存节点，两个头指针后移，重复执行；

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_3.jpeg " style="max-width:90%; height: auto;" >
</div>

- 如果新头和旧头存在差异无法复用节点，那么对比新尾和旧尾，同理，如果无差异，那么保存节点，两个尾指针前移

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_4.jpeg " style="max-width:90%; height: auto;" >
</div>

- 以上是经历过一次新头旧头对比和一次新尾旧尾对比的结果

### 新尾对比旧头&&新头对比旧尾

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_5.jpeg " style="max-width:90%; height: auto;" >
</div>

- 如果经历了上述的前两次对比之后，发现两次结果都是有差异，那么就会执行新尾对比旧头的操作，如果无差异，那么保存节点，同时头指针后移，尾指针前移
<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_6.jpeg " style="max-width:90%; height: auto;" >
</div>

- 同理，如果上述三次对比都有差异，那么就会进行新头和旧尾的对比，如果无差异，那么保存节点，同时头指针后移，尾指针前移

### 暴力对比

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_7.jpeg " style="max-width:90%; height: auto;" >
</div>
如果上述四次对比都存在差异，无法直接通过双端对比来获取可复用节点，那么就需要结合旧VNode的Map图，来判断新头指向的节点是否存在于旧VNode中，如果存在，则复用，否则需要新插入一个节点；至于所谓的Map图，是节点的key和index的集合，结合上图，可以用如下方式表示：

```
{
    A:1,
    B:2,
    C:3,
    D:4
}
//其中，B节点位于Map中，index为2，可以复用
```

### 剩余节点处理

在进行了双端对比之后，可能会出现以下三种情况：

- 新旧VNode全部处理完毕（新头>新尾&&旧头>旧尾&&指向的节点已经全部处理），没有剩余

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_8.jpeg " style="max-width:90%; height: auto;" >
</div>

- 如果旧VNode有剩余（新头>新尾&&新指针节点全部处理完毕&&旧指针节点未处理），那么：

循环这些剩余未处理的节点，删除对应的节点，不需要添加到最后的补丁中

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_9.jpeg " style="max-width:90%; height: auto;" >
</div>

- 如果新VNode有剩余（旧头>旧尾&&旧指针节点全部处理完毕&&新指针节点未处理），那么：

循环这些剩余未处理的节点，根据他们的key和index值来进行相应位置的插入，添加到渲染补丁中


***

## 核心源码

<div style="max-width: 90%; overflow: auto;font-size:0.9rem"><pre><code class="language-javascript">
// Vue2算法核心
function updateChildren(el, oldChildren, newChildren) {
    let oldStartIndex = 0; // 旧头指针
    let oldStartVnode = oldChildren[0]; // 旧节点组的第一个节点
    let oldEndIndex = oldChildren.length - 1; // 旧尾指针
    let oldEndVnode = oldChildren[oldEndIndex] // 旧节点组的最后一个节点
    let newStartIndex = 0; // 新头指针
    let newStartVnode = newChildren[0]; // 新节点组的第一个节点
    let newEndIndex = newChildren.length - 1; // 新尾指针
    let newEndVnode = newChildren[newEndIndex] // 新节点组的最后一个节点
    
    // 创建Map映射表，来表示旧VNode的key和index的关系，用于后续使用
    const makeIndexBykey = (children) => {
      return children.reduce((memo, cur, index) => {
        memo[cur.key] =  index
        return memo
      }, {})
    }  
    const keysMap = makeIndexBykey(oldChildren)
    
    // 循环判断，如果旧头在旧尾之前 且 新头在新尾之前，那么继续执行双端比较，否则结束比较
    while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
       // 对于节点为undefined的情况，指针会跳过，指向下一个节点
      if (!oldStartVnode) { 
          // 旧头向后移动1个节点
        oldStartVnode = oldChildren[++oldStartIndex]
      } else if (!oldEndVnode) {
          // 旧尾向前移动1个节点
        oldEndVnode = oldChildren[--oldEndIndex]
      }
      // 如果新前和旧前相同
      if (isSameVnode(oldStartVnode, newStartVnode)) { 
        // 递归去比较当前的VNode以及VNode下的子节点
        patch(oldStartVnode, newStartVnode)
        // 新头、旧头后移，同时更新队列节点信息
        oldStartVnode = oldChildren[++oldStartIndex]
        newStartVnode = newChildren[++newStartIndex]
      } else if (isSameVnode(oldEndVnode, newEndVnode)) {
        // 新尾和旧尾相同
        // 递归去比较当前的VNode以及VNode下的子节点
        patch(oldEndVnode, newEndVnode)
        // 新尾、旧尾前移，同时更新队列节点信息
        oldEndVnode = oldChildren[--oldEndIndex]
        newEndVnode = newChildren[--newEndIndex]
      } else if (isSameVnode(oldStartVnode, newEndVnode)) { 
        // 新尾和旧头相同
        // 递归比较儿子以及他们的子节点
        patch(oldStartVnode, newEndVnode)
        // 移动真实DOM，将旧头所指向的节点移动到旧尾的后面
        el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
        // 旧头后移，更新队列
        oldStartVnode = oldChildren[++oldStartIndex]
        // 新尾前移，更新队列
        newEndVnode = newChildren[--newEndIndex]
      } else if (isSameVnode(oldEndVnode, newStartVnode)) { 
        // 新头和旧尾相同
        // 递归比较儿子以及他们的子节点
        patch(oldEndVnode, newStartVnode)
        // 移动真实DOM，将旧尾所指向的节点移动到旧头的前面
        el.insertBefore(oldEndVnode.el, oldStartVnode.el)
        // 旧尾前移，更新队列
        oldEndVnode = oldChildren[--oldEndIndex]
        // 新头后移，更新队列
        newStartVnode = newChildren[++newStartIndex]
      } else {
        // 四种对比都不符合，使用暴力处理
        // 以新头指向的节点为起始，去Map中查找
        const moveIndex = keysMap[newStartVnode.key]
        if (!moveIndex) { 
          // 如果节点不能在Map中找到，需要将节点插入到DOM中
          el.insertBefore(createElm(newStartVnode), oldStartVnode.el)
        } else {
           // 如果找到节点，那么取出
          const moveNode = oldChildren[moveIndex] 
          // 取出节点后需要将原来的节点对应的位置用undefined处理，防止Map塌陷，同时不影响其他节点的索引
          oldChildren[moveIndex] = undefined
          // 把取出的节点的真实dom插入到开始节点的真实dom前面
          el.insertBefore(moveNode.el, oldStartVnode.el)
          patch(newStartVnode, moveNode) //比较
        }
        // 新头后移，更新队列
        newStartVnode = newChildren[++newStartIndex]
      }
    }
    // 当新VNode有剩余，需要进行插入处理
    if (newStartIndex <= newEndIndex ) {
      for (let i = newStartIndex; i <= newEndIndex; i++) {
        // 这是一个优化写法 insertBefore的第一个参数是null等同于appendChild作用
        // 看一下 结束指针的下一个元素是否存在
        let anchor = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el
        el.insertBefore(createElm(newChildren[i]), anchor)
      }
    }
    // 当旧VNode有剩余，需要进行删除处理
    if (oldStartIndex <= oldEndIndex) {
      for (let i = oldStartIndex; i <= oldEndIndex; i++) {
         // 对于非占位节点，执行删除操作
        if (oldChildren[i] != null) {
          el.removeChild(oldChildren[i].el)
        }
      }
    }
 }
    </code></pre></div>

***

## Vue2的diff算法的特点

1. 双指针比较（核心：双端比较）
2. 组件级更新（从组件根节点遍历，然后递归遍历子节点）
3. 数组渲染优化（重复使用已存在的节点，避免不必要的更新）

***

## 写在最后

本文主要是简述了Vue2的diff的流程，具体细节可能描述较少，同时偏向口语化，注重算法的整体理解而不具有太强的专业性，更多的是自己参考源码和网上博客等资料做的一个自我总结，如果有更好的建议，欢迎大家在评论区提出