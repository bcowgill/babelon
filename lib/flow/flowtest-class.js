/* @flow */

import 'babel-polyfill';

// a class
class MyClass {
    foo : string; // babel can't parse this
//    SyntaxError: lib/babel/flowtest-class.js: Missing class properties transform.
    constructor(foo : string) {
        this.foo = foo;
    }
    bar() : string {
        this.foo += 2;
        return this.foo;
    }
}

var myInstance: MyClass = new MyClass(42);
var ee : number = myInstance.bar();
ee.foo + 2

// Classes infer types locally
class C {
    x: string;
    y: number;
    constructor(x) { this.x = x; }
    foo() { return this.x; }
    bar(y) { this.y = y; }
}

class D extends C {
    foo() { return super.foo() + "!"; }
    bar(y) { super.bar(y || 0); }

    static qux() { return new D("hello"); }
}

// Classes must annotate their type signatures if they are used outside their module
class ExportC {
    x: string;
    y: number;
    constructor(x: string) { this.x = x; }
    foo(): string { return this.x; }
    bar(y: number): void { this.y = y; }
}

class ExportD extends ExportC {
    foo(): string { return super.foo() + "!"; }
    bar(y?: number): void { super.bar(y || 0); }

static qux(): ExportD { return new ExportD("hello"); }
}

module.exports.C = ExportC;
module.exports.D = ExportD;

class GenericClass<T> {
    x: T;
constructor(x: T) {
    this.x = x;
}
}

var numberInstance : GenericClass<number> = new GenericClass('0');
var stringInstance : GenericClass<string> = new GenericClass(34);
