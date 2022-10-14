// 选择排序 O(n2)
function selectSort(arr){
    if(arr == null || arr.length < 2){
        return;
    }
    for(let i = 0;i < arr.length;i++){
        let minIndex = i;
        for(let j = i + 1;j < arr.length;j++){
            // 每次找最小值的下标
            minIndex = arr[j] < arr[minIndex] ? j : minIndex;
        }
        swap(arr,i,minIndex)
    }
}
function swap(arr,i,j){
    let temp;
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}