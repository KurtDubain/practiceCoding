# 简单学习一下Vue3的diff算法的原理

本文主要介绍Vue3的核心代码和对比原理，同时会简单介绍一些Vue3 diff的特性

**对于文中不严谨的地方，还望大家评论指出**

***
## 前言

简单说明一下本文的目录：
<div style="font-size:0.9rem">

>简述

>实现原理（包含图示）

>核心代码总结

>Vue3的特性和优化之处（diff）
</div>

***

## 简述

上一篇文章，主要讲了Vue2的Diff算法的实现过程，它的核心原理是“双端对比”，而本次文章主要讲解Vue3的Diff算法，它的核心原理则是“深度优先遍历”，然后逐一对比节点以及节点的类型、属性等，完成对比，进而进行节点的增删改查等操作，完成DOM渲染。

接下来详细讲讲Vue3的diff的具体实现过程：

***

## 实现过程
<div style="font-size:0.9rem">
本次Diff算法是基于“深度优先遍历”的方式，首先会对新VNode和旧VNode的前置节点进行比对，无变化的话会继续更新对比下一个前置节点（后移一位），如果遇到了不同的节点，则会开始从后置节点进行对比，直到遇到遇到不同节点；然后根据新旧VNode的剩余情况进行插入或删除操作，最后获取所有需要更新的部分，更新DOM。
<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_1.jpeg " style="max-width:90%; height: auto;" >
</div>
具体流程如下：

- 前置节点对比
- 后置节点对比
- 剩余节点判断
- 如果只有新VNode剩余，按次序插入
- 如果只有旧VNode剩余，删除旧节点
- 如果双方互有剩余，使用Map来确定哪个节点需要进行插入

</div>

### 前置节点对比
<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_2.jpeg " style="max-width:90%; height: auto;" >
</div>

- 从前置节点开始对比，如果对比没有区别，则添加到更新队列中

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_3.jpeg " style="max-width:90%; height: auto;" >
</div>

- 如果对比出现不同，则停止遍历对比，开始进行后置节点对比

### 后置节点对比

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_5.jpeg " style="max-width:90%; height: auto;" >
</div>

- 在前置节点对比不同之后，会开始进行后置节点对比，类似前置节点对比一样，如果后置节点对比过程中相同，则将节点加入更新队列；
<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_6.jpeg " style="max-width:90%; height: auto;" >
</div>

- 如果在后置对比的时候，如果对比结果不同，则开始进行剩余节点情况的判断，退出后置节点对比的过程。

### 剩余节点情况-只有新VNode有剩余

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_7.jpeg " style="max-width:90%; height: auto;" >
</div>

- 当后置对比之后，新VNode仍由剩余，则会进行插入操作。此时会遍历剩余新节点，进行处理，更新补丁；

### 剩余节点情况-只有旧VNode有剩余

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_8.jpeg " style="max-width:90%; height: auto;" >
</div>

- 当前置对比之后，旧VNode仍由剩余，此时会遍历剩余旧节点，进行删除；


***
### 剩余节点情况-新旧VNode都有剩余

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_8.jpeg " style="max-width:90%; height: auto;" >
</div>

- 当新旧节点都有剩余的时候，需要构建一个source数组，用于表示新的一组节点在旧VNode中的位置，初始化所有值为-1。构建时，首先遍历新的一组子节点，构建其key和index的映射表keyIndex，即通过key将新的子节点的索引存储起来，方便后续根据key查找对应的索引。

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_8.jpeg " style="max-width:90%; height: auto;" >
</div>

- 然后遍历旧VNode中的节点，同时进行判断：
- 如果更新过的节点数量patched小于count，也就是说明节点需要更新。首先需要根据节点的key在keyIndex中查找对应的索引k——并根据索引k获取newVnode，执行patch处理。然后将对应的节点索引i存储到source中，位置为k-newStart。

> 如果该节点的新位置k小于之前的最大索引pos，则说明该节点需要移动，将moved设置为true。

> 如果该节点的新位置k大于等于之前的最大索引pos，则更新pos=k

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_8.jpeg " style="max-width:90%; height: auto;" >
</div>

- 如果patched大于count，则说明更新过的节点大于了需要更新的节点数量，表示节点是多余的节点，需要进行卸载处理

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_8.jpeg " style="max-width:90%; height: auto;" >
</div>

- 最后，进行对moved的判定，如果为true，则开始计算source的最长递增子序列seq，并获取最后一个值的索引s，然后从新的一组子节点的最后一个节点开始，更具source的值进行判断：

>如果source[i]===-1，说明索引为i的节点是全新的节点，应该将其插入到container中

>如果i不等于seq[s]，说明节点需要移动。获取节点的位置索引pos和下一个节点的位置索引nextPos，然后调用insert函数将节点移动到正确的位置上

>如果i===seq[s]，说明该位置的节点不需要移动，只需要将s指向下一个位置

***

## 核心源码

