'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const paragraphTimer = document.querySelector('.logout-timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//only login screen initially
containerMovements.innerHTML = '';
paragraphTimer.style.opacity = 0;

/////////////////////////////////////////////////
//functions


const displayMovements = function (currentAccount, sort=false) {
  containerMovements.innerHTML = '';

  console.log(`displaying with sort ${sort}`);
  const mov = [...currentAccount.movements];
  //sorting only if sort is true
  sort && mov.sort((a,b)=>a-b);
  
  mov.forEach(function(element, index){
    const type = element > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${element} £</div>
  </div>`

  containerMovements.insertAdjacentHTML('afterbegin', html);


  });
}

//displayMovements(account1.movements);


const calcDisplayBalance = function(currentAccount){
  return labelBalance.textContent = `${currentAccount.movements.reduce((accumulator, element)=> accumulator+=element, 0)}£`;
}

//calcDisplayBalance(account1.movements);


const calcDisplaySummary = function(currentAccount){
  const incomes = currentAccount.movements.filter(movement=>movement>0)
                           .reduce((accumulator, movement)=>accumulator+movement, 0)
  
  const expenditures = currentAccount.movements.filter(movement=>movement<0)
                                .reduce((accumulator, movement)=>accumulator+movement, 0)
  
  const interest = currentAccount.movements.filter(movement=>movement>0)
                            .map(deposit=>deposit*currentAccount.interestRate/100)
                            .filter(interest=>interest>1)
                            .reduce((accumulator, interest)=>accumulator+interest, 0)

  labelSumIn.textContent = `${incomes}£`;
  labelSumOut.textContent = `${Math.abs(expenditures)}£`;
  labelSumInterest.textContent = `${interest}£`;
}

//calcDisplaySummary(account1);

const updateUI = function(currentAccount){
  //update the welcome label
  labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
    
  //display transactions
  displayMovements(currentAccount);

  //display balance calculated from transactions
  currentAccount.balance = Number(calcDisplayBalance(currentAccount).slice(0, -1));

  //display the summary
  calcDisplaySummary(currentAccount);
}

const cleanUI = function(welcomeLabelMessage){

    //for logging out
    currentAccount = null;
    containerMovements.innerHTML = '';
    labelSumIn.textContent = ``;
    labelSumOut.textContent = ``;
    labelSumInterest.textContent = ``;
    labelBalance.textContent = ``;
    labelWelcome.textContent = welcomeLabelMessage;
    paragraphTimer.style.opacity = 0;

    //for account closure
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
}


let currentAccount;

btnLogin.addEventListener('click', function(e){
  // Prevent form from submitting(won't refresh)
  e.preventDefault();
  const username = inputLoginUsername.value;
  currentAccount = accounts.find(account=>account.username === username);
  if(currentAccount?.pin === Number(inputLoginPin.value)){
    console.log('logged in!');

    //blur and change login field focus and clear fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    paragraphTimer.style.opacity = 1;

    updateUI(currentAccount);

  }
  else{
    
    cleanUI(`Incorrect credentials, try again!`);
  }
});

btnTransfer.addEventListener('click', function(e){
  // Prevent form from submitting(won't refresh)
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  const transferTo = inputTransferTo.value;

  const toAccount = accounts.find(account=>account.username == transferTo);
  if(transferAmount > 0 && transferAmount <= currentAccount.balance && toAccount && toAccount.username !== currentAccount.username){
    console.log('successful!');
    currentAccount.movements.push(-transferAmount);
    toAccount.movements.push(transferAmount);
    updateUI(currentAccount);
  }
  else{
    console.log('unsuccessful!');
    console.log(transferAmount > 0);
    console.log(transferAmount <= currentAccount.balance);
    console.log(currentAccount.balance);
    console.log(toAccount);
    console.log(toAccount.username != currentAccount.username);

  }
  
});

btnLoan.addEventListener('click', function(e){
  // Prevent form from submitting(won't refresh)
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount > 0 && currentAccount.movements.some(mov=>mov>=0.1*amount)){
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';

})

let sorted = false;
btnSort.addEventListener('click', function(e){
  // Prevent form from submitting(won't refresh)
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;

});

btnClose.addEventListener('click', function(e){
  // Prevent form from submitting(won't refresh)
  e.preventDefault();
  const closeUsername = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);

  if(closeUsername === currentAccount.username && closePin === currentAccount.pin){
    console.log('close valid!');

    //get index of account with username matching
    //indexOf will not work here as we need to test a condition, that just searches for the element
    const index = accounts.findIndex(account=>account.username === closeUsername);
    console.log(index);


    accounts.splice(index, 1);

    //logout cleanup of UI
    cleanUI(`Please login to proceed`);
    
  }
  else{
    console.log(currentAccount.pin);
    console.log(closePin);
  }
})


/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//slice
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());

//splice
//console.log(arr.splice(2));
arr.splice(-1);//deletes last element
arr.splice(1, 2);//2nd param is number of elements to delete
console.log(arr);

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));


/*
///////////////////////////////////////
// Looping Arrays: forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH ----');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...


///////////////////////////////////////
// forEach With Maps and Sets
// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${value}`);
});


