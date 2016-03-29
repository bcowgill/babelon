/* @flow */
/* global _, async, await, globalFn, globalFnSuppress1, globalFnSuppress2  */

import 'babel-polyfill';

// $FLOWFIXME suppress warning on next line
var x = globalFnSuppress1();

// $FLOWISSUE suppress warning flagged as an issue with flow
var x = globalFnSuppress2();

function foo(x) {
    return x * 10;
}

foo('Hello, world!');

// Type Annotations

function foo2 (
    x /* : string */,
    y /* : number */)
      /* : string */
{
    return x.length * y;
}

foo2('Hello', 42);

// Null

function length (x) {
    return x.length;
}

var total = length('Hello') + length(null);

// Union types
var numOrBool /* : number|boolean */ = 42;
numOrBool = 'nope';

// Literal values
/*::
type Suit = 'Diamonds' | 'Clubs' | 'Hearts' | 'Spades';
*/
var card /* : Suit */ = 'Cubs'; // typo

// Arrays

function total (numbers /* : Array<number> */ ) {
    var result = 0;
    for (var i = 0; i < numbers.length; i += 1) {
        result += numbers[i];
    }
    return result;
}

total([1, 2, 3, 'Hello']);

var listNum /* : number[] */ = [1, 2, 3];
var listNum2 /* : [number] */ = [3, 4, 5];
var listNumBool /* : Array<number|boolean> */ = [false,  0, true]; // correct
var listNumBool2 /* : [number|boolean][] */ = [2, false,  3, true]; // wrong

listNum.push('df');
listNum2.push('df');
listNumBool.push('df');
listNumBool2.push('df');

// Optional arrays and array elements
var optional_array_of_num /* : ?number[] */ = null;
var array_of_optional_num /* : Array<?number> */ = [null, 0];
var non_optional_array_of_num /* : number[] */ = null;
var array_of_non_optional_num /* : Array<number> */ = [null, 0];

// Tuples -- an array with different types at each index position
let tuple /* : [string, number, boolean] */ = ['foo', 0, true]; // correct
let tuple2 /* : Array<string, number, boolean> */ = ['foo', 0, true]; // wrong!
tuple[1] = 'wrong!';
tuple[2] = 'wrong!';

// Dynamic Code

function foo3 (x) {
    return x.length;
}

var res = foo3('Hello') + foo3(42);

// Third Party Interfaces

var pizzas = [
    { title: 'Margherita', vegetarian: true },
    { title: 'Pepperoni', vegetarian: false },
    { title: 'Four cheese', vegetarian: true },
    { title: 'Hawaiian', vegetarian: false },
];

function vegetarianPizzas () {
    return _.findWhere(pizzas, {vegetarian: true});
}

// Global not found (use interface files)
var x = globalFn();

// Module not found, declare module in interfaces or add to include paths
var y = require('foundInInterfaces');
var z = require('notfound');

// Operation not allowed on null
var u;
var v = null;
var result = u.bar;
var result = v.bar;

// Too few parameters passed to function
function mostly (wet, wild, wacky) {
    return wet + wild + wacky;
}
mostly('wet', 'wild');

function maybe (wet, wild, wacky/* ? */) {
    return wet + wild + (wacky ? wacky : '');
}
maybe('wet', 'wild');

function defaultFn (wet, wild, wacky = '') {
    return wet + wild + wacky;
}
defaultFn('wet', 'wild');

// Other type confusions
var t = 42 * 'one';
for (var key in [1, 'foo2', 3]) { void key; }
var eq = true == 42; // oops
var eq2 = true === 42; // ok

// Objects
let coolRating /* : {[id:string]: number} */ = {};
coolRating.fluid = 42;
coolRating.flux = 'noes';
coolRating[43] = 3;

// Function/Objects with additional properties
function makeCallableFn() /* : { (callable: number): string; priority: number } */ {
    function callable(number) {
        return number.toFixed(2);
    }
    callable.priority = 123;
    return callable;
}

var callableFn = makeCallableFn();

var callableReturn /* : string */ = callableFn(Math.PI); // "3.14"
var callableFoo /* : number */ = callableFn.priority; // 123
var callableReturn2 /* : string */ = callableFn('oops'); // "3.14"
var callableFoo2 /* : string */ = callableFn.priority; // 123

// Arrow notation for anonymous functions
[1, 2, 3, 'f'].map(num => '0' + num);
[1, 2, 3, 'f'].map((num/* : number */) /* : string */ => '0' + num);

