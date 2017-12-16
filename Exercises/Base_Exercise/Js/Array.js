var ArrayBaseOperator = (function () {
    return {
        concat: function () {

        },
        slice: function () {

        },
        splice: function () {

        }
    }
})

var ArrayIndex = (function () {
    return {
        indexOf: function () {

        },
        lastIndexOf: function () {

        }
    }
})

var ArrayIteration = (function () {
    return {
        //stops looping the first time the iterator returns true or something truthy
        some: function () {

        },
        //stops looping the first time the iterator returns false or something falsey
        every: function () {

        },
        //creates a new array including elements where the filter function returns true and omitting the ones where it returns false
        filter: function () {

        },
        //creates a new array from the values returned by the iterator function
        map: function () {
            ["a", "b", "c"].map(function (value, index, array) {
                // ...
            });
        },
        forEach: function () {
            ["a", "b", "c"].forEach(function (value, index, array) {
                // ...
            });
        },
        for: {
            base: function () {
                var index;
                var a = ["a", "b", "c"];
                for (index = 0; index < a.length; ++index) {
                    console.log(a[index]);
                }
            },
            improve: function () {
                var index, len;
                var a = ["a", "b", "c"];
                for (index = 0, len = a.length; index < len; ++index) {
                    console.log(a[index]);
                }
            }
        },
        forIn: function () {

        },
        forOf: function () {
            var val;
            var a = ["a", "b", "c"];
            for (val of a) {
                console.log(val);
            }
        },
        Iterator: function () {
            var a = ["a", "b", "c"];
            var it = a.values();
            var entry;
            while (!(entry = it.next()).done) {
                console.log(entry.value);
            }
        }
    }
})

var ArrayMerge = (function () {
    return {
        //builds up a value by repeated calling the iterator, passing in previous values; see the spec for the details; useful for summing the contents of an array and many other things
        reduce: function () {

        },
        //like reduce, but works in descending rather than ascending order
        reduceRight: function () {

        }
    }
})

var $ArrayIteration = (function () {
    return {
        //jquery 对象，数组，dom数组
        $each: function () {
            // $.each([], function(index, value, array) {
            //     // ...
            // });
        },
        //$jquery
        $map: function () {
            // $.map([], function(index, value, array) {
            //     // ...
            // });
        },
        //jquery专门便利jquery兑现的
        $domEach: function () {
            // $(selector).each()
        }
    }
}())

var ArrayExtendOperator = (function () {
    var arr = ["cat", "cat", "cat", "bear", "cat", "bird", "dog", "dog"];
    return {
        //https://stackoverflow.com/questions/16217333/remove-items-from-array-with-splice-in-for-loop
        RemoveItems: {
            //This is because iterating incrementally through the array, when you splice it, the array is modified in place, so the items are "shifted" and you end up skipping the iteration of some
            errorFunction: function () {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == "cat") {
                        arr.splice(i, 1);
                    }
                }
                console.log(arr);
            },
            //通过i--,避免因为删除数组，导致跳过一些元素
            improveErrorFunction: function () {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == "cat") {
                        arr.splice(i, 1);
                        i--;
                    }
                }
                console.log(arr);
            },
            //使用property filter
            improveOtherFunction: function () {
                arr = arr.filter(function (item) {
                    return item != "cat";
                })
            },
            //Looping backwards (with a while or even a for loop) fixes this because you're not looping in the direction you're splicing
            improveOther2Function: function () {
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (arr[i] == "cat") {
                        arr.splice(i, 1);
                    }
                }
                console.log(arr);
            },
            //note i-- ,这时候i是可以取到0的
            improveOther1Function: function () {
                var i = arr.length;
                while (i--) {
                    if (arr[i] == "cat") {
                        arr.splice(i, 1);
                    }
                }
                console.log(arr);
            }
        },
        insert: {
            insert: function () {
                //https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index
                Array.prototype.insert = function (index, item) {
                    this.splice(index, 0, item);
                }
            },
            insertMultiple: function () {
                /*Syntax : array.insert(index,value1,value2,...,valueN)*/
                /*With multiple arguments and chainning support*/
                Array.prototype.insertMutiple = function (index) {
                    this.splice.apply(this, [index, 0].concat(Array.prototype.slice.call(arguments, 1)));
                    return this;
                }
            },
            insertMultiple1: function () {
                /*Syntax : array.inset(index, value1, value2, ...,valueN)*/
                /*With array-type arguments merging and chainning support*/
                Array.prototype.insertMultiple1 = function (index) {
                }
            }
        },
        empty: {

        }
    }
}())