///////////////////////////////////////
// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const puppyChecker = function(dogsJulia, dogsKate){

  const jDogs = dogsJulia.slice(1,-2);
  const combined = [...jDogs, ...dogsKate];

  combined.forEach(function(age, index){
    age<3 ? console.log(`Dog number ${index+1} is still a puppy 🐶`) : console.log(`Dog number ${index+1} is an adult, and is ${age} years old`);
  });
  
}

puppyChecker([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
puppyChecker([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

//map
const eurToUsd = 1.1;
const movementsUSD = movements.map(function(element){
return element*eurToUsd;
})
const movementsUSDArrow = movements.map(element=>element*eurToUsd);

console.log(movements);
console.log(movementsUSD);
console.log(movementsUSDArrow);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

const user = 'Sharang Deepak Gupta';
function createUsernames(accounts){
  accounts.forEach(function(account){
    account.username = account.owner.split(' ').map(name=>name[0]).join('').toLowerCase();
  });
}
createUsernames(accounts);
console.log((accounts));

//filter
const deposits = movements.filter(movement=>movement>=0);
const withdrawals = movements.filter(movement=>movement<0);

console.log(deposits);
console.log(withdrawals);

//reduce => first param function to 'snowball' the accumulator, second param is accumulator starting value
const balance = movements.reduce(function(accumulator, element, index, arr){
  return accumulator+element;
}, 0);

console.log(balance);

const max = movements.reduce(function(accumulator, element, index, arr){
  return accumulator>element?accumulator:element;
}, movements[0]);
console.log(max);

// Coding Challenge #2 and #3

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

function calcAverageHumanAge(dogAges){
  //chaining
  const avgAdultHumanAges = dogAges.map(age=> (age <= 2 ? 2*age : (16+4*age)))
                                   .filter(age=> age >= 18)
                                   .reduce((accumulator, age, _, arr)=>
                                            accumulator+age/arr.length,
                                    0);
  console.log(avgAdultHumanAges);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// The find Method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

///////////////////////////////////////
// some and every
console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
console.log(movements.some(mov => mov === -130));

//some useful if we need to check conditions apart from equality
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


///////////////////////////////////////
// flat and flatMap
const arrFlat = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrFlat.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);


///////////////////////////////////////
// Sorting Arrays

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);


///////////////////////////////////////
// More Ways of Creating and Filling Arrays
const arrFill = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arrFill.fill(23, 2, 6);
console.log(arrFill);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});


///////////////////////////////////////
// Array Methods Practice

// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
  
console.log(numDeposits1000);

// Prefixed ++ operator
let a = 10;
console.log(++a);
console.log(a);

// 3.
const { deposits2, withdrawals2 } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits2: 0, withdrawals2: 0 }
  );
  
console.log(deposits2, withdrawals2);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

/*
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
*/