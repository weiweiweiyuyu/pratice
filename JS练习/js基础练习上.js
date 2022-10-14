//当函数传参时，参数为引用类型时，传递的是对象在堆中的内存地址值，
function test(person) {
    person.age = 26
    person = {
        name: 'hzj',
        age: 18
    }
    return person
}
const p1 = {
    name: 'fyq',
    age: 19
}
const p2 = test(p1)
console.log(p1) // -> ? {name: 'fyq', age: 26}
console.log(p2) // -> ? {name: 'hzj', age: 18}
//当函数传参时，参数为引用类型时，传递的是对象在堆中的内存地址值，
// test函数中的实参person是p1对象的内存地址，通过调用person.age = 26,改变了p1.age = 26
// 然后又创建了一个新的对象，新的对象return出去，然后p2接收（me）
// 随后person变成了另一块内存空间的地址，并且在最后将这另外一份内存空间的地址返回，赋给了p2

{
[1] == 1      // true
false == '0'  // true
false == ''   // true
'' == '0'     // false
true == 1     // true
false == 0    // true
true == []    // false
//[] == {}      // false

var obj = {
    valueOf: function() { return 1 }
}

obj == 1     // true
// 绝望
//[] == ![]    // true

}
