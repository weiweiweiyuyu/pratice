// while(line=readline()){
//     let lines = line.split(' ')
//     let a = parseInt(lines[0])
//     let b = parseInt(lines[1])
//     console.log(a+b)
// }
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 接收一段指令序列，返回题目描述的值
 * @param commands string字符串一维数组 
 * @return string字符串一维数组
 */
class Clock{
    constructor(){
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.t = "";
        this.tick = [];
    }
    setTime(hours,minutes,seconds){
        if(hours < 10){
            this.t = '0' + hours + ":"
        }else{
            this.t = hours + ":"
        }
        if(minutes < 10){
            this.t += "0"
        }
        this.t += minutes + ":";
        if(seconds < 10){
            this.t += "0"
        }
        this.t += seconds;
    }
    tickSeconds(seconds){
        let h = Math.floor(seconds/3600);
        let m = Math.floor(seconds - h*3600)/60;
        let sec = seconds - h*3600 - m*60;
        var tick = [];
        this.tick.push(h,m,sec);
    }
    getTime(){
        let begin = this.t.split(":");
        for(let i = 0;i < begin.length;i++){
            begin[i] += this.tick[i]
        }
        return begin.join(':');
    }
}
while(line=readline()){
    let lines = line.split(',')
    console.log(lines);
    
}
function solve( commands ) {
    // write code here
    let ret = [];
    let clock;
    for(const cmd of commands){
        const parts = cmd.split('');
        const action = parts[0];
        const params = [];
        for(let i = 1;i < commands.length;i++){
            params.push(parseInt(parts[i],10));
        }
        if(action === 'create'){
            clock = new Clock();
        }else if(action === 'getTime'){
            ret.push(clock.getTime());
        }else if(action === 'setTime'){
            clock.setTime(params[0],params[1],params[2]);       
        }else if(action === 'tickSeconds'){
            clock.tickSeconds(params[0]);
        }
    }
    return ret;
}
solve();
// module.exports = {
//     solve : solve
// };