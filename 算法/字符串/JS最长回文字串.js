function LongString(str){
	let lStr = "";
	let tempStr = "";
	for(let i = 0;i < str.length;i++){
		tempStr = "";
		for(let j = i;j < str.length;j++){
			tempStr+=str.charAt(j);
			if(isHuiwen(tempStr) && tempStr.length > lStr.length){
				lStr = tempStr;
			}
		}
	}
    return lStr;
}
function isHuiwen(str){
	let result = str.split('').reverse().join('');
	return result === str;
}
console.log(LongString("abcabfffabccba"))