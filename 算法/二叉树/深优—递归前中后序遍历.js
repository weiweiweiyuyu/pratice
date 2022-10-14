/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 前序遍历
 var preorderTraversal = function(root) {
    let res = [];
    const dfs = function(root){
        if(root === null) return;
        res.push(root.val);
        dfs(root.left);
        dfs(root.right);
    }
    dfs(root);
    return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 中序遍历
 var preorderTraversal = function(root) {
    let res = [];
    const dfs = function(root){
        if(root === null) return;
        dfs(root.left);
        res.push(root.val);
        dfs(root.right);
    }
    dfs(root);
    return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 后序遍历
 var preorderTraversal = function(root) {
    let res = [];
    const dfs = function(root){
        if(root === null) return;
        dfs(root.left);
        dfs(root.right);
        res.push(root.val);
    }
    dfs(root);
    return res;
};