// asynchronous functions
// types written out longhand
async function getFriendNames(
        friendIDs /* : Promise<number[]> */ ,
        getFriendName /* : (id : number) => Promise<string> */
    ) /* : Promise<string[]> */ {
        var ids = await friendIDs;
        var names = await Promise.all(ids.map(getFriendName));
        return names;
}
// define types to shorten up a bit
/*::
type PromiseNumberArray = Promise<number[]>;
type PromiseStringArray = Promise<string[]>;
type FunctionNumToString = (id: number) => Promise<string>;
*/
async function getFriendNames(
        friendIDs /* : PromiseNumberArray */,
        getFriendName /* : FunctionNumToString */
    ) /* : PromiseStringArray */
{
    var ids = await friendIDs;
    var names = await Promise.all(ids.map(getFriendName));
    return names;
}

// generator functions
function *infinity() /* : Generator<number,void,void> */ {
    /* jshint maxcomplexity: 8 */
    var n = 0;
    while (true) {
        yield n += 1;
    }
}

// a class

class MyClass {
/*::
    foo : string;
*/
    constructor(foo /* : string */) {
        this.foo = foo;
    }
    bar() /* : string */ {
        this.foo += 2;
        return this.foo;
    }
}

var myInstance /* : MyClass */ = new MyClass(42);
var ee /* : number */ = myInstance.bar();
ee.foo + 2


// Classes infer types locally
class C {
/*::
    x: string;
    y: number;
*/
    constructor(x) { this.x = x; }
    foo() { return this.x; }
    bar(y) { this.y = y; }
}

class D extends C {
    foo() { return super.foo() + '!'; }
    bar(y) { super.bar(y || 0); }

    static qux() { return new D('hello'); }
}

// Classes must annotate their type signatures if they are used outside their module
class ExportC {
/*::
    x: string;
    y: number;
*/
    constructor(x /* : string */) { this.x = x; }
    foo() /* : string */ { return this.x; }
    bar(y /* : number */) /* : void */ { this.y = y; }
}

class ExportD extends ExportC {
    foo() /* : string */ { return super.foo() + '!'; }
    bar(y /* ?: number */) /* : void */ { super.bar(y || 0); }

static qux() /* : ExportD */ { return new ExportD('hello'); }
}

module.exports.C = ExportC;
module.exports.D = ExportD;

// mixin/interface when no direct inheritance
/*::
interface Fooable {
    foo(): string;
}
*/

class AFoo {
    foo() { return 'foo from A'; }
}

class BFoo {
    foo() { return 'foo from B'; }
}

const af = new AFoo();
const ax = af.foo() - 2;

// Class as a type not an instance
class MyClassy {}

var MakeMyClass /* : Class<MyClassy> */ = MyClassy;
var myInstance2 = new MakeMyClass('foo');

// Generic types for objects, functions and classes
/*::
type GenericObject<T> = { foo: T };
*/
var numberObject /* : GenericObject<number> */ = { foo: '0' };
var stringObject /* : GenericObject<string> */ = { foo: 42 };

class GenericClass/* <T> */ {
/*::
    x: T;
*/
    constructor(x /* : T */) {
        this.x = x;
    }
}

var numberInstance /* : GenericClass<number> */ = new GenericClass('0');
var stringInstance /* : GenericClass<string> */ = new GenericClass(34);

function findMax/*<T>*/(arr /* : T[] */, compare /* : (a: T, b: T) => number */) {
    var sorted = arr.sort(compare);
    return sorted[sorted.length - 1];
}

findMax(
    ['a', 'b'],
    (less, more) => more - less
);

// Destructured values
var {a, b: {c}} /* : {a: string, b: {c: number}} */ = {a: '', b: {c: 0}};
a += 1;
c.toUpperCase();
//b.push(22) // not defined

// Typecasting expressions
var addit /* : string */ = (1 + 1 /* : number */);

var obj = {
    name: (null /* : ?string */)
};

([1, 'a', true] /* : Array<mixed> */).map(x => x);

obj.name = 42;


void x;
void card;
void optional_array_of_num;
void array_of_optional_num;
void non_optional_array_of_num;
void array_of_non_optional_num;
void tuple2;
void res;
void vegetarianPizzas;
void y;
void z;
void result;
void t;
void eq;
void eq2;
void callableReturn;
void callableFoo;
void callableReturn2;
void callableFoo2;
void getFriendNames;
void BFoo;
void myInstance2;
void numberObject;
void numberInstance;
void stringObject;
void stringInstance;
void addit;
void ax;
void infinity;