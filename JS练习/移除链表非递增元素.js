function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function solution(head) {
    if (head == null) return null;
    let fast = head;
    let slow = head;
    while (fast != null) {
        if (fast.data >= slow.data) {
            slow.next = fast;
            slow = slow.next;
        }
        fast = fast.next;
    }
    //必须写这个 让slow.next后面不符合的变为null
    slow.next = null;
    return head;
}