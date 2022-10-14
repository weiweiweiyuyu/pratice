class RequestLimit {
    constructor(limit) {
        this.limit = Number(limit) || 2; // {1}
        this.blockQueue = [];
        this.currentReqNumber = 0;
    }

    /**
     * 请求
     * @param {*} req 
     */
    async request(req) { // {2}
        if (!req) {
            throw new Error('req is required.');
        }
        // if (Object.prototype.toString.call(req) !== '[object Function]') {
        //   throw new Error('Req must be a function.');
        // }
        if (this.currentReqNumber >= this.limit) { // {3}
            await new Promise(resolve => this.blockQueue.push(resolve)); // 阻塞队列增加一个 Pending 状态的 Promise
        }

        return this._handlerReq(req); // {4}
    }

    /**
     * 内部方法处理请求
     * @param {*} req 
     */
    async _handlerReq(req) {
        this.currentReqNumber++; // {5}
        console.log(req, 'reqMy')
        console.log(this.currentReqNumber, 'currentReqNumber')
        try {
            return await req();
        } catch (err) {
            return Promise.reject(err);
        } finally {
            this.currentReqNumber--;
            if (this.blockQueue.length) { // 每完成一个就从阻塞队列里剔除一个
                this.blockQueue[0](); // 将最先进入阻塞队列的 Promise 从 Pending 变为 Fulfilled
                this.blockQueue.shift();
            }
        }
    }
}

let reqL = new RequestLimit(3)
let a = function () {
    setTimeout(() => {
        console.log('1')
    }, 1000)
}
let b = function () {
    setTimeout(() => {
        console.log('11')
    }, 1000)
}
let c = function () {
    setTimeout(() => {
        console.log('111')
    }, 1000)
}
let d = function () {
    setTimeout(() => {
        console.log('1111')
    }, 1000)
}
let e = function () {
    setTimeout(() => {
        console.log('11111')
    }, 1000)
}
let f = function () {
    setTimeout(() => {
        console.log('111111')
    }, 1000)
}
let g = function () {
    setTimeout(() => {
        console.log('1111111')
    }, 1000)
}
let h = function () {
    setTimeout(() => {
        console.log('11111111')
    }, 1000)
}
let arr = [a, b, c, d, e, f, g, h]
for (const item of arr) {
    reqL.request(item)
}
console.log(reqL.blockQueue, 'asdfa')
console.log(reqL.currentReqNumber, 'call')


// async function a() {
//   console.log('1')
//   let bb = await b()
//   console.log(bb, 'bb')
//   console.log('2');
// } 

// async function b() {
//   return new Promise((resolve, reject) => {
//     console.log('3')
//   })
// }

// a()