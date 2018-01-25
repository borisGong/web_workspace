//-------------------------------------------------------------------------
var name = 'zach'
while (true) {
    var name = 'obama'
    console.log(name)  //obama
    break
}
console.log(name) //obama

let name = 'zach'
while (true) {
    let name = 'obama'
    console.log(name)  //obama
    break
}
console.log(name) //zach

//-------------------------------------------------------------------------

var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 10


var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); //6

//-------------------------------------------------------------------------

var testBtns = document.querySelectorAll('.TestBtn');
for (var i = 0; i < testBtns.length; i++) {
    testBtns[i].onclick = function () {
        alert(i);
    }
}

var testBtns = document.querySelectorAll('.TestBtn');
for (let i = 0; i < testBtns.length; i++) {
    testBtns[i].onclick = function () {
        alert(i);
    }
}

//-------------------------------------------------------------------------

class Animal {
    constructor() {
        this.type = 'animal'
    }
    says(say) {
        console.log(this.type + ' says ' + say)
    }
}

let animal = new Animal()
animal.says('hello') //animal says hello

class Cat extends Animal {
    constructor() {
        super()
        this.type = 'cat'
    }
}

let cat = new Cat()
cat.says('hello') //cat says hello

//-------------------------------------------------------------------------

class Animal {
    constructor() {
        this.type = 'animal'
    }
    says(say) {
        setTimeout(() => {
            console.log(this.type + ' says ' + say)
        }, 1000)
    }
}
var animal = new Animal()
animal.says('hi')  //animal says hi

//-------------------------------------------------------------------------

document.querySelector(".TestArea").innerHTML =
    "There are <b> 23 </b> " +
    "items in your basket, " +
    "<em> 24 " +
    "</em> are on sale!"
    ;

document.querySelector(".TestArea").innerHTML = `
            There are <b> 23 </b> 
            items in your basket, 
            <em> 24 
            </em> are on sale!
        `;

//-------------------------------------------------------------------------

let cat = 'ken'
let dog = 'lili'
let zoo = { cat: cat, dog: dog }
console.log(zoo)  //Object {cat: "ken", dog: "lili"}

let cat = 'ken'
let dog = 'lili'
let zoo = { cat, dog }
console.log(zoo)  //Object {cat: "ken", dog: "lili"}