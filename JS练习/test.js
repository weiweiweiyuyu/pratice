function bianping(arr,num){
    return num > 0 ? arr.reduce((pre,cur)=>{
        return pre.concat(Array.isArray(cur) ? flat(cur,num - 1):cur)
    },[])
    :arr;
}