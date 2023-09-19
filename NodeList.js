// 链表相关算法

// 回文链表

function reverse(head){
    let pre = null
    let cur = head
    while(cur){
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
}

function isPail( head ) {
    // 判断当前链表的节点数量是否过短
    if(!head || !head.next){return true}
    let slow = head
    let fast = head
    // 截取中间的链表
    while(fast.next&&fast.next.next){
        slow = slow.next
        fast = fast.next.next
    }
    // 翻转后半段链表
    let backArrayReverse = reverse(slow.next)
    let p1 = head
    let p2 = backArrayReverse
    // 对两个链表逐次判断是否相同，如果全都相同则为回文链表
    while(p2){
        if(p1.val !== p2.val){
            return false
        }
        p1 = p1.next
        p2 = p2.next
    }
    return true
}

class ListNode{
    constructor(val,next = null){
        this.val = val
        this.next = next
    }
}
// 删除相邻重复链表
function deleteRepeatNode(head){
    let cur = head
    while(cur !== null && cur.next !== null){
        if(cur.val === cur.next.val){
            cur.next = cur.next.next
        }else{
            cur = cur.next
        }
    }
    return head
}
// 删除重复链表
function deleteRepeatNode2(head){
    if(!head || !head.next){
        return head
    }                
    const valueCountMap = new Map()
    let cur = head
    while(cur){
        if(valueCountMap.has(cur.val)){
            valueCountMap.set(cur.val,valueCountMap.get(cur.val)+1)
        }else{
            valueCountMap.set(cur.val,1)
        }
        cur = cur.next
    }
    const dummy = new ListNode()
    dummy.next = head
    cur = dummy

    while(cur && cur.next){
        if(valueCountMap.get(cur.next.val) > 1){
            cur.next = cur.next.next
        }else{
            cur = cur.next
        }
    }
    return dummy.next


}


// class ListNode {
//     constructor(val, next = null) {
//       this.val = val;
//       this.next = next;
//     }
//   }
// 链表排序
  
  function mergeSortLinkedList(head) {
    if (!head || !head.next) {
      return head; // 链表为空或只有一个节点，直接返回
    }
  
    // 划分子问题，找到链表的中间节点
    let slow = head;
    let fast = head;
    let prev = null;
  
    while (fast && fast.next) {
      prev = slow;
      slow = slow.next;
      fast = fast.next.next;
    }
  
    prev.next = null; // 断开链表，分成两个子链表
  
    // 递归地对两个子链表进行排序
    const left = mergeSortLinkedList(head);
    const right = mergeSortLinkedList(slow);
  
    // 合并两个有序子链表
    return merge(left, right);
  }
  
  function merge(left, right) {
    const dummy = new ListNode(0); // 哨兵节点
    let current = dummy;
  
    while (left && right) {
      if (left.val <= right.val) {
        current.next = left;
        left = left.next;
      } else {
        current.next = right;
        right = right.next;
      }
      current = current.next;
    }
  
    // 处理剩余的节点
    if (left) {
      current.next = left;
    }
    if (right) {
      current.next = right;
    }
  
    return dummy.next; // 返回合并后的链表
  }


  // 定义二叉树节点，先序遍历二叉树构建链表
class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  
  // 构造二叉树
  function constructTree() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    return root;
  }
  
  // 先序遍历二叉树，并构造链表
  function preorderTraversal(root) {
    if (!root) return null;
  
    const stack = [];
    const dummy = new ListNode(-1); // 链表的哑节点
    let current = dummy;
  
    stack.push(root);
  
    while (stack.length) {
      const node = stack.pop();
      current.next = new ListNode(node.val);
      current = current.next;
  
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  
    return dummy.next;
  }
  
//   // 定义链表节点
//   class ListNode {
//     constructor(val) {
//       this.val = val;
//       this.next = null;
//     }
//   }
  
//   // 测试
//   const root = constructTree();
//   const linkedList = preorderTraversal(root);
  
//   // 打印链表结果
//   let current = linkedList;
//   while (current) {
//     console.log(current.val);
//     current = current.next;
//   }

// 比如[1,1,1,1,2,2,3,3,4,5]
// 一种取法为：
// 取出 [1,1]，还剩[1,1,2,2,3,3,4,5]
// 取出 [1,1],还剩[2,2,3,3,4,5]
// 取出 [2,2]，还剩[3,3,4,5]
// 取出[3,3]，还剩[4,5]
// 综上有四种对数,[1,1][2,2][3,3][4,5]
// 或者其他取法：
// 取出[1,2]，还剩[1,1,1,2,3,3,4,5]
// 取出[1,3]，还剩[1,1,2,3,4,5,]
// 取出[2,3]，还剩[1,1,4,5]
// 取出[4,5]，还剩[1,1]
// 综上有五种对数,[1,1][1,2][1,3][2,3][4,5]

// 对于给定x值，将小于x的链表置于大于等于x的链表之前
function changeFromX(head ,x){
  if(head == null || head.next==null || x==0){
    return head
  }
  let cur = head
  let lowList = {}
  let lowCur = lowList
  let highList = {}
  let highCur = highList
  while(cur){
    if(cur.val < x){
      lowCur.next = cur
      lowCur = lowCur.next
    }else{
      highCur.next = cur
      highCur = highCur.next
    }
    cur = cur.next
  }
  highCur.next = null
  lowCur.next = highList.next
  return lowList.next
}