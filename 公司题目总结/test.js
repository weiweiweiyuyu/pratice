// 1\
let arr = [1,2,3,3];
let res1 = [...new Set(arr)];
console.log(res1)

// 2\
let res = [];
for(let item of arr){
    if(res.indexOf(item)=== -1){
        res.push(item)
    }
}
console.log(res)

// 3\ 快排
function get_mid(left,right,arr){
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
function quickSort(left,right,arr){
    if(left < right){
        let mid = get_mid(left,right,arr);
        quickSort(left,mid-1,arr);
        quickSort(mid+1,right,arr);
    }
}
let arr2 = [1,6,7,4,2]
quickSort(0,4,arr2);
console.log(arr2)
