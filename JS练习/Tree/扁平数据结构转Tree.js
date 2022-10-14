let arr = [{
        id: 1,
        name: '部门1',
        pid: 0
    },
    {
        id: 2,
        name: '部门2',
        pid: 1
    },
    {
        id: 3,
        name: '部门3',
        pid: 1
    },
    {
        id: 4,
        name: '部门4',
        pid: 3
    },
    {
        id: 5,
        name: '部门5',
        pid: 4
    },
]

// 方法一 递归查找，随着数据量的增大，递归花费的时间最长
function test(pid,arr){
    return arr.filter(item => item.pid === pid).map(item => ({...item,children:test(item.id,arr)}));
}

// 方法二 存在两次循环        
function arrayToTree1(items) {
    const result = []; // 存放结果集
    const itemMap = {}; // 

    // 先转成map存储
    for (const item of items) {
        itemMap[item.id] = {
            ...item,
            children: []
        }
    }
    console.log(itemMap, "itemMap")
    for (const item of items) {
        const id = item.id;
        const pid = item.pid;
        const treeItem = itemMap[id];
        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem)
        }

    }
    return result;
}
console.log(arrayToTree2(arr));

//方法三：最佳性能， 扁平数据结构转tree 优化方法——一次循环解决
function arrayToTree2(items) {
    const result = []; // 存放结果集
    const itemMap = {}; // Map结构
    for (const item of items) {
        const id = item.id;
        const pid = item.pid;
        //创建Map,里面存放以id为键，空对象{children: [],}为值的键值对
        if (!itemMap[id]) {
            itemMap[id] = {
                children: [],
            }
        }
        // 然后我们在复制item里面已经有的属性作为对象的属性
        itemMap[id] = {
            ...item,
            children: itemMap[id]['children']
        }
        // 使得treeItem树里面的节点是map数据结构的键取出的值
        const treeItem = itemMap[id];
        //然后开始构造树
        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
                console.log(itemMap[pid],"itemMap[pid]")
            }
            itemMap[pid].children.push(treeItem)
        }

    }
    return result;
}
