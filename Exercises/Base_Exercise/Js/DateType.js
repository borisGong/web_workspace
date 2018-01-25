console.log(typeof a); //undefined 未声明
var d;
console.log(d); //undefinded 未初始化
var c = null;
console.log(c); //初始值为null

console.log(a==d); //error no reference 未声明
console.log(a==c); //error no reference 未声明
console.log(d==c); // true undefined == null
console.log(c===d); // false undefined !== null;

console.log(typeof xx != "undefined" && xx !== null); //过滤掉 未声明 ，未初始化 ，null

//默认产生undefined的操作为,变量未赋值只声明,函数参数未赋值,没有设置返回数据的函数调用,void操作符等