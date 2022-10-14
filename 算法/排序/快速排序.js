//快排的简单操作
function quickSort(arr){
    if(arr.length <= 1) return arr;
    const num = arr[0];
    let left = [],right = [];
    for(let i = 1;i < arr.length;i++){
        if(arr[i] <= num) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return quickSort(left).concat([num],quickSort(right));
}

//使用经典快排解决问题
function get_mid(arr,left,right){
    let pivot = arr[left];
    while(left < right){
        while(arr[right] >= pivot && left < right){
            right--;
        }
        arr[left] = arr[right];
        while(arr[left] <= pivot && left < right){
            left++;
        }
        arr[right] = arr[left];
    }
    arr[left] = pivot;
    return left;
}
//经典操作
function quickSort1(arr,left,right){
    if(left < right){
        let mid = get_mid(arr,left,right);
        quickSort1(arr,left,mid-1);
        quickSort1(arr,mid+1,right);
    }
}