var ArrayConvert = (function () {
    return {
        Array_Like_To_True_Array: function () {
            var trueArray = Array.prototype.slice.call(arrayLikeObject);
            var divs = Array.prototype.slice.call(document.querySelectorAll("div"));

            var a = Array.from('hello');
            console.log(a);// ['h', 'e', 'l', 'l', 'o']

            // 没有传length，结果返回了一个空数组，验证了第一个注意点
            var obj = { "name": "咸鱼", "age": "24", "sex": "男" }
            console.log(Array.from(obj));  //[]

            // 有传length,但不是类数组,返回三个undefined, 验证了第二个，第三个注意点            
            var obj2 = { "name": "咸鱼", "age": "24", "sex": "男", length: 3 };
            console.log(Array.from(obj2));  //[undefined, undefined, undefined]

            // 有传length,并且对象是类数组
            var obj3 = { "0": "咸鱼", "1": "24", "2": "男", length: 3 }
            console.log(Array.from(obj3));   //["咸鱼", "24", "男"]

            // key值不从0起,验证了注意点3
            var obj4 = { "1": "咸鱼", "2": "24", "3": "男", length: 3 };
            console.log(Array.from(obj4));  //[undefined, "咸鱼", "24"]
        },
        Value_To_Array: function () {
            var a = Array.of(3, 9, 10);
            var b = Array.of(3);

            console.log(a);  //[3, 9, 10]
            console.log(b);  //[3]
            console.log(b.length);  //1      

            //跟普通的数组有什么区别呢，普通的数组只有当参数个数不少于2个时，才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。
            var a = Array(3, 9, 10);
            var b = Array(3);

            console.log(a);  //[3, 9, 10]
            console.log(b);  //[,,,] 下面是普通的数组，可以看看参数只有一个的区别：
            console.log(b.length);  //3
        }
    }
})

//https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
//https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript

var objs = [
    { first_nom: 'Lazslo', last_nom: 'Jamf' },
    { first_nom: 'Pig', last_nom: 'Bodine' },
    { first_nom: 'Pirate', last_nom: 'Prentice' }
];
function Sort() {
    objs.sort(function (a, b) {
        if (a.last_nom < b.last_nom) {
            return -1;
        } else if (a.last_nom == b.last_nom) {
            return 0;
        } else {
            return 1;
        }
    })

}

function InsertSort(elements) {
    for (var i = 0; i < elements.length; i++) {
        if (elements[i] < elements[i - 1]) {
            var guard = elements[i];
            var j = i - 1;
            elements[i] = elements[j];
            while (j >= 0 && guard < elements[j]) {
                elements[j + 1] = elements[j];
                j--;
            }
            elements[j + 1] = guard;
        }
    }
}

var elements = [5, 9, 3, 6, 7, 4, 1, 8, 2];
InsertSort(elements)

function BullonSort(elements) {
    for (var i = 0; i < elements.length - 1; i++) {
        for (var j = 0; j < elements.length - i - 1; j++) {
            if (elements[j] > elements[j + 1]) {
                var wrap = elements[j];
                elements[j] = elements[j + 1];
                elements[j + 1] = wrap;
            }
        }

    }
}

var elements = [5, 9, 3, 6, 7, 4, 1, 8, 2];
BullonSort(elements)

var Messages = [
    {
        "timestamp": 1474328370007,
        "message": "hello"
    },
    {
        "timestamp": 1474328302520,
        "message": "how are you"
    },
    {
        "timestamp": 1474328370007,
        "message": "hello"
    },
    {
        "timestamp": 1474328370007,
        "message": "hello"
    }
]

//https://stackoverflow.com/questions/40811451/remove-duplicates-from-a-array-of-objects
var NoRepeatMessages = [];
function RemoveRepeat() {
    var hashFlag = {};
    Messages.forEach(function (value, index, array) {
        if (!hashFlag[value.timestamp]) {
            hashFlag[value.timestamp] = true;
            NoRepeatMessages.push(value);
        }
    });
}

function RemoveRepeat() {
    NoRepeatMessages = Messages.filter(function (a) {
        return !this[a.timestamp] && (this[a.timestamp] = true);
    }, {});
}


var noFruits, fruits = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
function RemoveRepeat() {
    noFruits = fruits.filter(function (value, index, array) {
        //return array.indexOf(value) === index;
        return array.indexOf(value) === array.lastIndexOf(value);
    })
}

//https://stackoverflow.com/questions/40029252/remove-all-repeated-values-in-array-and-leave-the-ones-that-dont-repeat-in-java
function RemoveRepeat() {
    for (var i = 0; i < nums.length; i++) {
        if (i !== nums.lastIndexOf(nums[i])) nums.splice(i, 1);
    }
}

//https://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array

//https://stackoverflow.com/questions/1098040/checking-if-a-key-exists-in-a-javascript-object


//https://stackoverflow.com/questions/30076219/does-es6-introduce-a-well-defined-order-of-enumeration-for-object-properties
//https://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript





