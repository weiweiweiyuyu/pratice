// 打印json中所有叶子节点的路径
function aa(obj) {
    const res = []
    const change = function (key, value) {
        if (!value) {
            return
        }
        if (typeof value !== 'object') {
            if (key[0] === '.') {
                key = key.slice(1)
            }
            res.push(`${key}.${value}`)
        } else {
            if (Array.isArray(value)) {
                for (let arrItem of value) {
                    change(`${key}.list`, arrItem)
                }
            } else {
                for (let objKey in value) {
                    change(`${key}.${objKey}`, value[objKey])
                }
            }
        }
    }
    change('', obj)
    return res
}

const _str = {
    "a": [{
            "b": "b1"
        },
        {
            "c": "c1"
        }
    ],
    "d": {
        "e": "e1"
    }
}
aa(_str)