<div style="max-width: 90%; overflow: auto;font-size:0.9rem"><pre><code class="language-javascript">
  // Vue3 diff核心代码
  // 初始化新VNode内容
  const newChildren = n2.children;
  // 初始化旧VNode内容
  const oldChildren = n1.children;
  // 进入前置节点对比过程
  // 初始化一个前置指针j
  let j = 0;
  // 初始化旧VNode的前置节点
  let oldVnode = oldChildren[j];
  // 初始化新VNode的前置节点
  let newVnode = newChildren[j];
  // 开始对比，如果相等，则递归处理，后置对比
  while(oldVnode.key === newChildren.key) {
    // 递归处理两个节点的内容
    patch(oldVnode, newVnode, container);
    // 节点指针j后移
    j++;
    // 更新新旧前置节点
    oldVnode = oldChildren[j];
    newVnode = newChildren[j];
  }
  // 进入后置节点对比过程
  // 初始化旧VNode后置节点指针
  let oldEnd = oldChildren.length - 1;
  // 初始化新VNode后置节点指针
  let newEnd = newChildren.length - 1;
  // 初始化后置节点
  oldVnode = oldChildren[oldEnd];
  newVnode = newChildren[newEnd];
  // 对比后置节点
  while(oldVnode.key === newVnode.key) {
    // 如果相同，开始递归比较
    patch(oldVnode, newVnode, container)
    // 前移后置指针
    oldEnd--
    newEnd--
    // 更新要对比的后置节点
    oldVnode = oldChildren[oldEnd]
    newVnode = newChildren[newEnd]
  }
  // 进入剩余节点情况处理
  // 如果旧VNode已经被全部处理，而新VNode有剩余
  if (j > oldEnd && j <= newEnd) {
    // 更新要处理的元素的索引
    const anchorIndex = newEnd + 1;
    // 获取对应的元素
    const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
    // 遍历剩余新VNode节点，将其挂载
    while (j <= newEnd) {
      patch(null, newChildren[j++], container, anchor)
    }
  } else if (j > newEnd && j <= oldEnd) {
    // 当新VNode被全部处理完毕而旧VNode仍有剩余
    while (j <= oldEnd) {
        // 将剩余的就节点卸载
      unmount(oldChildren[j++])
    }
  } else {
    // 当新旧VNode互有剩余
    // 计算获取新VNode节点数量
    const count = newEnd - j + 1;
    // 构建source数组，用于表示新节点在旧VNode中的索引位置，如果为-1则表示为新增节点
    const source = new Array(count);
    // 初始化所有节点的索引为-1
    source.fill(-1);
    // 初始化新旧剩余节点的索引
    const oldStart = j;
    const newStart = j;
    // 用于最后判断是否有要移动的节点
    let moved = false;
    // 用于存放寻找过程中找递增序列中最大索引值
    let pos = 0;
    // 构建新VNode剩余节点的key和index映射表
    const keyIndex = {};
    for(let i = newStart; i <= newEnd; i++) {
      keyIndex[newChildren[i].key] = i;
    }
    // 表示已经处理过的节点数量（用于和count对比）
    let patched = 0;
    // 遍历处理旧VNode中的剩余节点
    for(let i = oldStart; i <= oldEnd; i++) {
      oldVnode = oldChildren[i];
      // 如果已经处理过的节点小于剩余节点数量，开始处理
      if (patched <= count) {
         // 获取旧VNode在新VNode中的索引k
        const k = keyIndex[oldVnode.key];
        if (typeof k !== 'undefined') {
          newVnode = newChildren[k];
           // 递归处理更新的节点
          patch(oldVnode, newVnode, container);
          // 更新patched
          patched++;
          // 存放新的一组子节点在老的组中位置 
          source[k - newStart] = i;
          // 如果节点的新位置小于最大索引值pos，则表示需要进行移动
          if (k < pos) {
            moved = true
          } else {
            // 如果不是就把最大索引值更新成k
            pos = k
          }
        } else {
          // 若没找到，就卸载节点
          unmount(oldVnode)
        }
      } else {
        // 如果已经更新的数量大于剩余节点的数量，卸载节点
        unmount(oldVnode)
      }
    }
  }
   // 当moved为true的时候，开始处理节点的位移操作
  if (moved) {
    // 利用lis方法计算source的最长递增子序列
    const seq = lis(source);
    // 最长子序列中的最后一个指针
    let s = seq.length - 1;
    // 待处理节点的最后一个指针
    let i = count - 1;
    // 遍历待处理节点，从后往前遍历
    for (i; i >=0; i--) {
      if (source[i] === -1) {
        // 当对应的节点的index为-1，表示该节点需要执行插入操作
        // 获取当前节点在新VNode中的位置
        const pos = i + newStart;
        const newVnode = newChildren[pos];
        // 计算当前节点的下一个节点索引
        const nextPos = pos + 1;
        // 用anchor表示节点的确定插入位置
        const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;
        // 挂载节点，表示当前没有旧的虚拟节点需要更新到anchor为止，将新节点插入到目标容器中
        patch(null, newVnode, container, anchor);
      } else if(i !== seq[s]) {
        // 此时表示当前节点需要进行移动操作
        // 计算节点在新VNode中的位置
        const pos = i + newStart;
        const newVnode = newChildren[pos];
        // 该节点的下一个节点的位置索引
        const nextPos = pos + 1;
        // 挂载节点，表示当前没有旧的虚拟节点需要更新到anchor为止，将新节点插入到目标容器中
        const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;
        // 将已有节点进行位置的新插入
        insert(newVnode.el, container, anchor)
      } else {
        // 此时 i === seq[s] , 表示当前节点的位置无需更新位置，此时更新最长子序列的指针
        s--
      }
    }
  }
    </code></pre></div>

***

## Vue3的diff算法的特点

1. 递归比较，利用最长递增子序列优化对比逻辑；
2. 静态标记，Vue3会在编译阶段会对模版进行静态分析，并标记处静态节点和静态属性，静态节点在更新时不会进行diff操作，可以直接复用（对比Vue2的全量对比）；

***

## 写在最后

本文主要是简述了Vue3的diff的流程，可能理解的不是很到位，欢迎评论区进行展开讨论！