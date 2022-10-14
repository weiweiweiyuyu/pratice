// 约瑟夫环
// 循环队列实现
// 队列的实现
function CycleQueue(){
    let arr = [];
    // 入队
    this.addQueue = function (item){
        return arr.push(item);
    }
    // 出队
    this.deleteQueue = function(){
        return arr.shift();
    }
    // 队列的长度
    this.size = function(){
        return arr.length;
    }
}
function outPel(m,n){
    let queue = new CycleQueue();
    //给队列添加元素 元素从1开始到m
    for(let i = 1;i <= m;i++){
        queue.addQueue(i);
    }
    let outer = '';
    while(queue.size() > 1){
        // 报数到n的出圈
        for(let i = 0;i < n - 1;i++){
            // 循环队列
            queue.addQueue(queue.deleteQueue());
        }
        outer = queue.deleteQueue();
        console.log("出圈的人是" + outer);
    }
}