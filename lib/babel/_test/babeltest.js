// Test of Babel Plugins
// http://babeljs.io/docs/plugins/

// Babel Minification Plugins ================================================
//member-expression-literals
var fooObj = {};
fooObj['bar'] = 42;
fooObj['catch'] = 23; // reserved word not changed
void 'member-expression-literals';

//merge-sibling-variables
var foo = 'bar';
var bar = 'foo';
void 'merge-sibling-variables';

//minify-booleans
var scratch = void true || false;
void 'minify-booleans';

//property-literals
var foo = {
    'bar': function () {}
};
void 'property-literals';

//remove-console
declare var window;
declare var console;
// console logs gone...
window.console.log('deleteme'); // console log gone...
console.log('also gone'); // console log gone...
void 'remove-console';

//remove-debugger
debugger; // debugger gone...
void 'remove-debugger';

//simplify-comparison-operators
if ('foo' === 'bar') { };
void 'simplify-comparison-operators';

// Babel Other Plugins =======================================================
//eval
// BUG ERROR plugin has a parse error
eval('(() => "foo")');
void 'eval';

//flow-comments or
//flow-strip-types (minified)
function foo(one: any, two: number, three?): string {}
function foo(bar?) {}
function foo2(bar?: string) {}
function foo(x: number): string {}
type B = {
    name: string;
};
export type GraphQLFormattedError = number;
import type A, { B, C } from './types';
import typeof D, { E, F } from './types';
void 'flow-comments' + 'flow-strip-types';

//inline-environment-variables or
//node-env-inline (minified)
declare var development;
declare var production;
if (process.env.NODE_ENV === 'development') {
    development();
} else {
    production();
}
process.env.NODE_ENV === 'development';
process.env.NODE_ENV === 'production';
void 'inline-environment-variables' + 'node-env-inline';

//jscript
//https://kangax.github.io/nfe/#jscript-bugs
var jscript = function jscriptFn() {};
void 'jscript';

//object-assign
var objAssignA = { hey: 'jude' };
var objAssignB = { say: 'what' };
// CAVEAT creates undeclared variable _extendsN
Object.assign(objAssignA, objAssignB);
void 'object-assign';

//object-set-prototype-of-to-assign
var objSetProtoA2 = { a: 1 };
var objSetProtoB2 = { b: 2 };
// CAVEAT creates undeclared variable _defaultsN
Object.setPrototypeOf(objSetProtoB2, objSetProtoA2);
void 'object-set-prototype-of-to-assign';

//proto-to-assign
var objSetProtoA = { a: 1 };
var objSetProtoB = { b: 2 };
// CAVEAT creates undeclared variable _defaultsN
objSetProtoB.__proto__ = objSetProtoA;
objSetProtoB.b; // 2

objSetProtoB.a; // 1
objSetProtoA.a = 2;
objSetProtoB.a; // 1 - should be 2 but remember that nothing is bound and it's a straight copy
void 'proto-to-assign';

//regenerator
// CAVEAT creates undeclared variable _keysN

// ex1
Object.keys({});
function * fn(){}

// ex2
export default function * () {
    var x = yield 5;
    return 5;
}

// ex3
function *adder(total = 0) {
    let increment = 1;
    while (true) {
        let request = function.sent;
        switch (request) {
            case undefined: break;
            case 'done': return total;
            default: increment = Number(request);
        }
        yield total += increment;
    }
}

let tally = adder();
tally.next(0.1);
tally.next(0.1);
tally.next(0.1);
let last = tally.next('done');

// ex4
class Test {
    *iter(arg = this) {
        yield arg;
    }
}

let test = new Test;
void 'regenerator';

//runtime
// needed in dev to transform the code

//strict-mode
// puts use strict at top

//undefined-to-void
var undef = undefined;
void 'undefined-to-void';

// Babel Misc Plugins ========================================================
//external-helpers
// no docs on what this actually does
void 'external-helpers';

//undeclared-variables-check
// tested in babeltest-errors.js
// if this is enabled, it caused errors for other transforms which create
// undeclared variables see CAVEATS within this file.

//flugh++;
void 'undeclared-variables-check';

// Babel ES3 Plugins =========================================================
//es3-member-expression-literals
var es3MemLit = {};
foo.catch = 12;
void 'es3-member-expression-literals';

//es3-property-literals
var es3PropLit = {
    catch: function () {}
};
void 'es3-property-literals';

// Babel ES5 Plugins =========================================================
//es5-property-mutators
// CAVEAT creates undeclared variable _definePropertiesN
var fooPropMutator = {
    get bar() {
        return 'bar';
    }
};
void 'es5-property-mutators';

//Babel ES2015 Plugins =======================================================
//es2015-arrow-functions
//es2015-block-scoped-functions
//es2015-block-scoping
//es2015-classes
//es2015-computed-properties
//es2015-constants
//es2015-destructuring
//es2015-duplicate-keys
//es2015-for-of
//es2015-function-name
//es2015-literals
//es2015-object-super
//es2015-parameters
//es2015-shorthand-properties
//es2015-spread
//es2015-sticky-regex
//es2015-template-literals
//es2015-typeof-symbol
//es2015-unicode-regex

// React Preset includes: ====================================================
//syntax-flow
//syntax-jsx
//transform-flow-strip-types
//transform-react-jsx
//transform-react-display-name

// ES2015 Preset includes:
//check-es2015-constants
//transform-es2015-arrow-functions
//transform-es2015-block-scoped-functions
//transform-es2015-block-scoping
//transform-es2015-classes
//transform-es2015-computed-properties
//transform-es2015-destructuring
//transform-es2015-duplicate-keys
//transform-es2015-for-of
//transform-es2015-function-name
//transform-es2015-literals
//transform-es2015-modules-commonjs
//transform-es2015-object-super

//transform-es2015-parameters
//transform-es2015-shorthand-properties
//transform-es2015-spread
//transform-es2015-sticky-regex
//transform-es2015-template-literals
//transform-es2015-typeof-symbol
//transform-es2015-unicode-regex
//transform-regenerator


// Babel React Plugins
//react-constant-elements
//react-display-name
//react-inline-elements
//react-jsx
//react-jsx-compat
//react-jsx-source

// Babel Syntax Plugins
//async-functions
//async-generators
//class-constructor-call
//class-properties
//decorators
//do-expressions
//exponentiation-operator
//export-extensions
//flow
//function-bind
//function-sent
//jsx
//object-rest-spread
//trailing-function-commas

// Babel Modules Plugins
//es2015-modules-amd
//es2015-modules-commonjs
//es2015-modules-systemjs
//es2015-modules-umd

// Babel Experimental Plugins
//async-to-generator
//async-to-module-method
//class-constructor-call
//class-properties
//decorators
//do-expressions
//exponentiation-operator
//export-extensions
//function-bind
//object-rest-spread

