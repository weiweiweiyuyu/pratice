/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
//递归解题！！！关键是理解这个方法原地修改链表的巧妙，我们还可以使用栈来实现
var reverseList = function (head) {
    if (head == null || head.next == null) {
        return head;
    }
    let last = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return last;
}
// 时间复杂度 O(n)
// 空间复杂度 O(n)

//栈实现
var reverseList = function(head) {
    if(head === null || head.next === null) { return head }
    let node = head
    let arr = []
    while(node) {
        arr.push(node)
        node = node.next
    }
    let node1 = arr.pop()
    head = node1
    // 判断一个数组是否为空可以利用长度属性
    while(arr.length>0) {
        let node2 = arr.pop()
        node1.next = node2;
        node1 = node2;
    }
    node1.next = null;
    return head
};
