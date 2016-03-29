// Test of Babel Plugins
// http://babeljs.io/docs/plugins/

// Babel Minification Plugins ================================================
//member-expression-literals
var fooObj = {};
fooObj["bar"] = 42;

//merge-sibling-variables
var foo = "bar";
var bar = "foo";
void 0;

//minify-booleans
void true || false;

//property-literals
var foo = {
    "bar": function () {}
};

//remove-console
declare var window;
declare var console;
// console logs gone...
window.console.log('deleteme'); // console log gone...
console.log('also gone'); // console log gone...

//remove-debugger
debugger; // debugger gone...

//simplify-comparison-operators
if ("foo" === "bar") { };

// Babel Other Plugins =======================================================
//eval
// ERROR plugin has a parse error
eval("(() => 'foo')");

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
//end

//inline-environment-variables or
//node-env-inline (minified)
declare var development;
declare var production;
if (process.env.NODE_ENV === "development") {
    development();
} else {
    production();
}
process.env.NODE_ENV === "development";
process.env.NODE_ENV === "production";

//jscript
//https://kangax.github.io/nfe/#jscript-bugs
var foo = function bar() {

};

//object-assign
/* ERROR from plugin when enabled
var a = { hey: 'jude' };
var b = { say: 'what' };
Object.assign(a, b);
*/

//object-set-prototype-of-to-assign
//proto-to-assign
//regenerator
//runtime
//strict-mode
//undefined-to-void


// React Preset includes:
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


// Babel Misc Plugins
//external-helpers
//undeclared-variables-check

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

// Babel ES5 Plugins
//es5-property-mutators

//Babel ES2015 Plugns
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

// Babel ES3 Plugins
//es3-member-expression-literals
//es3-property-literals
