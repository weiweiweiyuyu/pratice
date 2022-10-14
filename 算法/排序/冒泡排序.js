// 冒泡排序 O(n2)
//1、简单版冒泡排序
function bubbleSort(arr){
    if(arr == null || arr.length < 2){
        return;
    }
    for(let i = arr.length - 1;i > 0;i--){
        for(let j = 0;j < i;j++){
            if(arr[j] > arr[j + 1]){
                swap(arr,j,j+1)
            }
        }
    }
}
function swap(arr,i,j){
    // let temp;
    // temp = arr[j];
    // arr[j] = arr[i];
    // arr[i] = temp;

    // 也可以不用额外的内存空间，使用异或运算
    // 异或就是位运算符，位运算相对来说计算速度快！
    // 异或：1、0 ^ N = N; N ^ N = 0;
    // 2、异或满足交换律 a ^ b = b ^ a; a^b^c = a^(b^c)
    // 3、注意，使用异或的时候我们要满足a指向的内存和b指向的内存是两块地址
    arr[i] = arr[i] ^ arr[j];
    arr[j] = arr[i] ^ arr[j];
    arr[i] = arr[i] ^ arr[j];
}
// 2、进阶版冒泡排序
function bubbleSort(arr){
    // 设置一个标识，swapped开启排序。
    let swapped = true;
    for(let i = arr.length - 1;i > 0;i--){
        // 如果没有发生过交换，说明剩余部分已经有序，排序完成
        if(!swapped) break;
        swapped = false;
        for(let j = 0;j < i;j++){
            if(arr[j] > arr[j + 1]){
                swap(arr,j,j+1)
                swapped = true;
            }
        }
    }
}
function swap(arr,i,j){
    let temp;
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}
// 3、优化升级版冒泡排序(记录最后一次冒泡排序的下标，
// 说明此下标后面的元素都没有发生过交换，其后面必然已经有序了)
function bubbleSort(arr){
    // 设置一个标识，swapped开启排序。
    let swapped = true;
    // 最后一个没有经过排序的元素的下标
    let lastIndex = arr.length - 1;
    // 上次发生交换的位置
    let swapIndex = -1;
    while(swapped){
        swapped = false;
        for(let i = 0;i < lastIndex;i++){
            if(arr[i] > arr[i + 1]){
                swap(arr,i,i+1);
                swapped = true;
                // 更新交换位置
                swapIndex = i;
            }
        }
        // 最后一个没有经过排序的元素的下标就是最后一次发生交换的位置
        lastIndex = swapIndex;
    }
}
function swap(arr,i,j){
    let temp;
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}