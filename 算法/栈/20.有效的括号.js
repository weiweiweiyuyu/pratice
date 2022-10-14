const isValid = (s) => {
    // 空字符串返回true
    if(!s){
        return true;
    }
    // 定义对象，存储左括号右括号，以key-value形式
    const leftToRight = {
        '{':'}',
        '(':')',
        '[':']'
    }
    // 定义一个栈
    const stack = [];
    // 开始遍历
    for(let i = 0,len = s.length;i < len;i++){
        let val = s[i];
        if(leftToRight[val]){
            // 左括号
            stack.push(val)
        }else{
            // 判断右括号是否在
            if(!stack.length || leftToRight[ stack.pop() ] !=  val){
                return false;
            }
        }
    }
    // if(stack.length === 0) return true;
    // return false; 简写为
    return !stack.length;
}