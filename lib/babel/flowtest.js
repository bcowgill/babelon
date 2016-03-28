/* @flow */

function foo(x) {
  return x * 10;
}

foo("Hello, world!");

// Type Annotations

function foo2(x: string, y: number): string {
  return x.length * y;
}

foo2("Hello", 42);

// Null

function length(x) {
  return x.length;
}

var total = length("Hello") + length(null);

// Arrays

function total(numbers: Array<number>) {
  var result = 0;
  for (var i = 0; i < numbers.length; i++) {
    result += numbers[i];
  }
  return result;
}

total([1, 2, 3, "Hello"]);

// Dynamic Code

function foo3(x) {
  return x.length;
}

var res = foo3("Hello") + foo3(42);

// Third Party Interfaces

var pizzas = [
  { title: 'Margherita', vegetarian: true },
  { title: 'Pepperoni', vegetarian: false },
  { title: 'Four cheese', vegetarian: true },
  { title: 'Hawaiian', vegetarian: false },
];

function vegetarianPizzas() {
  return _.findWhere(pizzas, {vegetarian: true});
}

