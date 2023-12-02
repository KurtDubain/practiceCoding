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

- 当新旧节点都有剩余的时候，需要构建一个source数组，用于表示新的一组节点在旧VNode中的位置，初始化所有值为-1。构建source完成之后，遍历新VNode来描述新VNode中节点以及其对应的位置关系，另外遍历旧VNode来寻找对应节点，如果能找到，则将对应的节点在旧VNode中的位置，更新到source中；如果没有找到对应的节点则将这个节点删除。最终构建完整的source。

<div style="text-align:center">
<img src="https://www.dyp02.vip/assets/imageForOwners/13_8.jpeg " style="max-width:90%; height: auto;" >
</div>

- 

***

## 核心源码

<div style="max-width: 90%; overflow: auto;font-size:0.9rem"><pre><code class="language-javascript">
  // Vue3 diff核心代码
  // 获取新的子节点
  const newChildren = n2.children;
  // 获取老的子节点
  const oldChildren = n1.children;
  // 更新相同的前置节点
  // 新，老开始节点的下标
  let j = 0;
  // 获取老的一组子节点的开始节点
  let oldVnode = oldChildren[j];
  // 获取新的一组子节点的开始节点
  let newVnode = newChildren[j];
  // 如果新，老的开始节点相同
  while(oldVnode.key === newChildren.key) {
    // 递归处理子节点
    patch(oldVnode, newVnode, container);
    // 下标往后移动一格
    j++;
    // 获取 +1 后的新，老节点
    oldVnode = oldChildren[j];
    newVnode = newChildren[j];
  }
  // 更新相同的后置节点
  // 索引 oldEnd 指向旧的一组子节点的最后一个节点
  let oldEnd = oldChildren.length - 1;
  // 索引 newEnd 指向新的一组子节点的最后一个节点
  let newEnd = newChildren.length - 1;
  // 获取新，老结束下标对应的节点
  oldVnode = oldChildren[oldEnd];
  newVnode = newChildren[newEnd];

  // 如果新，老的结束节点相同
  while(oldVnode.key === newVnode.key) {
    // 递归处理子节点
    patch(oldVnode, newVnode, container)
    // 递减 oldEnd 和 nextEnd
    oldEnd--
    newEnd--
    // 获取递减对应的节点
    oldVnode = oldChildren[oldEnd]
    newVnode = newChildren[newEnd]
  }
  // 预处理完毕后，如果满足如下条件，则说明从 j --> newEnd 之间的节点应该作为新节点插入
  if (j > oldEnd && j <= newEnd) {
    // 锚点的索引
    const anchorIndex = newEnd + 1;
    // 锚点元素
    const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
    // 采用 while 循环， 调用 patch 函数逐个挂载新增节点
    while (j <= newEnd) {
      patch(null, newChildren[j++], container, anchor)
    }
  } else if (j > newEnd && j <= oldEnd) {
    // 如果满足如下条件以上条件，那么j --> oldEnd 之间的节点应该被卸载
    while (j <= oldEnd) {
        // 循环卸载多余节点
      unmount(oldChildren[j++])
    }
  } else {
    // 获取剩余新的一组子节点的个数
    const count = newEnd - j + 1;
    // 定义个长度为 count 的 数组，用于存放新的一组子节点在老的组中位置，果然没有的话就存-1
    const source = new Array(count);
    // 初始化都存放-1
    source.fill(-1);
    // oldStart 和 newStart 分别为起始索引，即j
    const oldStart = j;
    const newStart = j;
    // 用于最后判断是否有要移动的节点
    let moved = false;
    // 用于存放寻找过程中找递增序列中最大索引值
    let pos = 0;
    // 循环新的一组的子节点，构建key 和 index 的映射表
    const keyIndex = {};
    for(let i = newStart; i <= newEnd; i++) {
      keyIndex[newChildren[i].key] = i;
    }
    // 代表更新过的节点数量
    let patched = 0;
    // 遍历旧的一组子节点中剩余未处理的节点
    for(let i = oldStart; i <= oldEnd; i++) {
      oldVnode = oldChildren[i];
      // 如果更新过的节点数量小于等于需要更新的节点数量，则执行更新
      if (patched <= count) {
         // 取出老节点在新节点的索引
        const k = keyIndex[oldVnode.key];
        if (typeof k !== 'undefined') {
          newVnode = newChildren[k];
           // 递归处理子节点
          patch(oldVnode, newVnode, container);
          // 每更新一个节点，都将 patched 变量 +1
          patched++;
          // 存放新的一组子节点在老的组中位置 
          source[k - newStart] = i;
          // 如果该节点新的位置小于最大的索引值,说明该节点往前移了
          if (k < pos) {
            moved = true
          } else {
            // 如果不是就把该位子存到pos，目前k是递增子节点中最大的索引
            pos = k
          }
        } else {
          // 没找到, 卸载该节点
          unmount(oldVnode)
        }
      } else {
        // 如果更新过的节点数量大于需要更新的节点数量，则卸载多余的节点
        unmount(oldVnode)
      }
    }
  }
   // moved 为 true 时说明需要移动节点 
  if (moved) {
    // 计算最长递增子序列
    const seq = lis(source);
    // 最长递增子序列中最后一个值的索引
    let s = seq.length - 1;
    // 新的一组子节点的最后一个节点的索引
    let i = count - 1;
    // 新的一组子节点从后往前遍历
    for (i; i >=0; i--) {
      if (source[i] === -1) {
        // 说明索引为 i 的节点是全新的节点，应该将其插入
        // 该节点在新 children 中的真实位置索引
        const pos = i + newStart;
        const newVnode = newChildren[pos];
        // 该节点的下一个节点的位置索引；
        const nextPos = pos + 1;
        // 锚点
        const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;
        // 挂载
        patch(null, newVnode, container, anchor);
      } else if(i !== seq[s]) {
        // 如果节点的索引 i 不等于 seq[s] 的值， 说明该节点需要移动
        // 该节点在新的一组子节中的真实位置索引
        const pos = i + newStart;
        const newVnode = newChildren[pos];
        // 该节点的下一个节点的位置索引
        const nextPos = pos + 1;
        // 锚点
        const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;
        // 移动
        insert(newVnode.el, container, anchor)
      } else {
        // 当 i === seq[s] 时, 说明该位置的节点不需要移动，只需要让 s 指向下一个位置
        s--
      }
    }
  }
    </code></pre></div>

***

## Vue3的diff算法的特点

1. 双指针比较（核心：双端比较）
2. 组件级更新（从组件根节点遍历，然后递归遍历子节点）
3. 数组渲染优化（重复使用已存在的节点，避免不必要的更新）

***

## 写在最后

本文主要是简述了Vue2的diff的流程，具体细节可能描述较少，同时偏向口语化，注重算法的整体理解而不具有太强的专业性，更多的是自己参考源码和网上博客等资料做的一个自我总结，如果有更好的建议，欢迎大家在评论区提出