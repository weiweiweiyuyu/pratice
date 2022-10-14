// 给你一个链表的头节点 head ，判断链表中是否有环。
// 如果链表中存在环 ，则返回 true 。 否则，返回 false 。
// 思路：使用快慢指针！
var hasCycle = function(head){
    let fast = head,slow = head;
    while(fast != null && fast.next != null){
        slow = slow.next;
        fast = fast.next.next;
        if(slow == fast){
            return true;
        }
    }
    return false;
}
// 时间复杂度 ：O(N) 
// 空间复杂度 ：O(1) 我们只使用了两个指针的额外空间