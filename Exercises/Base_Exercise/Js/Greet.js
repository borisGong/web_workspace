//最简单单例
var singletonObject = {
    property1: "property1",
    property2: "property2",
    method1: function () {
        console.log("method1");
    },
    method2: function () {
        console.log("method2");
    }
}
//如何创建私有变量
var privatePackage = function () {
    var privateVar = "";
    var privateMethod = function () {
        console.log("private method")
    }

    return {
        setPrivateVar: function (text) {
            private = text;
        },
        getPrivateVar: function () {
            return privateVar;
        },
        InvokePrivateMethod: function () {
            privateMethod();
        }
    }
}

//将最简单的单例变成含有私有成员且(初始化的时候立即执行创建对象)
var privatePackageSingletonObject = (function () {
    var privateVar = "";
    var privateMethod = function () {
        console.log("private method")
    }

    return {
        setPrivateVar: function (text) {
            privateVar = text;
        },
        getPrivateVar: function () {
            return privateVar;
        },
        InvokePrivateMethod: function () {
            privateMethod();
        }
    }
})()

//将立即执行变成惰性加载，主要将立即执行换成getInstance调用创建对象
var singletonFactory = (function () {
    var instance;
    function createInstance() {
        var object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


var privatePackageSingeton = function () {
    var _instance;

    function init() {
        var privateVar = "";
        var privateMethod = function () {
            console.log("private method")
        }

        return {
            setPrivateVar: function (text) {
                private = text;
            },
            getPrivateVar: function () {
                return privateVar;
            },
            InvokePrivateMethod: function () {
                privateMethod();
            }
        }
    }

    return {
        getInstance: function () {
            if (!_instance) {
                _instance = init();
            }

            return _instance
        }
    }
}

//通过高阶函数，将createInstance方法单独提出，然后委托给抽象的GetSingleton
var CreateComponentLib = function () {
    var components = new Array();
    return {
        pushComponent: function (component) {
            components.push(component);
        },
        getComponentCount: function () {
            return components.length;
        }
    }
}

var getSingleton = function (fn) {
    var _instance;
    return function () {
        if (!_instance) {
            _instance = fn();
        }
        return _instance;
    }
}


var CreateSinglecomponentLib = getSingleton(CreateComponentLib);
var lib1 = CreateSinglecomponentLib();
var lib2 = CreateSinglecomponentLib();
console.log(lib1 === lib2);