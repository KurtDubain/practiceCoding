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

上一篇

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

## Vue2的diff算法的特点

1. 双指针比较（核心：双端比较）
2. 组件级更新（从组件根节点遍历，然后递归遍历子节点）
3. 数组渲染优化（重复使用已存在的节点，避免不必要的更新）

***

## 写在最后

本文主要是简述了Vue2的diff的流程，具体细节可能描述较少，同时偏向口语化，注重算法的整体理解而不具有太强的专业性，更多的是自己参考源码和网上博客等资料做的一个自我总结，如果有更好的建议，欢迎大家在评论区提出