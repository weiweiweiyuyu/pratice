/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。
// 如果两个链表不存在相交节点，返回 null 
// 思路：两个链表长度相同，同时遍历，如果中间没有相同的位置，不相交
// 链表成都不相同，消除长度差异， b+c+a = a+c+b 相遇之时极为相交的点
 var getIntersectionNode = function(headA, headB) {
    if(headA === null || headB === null) return null;
    let pA = headA,pB = headB;
    while(pA != pB){
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }
    return pA;
};
// 时间复杂度 ：O(m+n) 其中m和n是分别是链表headA和headB 的长度。
// 两个指针同时遍历两个链表，每个指针遍历两个链表各一次。
// 空间复杂度 ：O(1)