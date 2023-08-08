// 链表相关算法

// 回文链表

function reverse(head){
    let pre = null
    let cur = head
    while(cur){
        let next = head.next
        cur.next = pre
        pre = cur
        cur = next

    }
    return pre
}

function isPail( head ) {
    // 判断当前链表的节点数量是否过短
    if(!head || !head.text){return true}
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