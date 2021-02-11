'use strict';
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  //console.log(firstName);
  function printAge() {
    /*
    const firstName = 'Steven';
    variables shadow outer scope if redefined, i.e, when searching for the reference, if its found in the current scope it does not need to look higher!
    */
    let output = `${firstName}, you are ${age} years old, born in the year ${birthYear}...fyi the current year is 2037`;
    console.log(output);
    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const str = `oh and you are a millenial, ${firstName}!`;
      console.log(str);
      /*
      output = 'new output!';
      console.log(output);
      we are reassigning outer scope variable, not redeclaring it, so it modifies the value!
      */
      function add(a, b) {
        return a + b;
      }
    }
    console.log(millenial);
    /*
    add(2, 3);
    functions are also block scoped in es6! behave just like let and const!
    */
  }
  printAge();
  return age;
}
const firstName = 'Sharang';

//hoisting for variables

console.log(z); //var is hoisted with undefined
/*
console.log(x);//fails because let is used
console.log(y);//fails because const is used
*/

let x = 5;
const y = 10;
var z = 15;

//hoisting for functions
/*
add(2, 3);
add3(2, 3);//fails because add3 is initialised using var, hence hoisted as undefined

add2(2, 3); //fails because add2 is initialised using const, cannot access before initializing
*/

function add(x, y) {
  return x + y;
}

const add2 = function (x, y) {
  return x + y;
};

var add3 = (x, y) => x + y;

//global this points to window
console.log(this);

function calcAge(birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
}
//in strict mode this points to undefined if called directly, without strict mode it points to window too
calcAge(1996);

const calcAge2 = birthYear => {
  console.log(2037 - birthYear);
  console.log(this);
};
//this in arrow functions point to the parent scope this
calcAge2(1996);

const sharang = {
  year: 1996,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
//this points to object which invokes the method
sharang.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = sharang.calcAge;
//important to note that it doesnt matter where the function is defined, but only who invokes it... this points to the invoker
matilda.calcAge();

/*
//here its a regular function, so this is undefined, so searching for property value fails...
const f = sharang.calcAge;
f();
*/

const objLiteral = {
  year: 1996,
  calcAge: function () {
    console.log('this in function invoked via object : ');
    console.log(this);
    console.log(2037 - this.year);

    function isMillenial() {
      //"this" here is undefined, as it behaves just as a regular function call, not invoked via an object DIRECTLY
      console.log('regular ismillenial!');
      console.log(this);
      //const age = 2037 - this.year;
    }
    isMillenial();

    //fix 1: declare another variable as this, that would now be accessable in the scope of below function
    const self = this;
    function isMillenial1() {
      //"this" here is undefined, as it behaves just as a regular function call, not invoked via an object DIRECTLY
      console.log('ismillenial 1!');
      console.log(self);
      const age = 2037 - self.year;
    }
    isMillenial1();

    //fix 2: use arrow functions, they borrow the closest lexical scope, i.e of the parent of where its defined
    const isMillenial2 = () => {
      console.log('ismillenial 2!');
      console.log(self);
      const age = 2037 - this.year;
    };
    isMillenial2();
  },

  greet: () => {
    console.log('arrow function invoked via object!');
    //this points to lexical scope, i.e global, not bound to object!
    console.log(this);
  },
};

objLiteral.calcAge();
objLiteral.greet();

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

const arrowAddExpr = (a, b) => {
  console.log(arguments);
  return a + b;
};

addExpr(2, 5);
//we can send any number of parameters, but the function defination may name and use only a few.
addExpr(2, 5, 7);

//no arguements object in arrow functions
//arrowAddExpr(2, 5);

//primitive types stored in stack
let lastName = 'williams';
let oldLastName = lastName;
lastName = 'dave';

console.log(lastName, oldLastName);

//reference types with reference to heap stored
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;

//this works as although the reference stored is constant, the object pointed by in the heap by the reference does not have this restriction.

marriedJessica.lastName = 'Dave';

console.log(jessica, marriedJessica);

//copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['alice', 'bob'],
};

//SHALLOW COPY, I.E, ONLY COPIES 1 LEVEL DEEP
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Dave';

//arrays are deeper, ie, objects themselves, so making changes to this affects the original array
jessicaCopy.family.push('mary');

console.log(jessica2);
console.log(jessicaCopy);
