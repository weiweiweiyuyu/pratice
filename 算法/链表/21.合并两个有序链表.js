var mergeTwoLists = function(list1, list2) {
    //1、定义一个虚拟头节点
    const head = new ListNode(-1);
    let p = head;
    //2、双指针
    let p1 = list1,p2 = list2;
    while(p1 != null && p2 != null){
        if(p1.val > p2.val){
            p.next = p2;
            //先放小的在前面，升序链表
            p2 = p2.next;
        }else{
            p.next = p1;
            p1 = p1.next;
        }
        p = p.next;
    }
    //3、合并后 list1 和 list2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
    if(p1 != null){
        p.next = p1;
    }
    if(p2 != null){
        p.next = p2;
    }
    //4、最后返回刚开始定义好的头节点的next，也就是
    return head.next;
};