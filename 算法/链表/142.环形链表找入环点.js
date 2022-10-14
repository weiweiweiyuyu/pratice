/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 使用Set集合来存取，set集合是无重复元素的
 var detectCycle = function(head) {
    const visited = new Set();
    while(head != null){
        if(visited.has(temp)){
            return temp;
        }
        visited.add(temp);
        head = head.next;
    }
    return null;
};
// 时间复杂度 ：O(N)
// 空间复杂度 ：O(N) 其中N链表中节点的数目，我们需要将链表中的每个节点都存在Set中
