'use strict';

// Data needed for first part of the section
const weekdaylist = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  //ES-6 syntax allows us to compute keys!
  [weekdaylist[2]]: {
    open: 12,
    close: 22,
  },
  //ES-6 syntax allows us to compute keys!
  [weekdaylist[4]]: {
    open: 11,
    close: 23,
  },
  ['mon']: {
    open: 0,
    close: 23,
  },
  //ES-6 syntax allows us to compute keys!
  [`day-${8 - 2}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  //destructuring the object passed as arguement
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here's your delicius pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },

  //ES-6 syntax allows for creating functions without function keyword
  orderPizza(ing1, ...others) {
    console.log(ing1);
    console.log(others);
  },
  //ES-6 syntax allows using objects as properties directly
  openingHours,
};

/*
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
*/

let [main, , secondary] = restaurant.categories;

console.log(main, secondary);

//switching variables
[secondary, main] = [main, secondary];
console.log(main, secondary);

const [starter, mainCourse] = restaurant.order(2, 0);

console.log(starter, mainCourse);

//nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

//default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

//object destructuring

const { name, openingHrs, categories } = restaurant;
console.log(name, openingHrs, categories);

//renaming variable names to be different from object property names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

const { menu = [], starterMenu: starters = [] } = restaurant;

console.log(menu, starters);

//mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);

const {
  fri: { open: o, close: c },
} = hours;
console.log(o, c);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del sole, 21',
  starterIndex: 1,
});

//convert array to comma seperated values : spread operator...
const arr = [7, 8, 9];
const newArr = [1, 2, ...arr];
console.log(newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

//join 2 arrays
const fullMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(fullMenu);

const str = 'sharang';
const letters = [...str, ' ', 'G.'];
console.log(letters);

/*
const ingredients = [
  prompt("Let's make pasta! Ingredient 1 : ?"),
  prompt('ingredient 2 ?'),
  prompt('ingredient 3? '),
];
restaurant.orderPasta(...ingredients);*/

//objects
const newRestraunt = { foundedIn: 1945, founder: 'Sharang', ...restaurant };
console.log(newRestraunt);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Rome';
console.log(restaurantCopy.name, restaurant.name);

//DESTRUCTURING

//spread operator as ... on RHS of =
const arrN = [1, 2, ...[3, 4, 5]];

//rest operator as ... on LHS of =
const [u, v, w, ...others] = arrN;
console.log(others);

const [pizza, risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat);
console.log(weekdays);

//FUNCTIONS
const add = function (...numbers) {
  let sum = 0;
  for (const i of numbers) sum += i;
  return sum;
};

console.log(add(2, 3, 5));
console.log(add(2, 3));
console.log(add(2, 3, 5, 7, 9));
console.log(add(1, 4, 16, 256));

const x = [2, 4, 6, 8, 10];
console.log(add(...x));

restaurant.orderPizza('vegan cheese', 'olives');
restaurant.orderPizza('kale');

//short circuiting

//or short circuits on executing the first true statement/value, or returns last
console.log('OR short circuiting');
console.log('sharang' || 'hello');
console.log('' || 'hello');
console.log(null || 'hello');
console.log(undefined || 'hello');

//and short circuits on executing the first false statement/value or returns last
console.log('AND short circuiting');
console.log('sharang' && 'hello');
console.log('sharang' && '');
console.log('sharang' && null);
console.log('sharang' && 'hello' && undefined);

//practical use case
if (restaurant.orderPizza) {
  restaurant.orderPizza('olives', 'vegan cheese');
}
//if can be shortened like this
restaurant.orderPizza && restaurant.orderPizza('tomatoes', 'vegan cheese');

//nullish coalescent operator

//0 is a falsey value, but sometimes it may be the actual input!
restaurant.numGuests = 0;
let guests = restaurant.numGuests || 10;
console.log(guests);

//instead use nullish coalescent operator
//onlu undefined and null are false for ??
guests = restaurant.numGuests ?? 10;
console.log(guests);

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
console.log('\n\ncoding challange 1');
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

function printGoals(...players) {
  console.log(players.length);
}

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

team1 < team2 && console.log('team 1 is more likely to win');

team1 > team2 && console.log('team 2 is more likely to win');

draw > team1 && draw > team2 && console.log('draw most likely');

//looping
console.log('Menu:');
const menuLoop = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menuLoop) {
  console.log(item);
}
console.log('\n');
for (const item of menuLoop.entries()) {
  console.log(`${item[0] + 1} : ${item[1]}`);
}
console.log('\n');
for (const [itemNo, itemName] of menuLoop.entries()) {
  console.log(`${itemNo + 1} : ${itemName}`);
}

//optional chaining
console.log(restaurant.openingHours?.monday?.close);
console.log(restaurant.openingHours?.sunday?.open);
//optional chaining stops and returns undefined if key does not exist

for (const day of weekdaylist) {
  //if we do not use ?? instead of || monday will show closed as it opens at 0, a falsey value!
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  if (open != 'closed') {
    console.log(`on ${day} we open at ${open}`);
  } else {
    console.log(`on ${day} we are closed!`);
  }
}

//methods
console.log(restaurant.order?.(0, 1) ?? 'order functionality does not exist!');

console.log(
  restaurant.orderRissoto?.(0, 1) ??
    'order Rissoto functionality does not exist!'
);

//arrays
const users = [{ name: 'sharang', email: 'sdg1n20@soton.ac.uk' }];

console.log(users[0]?.name ?? 'users empty');
console.log(users[1]?.name ?? 'user does not exist');

//property names

const properties = Object.keys(restaurant.openingHours);
console.log(properties);

const values = Object.values(restaurant.openingHours);
console.log(values);

const entries = Object.entries(restaurant.openingHours);
console.log(entries);

//entries have a structure of [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`on ${day} we open at ${open} and close at ${close}.`);
}

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

for (const [index, player] of game.scored.entries()) {
  console.log(`Goal ${index + 1} : ${player}`);
}

let sum = 0;
for (const odd of Object.values(game.odds)) {
  sum += odd;
}
console.log(sum / Object.values(game.odds).length);

for (const [team, odd] of Object.entries(game.odds)) {
  const winner = game[team] ?? 'draw';
  console.log(`odds in favour of ${winner} : ${odd}`);
}

const scorers = {};
const scorersList = game.scored;
for (const scorer of scorersList) {
  scorers[scorer] = scorers[scorer] + 1 || 1;
}
console.log(scorers);

const orderedSet = new Set(['pizza', 'pasta', 'pizza', 'bruchetta']);
console.log(orderedSet);
console.log(new Set('sharang'));
console.log(orderedSet.size);
console.log(orderedSet.has('pizza'));
console.log(orderedSet.has('bread'));

orderedSet.add('Garlic Bread');
orderedSet.add('Garlic Bread');
console.log(orderedSet);

orderedSet.delete('bruchetta');
console.log(orderedSet);

for (const order of orderedSet) {
  console.log(order);
}

const staff = ['waiter', 'chef', 'butler', 'waiter', 'cleaner', 'cleaner'];
const uniqueHires = [...new Set(staff)];
console.log(uniqueHires);
const uniqueHireCount = new Set(staff).size;
console.log(uniqueHireCount);

const rest = new Map();
rest.set('name', 'classico itiliano');
rest.set(1, 'Italy');
console.log(rest.set(2, 'portugal'));

rest
  .set('categories', ['italian', 'mexican', 'thai', 'indian'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'we are open😄')
  .set(false, 'we are closed🙁');
console.log(rest.get('name')); //console.log(rest.get(true));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
console.log(rest.has('categories'));
console.log(rest.delete(2));
console.log(rest);
console.log(rest.size);
rest.clear();
console.log(rest.size);

//if you use a reference as a key, make sure it points to the same thing!
rest.set([1, 2], 'val1');
console.log(rest.get([1, 2]));
rest.clear();

const ref = [1, 2];
rest.set(ref, 'val1');
console.log(rest.get(ref));

rest.set(document.querySelector('h1'), 'heading');
console.log(rest);

const question = new Map([
  ['question', 'what is the best programming language?'],
  [1, 'c'],
  [2, 'java'],
  [3, 'javascript'],
  ['correct', 3],
  [true, 'correct🎉'],
  [false, 'wrong😿'],
]);
console.log(question);

//convert object to maps
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//quiz app

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key == 'number') {
    console.log(`option : ${key} : ${value}`);
  }
}
/*
const answer = Number(prompt('your answer'));
console.log(question.get(question.get('correct') === answer));
*/
//map to array
//use spread operator within array braces
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);
console.log([question.entries()]);

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1
const uniqueEvents = [...new Set(gameEvents.values())];
console.log(uniqueEvents);

//2
gameEvents.delete(64);
console.log(gameEvents);

//3
let count = 0;
for (const min of gameEvents.keys()) {
  min < 90 ? count++ : true;
}
console.log(`An event happened, on average, every ${90 / count} minutes`);

//4
for (const [min, eventName] of gameEvents.entries()) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${eventName}`);
}

const airline = 'TAP Air Portugal';
let plane = 'A320';
console.log(plane[0]);
console.log(plane.indexOf('0'));
console.log(airline.lastIndexOf('r'));
console.log(airline.slice(4));
console.log(airline.slice(8, 10));
console.log(airline.slice(-2));
console.log(airline.slice(4, -1));
console.log(airline.slice(4, -9));
console.log('test'.length);

const checkMiddleSeat = function (seatNumber) {
  if (seatNumber.slice(-1) == 'B' || seatNumber.slice(-1) == 'E') {
    console.log('you got a middle seat!');
  } else {
    console.log('you got a corner seat!');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

const correctName = function (name) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
};
console.log(correctName('shARANg'));

const email = '  Hello@test.io \n';
console.log(email.trim().toLowerCase());
const priceGB = '235,89£';
console.log(priceGB.replace(',', '.').replace('£', '$'));
const board = 'all passengers report to boarding gate 23! boarding gate 23';
console.log(board.replaceAll('gate', 'door'));

plane = 'Airbus A320neo';
console.log(plane.includes('Ai'));
console.log(plane.includes('ai'));
console.log(plane.startsWith('Ai'));
console.log(plane.endsWith('neo'));

//split and join
let sg = 'Sharang Gupta';
let [fname, lname] = sg.split(' ');
console.log(fname);
console.log(lname);
console.log(['Mr', fname, lname].join(' ').toUpperCase());

const correctName2 = function (str) {
  const names = str.toLowerCase().split(' ');
  const updated = [];
  for (const n of names) {
    updated.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(updated.join(' '));
};
correctName2('sharang guptA');

const maskCardNumber = function (num) {
  const str = num + '';

  console.log(str.slice(-4).padStart(str.length, '*'));
};

maskCardNumber(4230943390486233);

const str2 = 'bad weather, all flights cancelled... ';
console.log(str2.repeat(5));

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const lines = text.split('\n');
  let ticks = 0;
  for (const line of lines) {
    ticks += 1;
    let lineUpdated = line.replace(
      '_' + line[line.indexOf('_') + 1],
      '_' + line[line.indexOf('_') + 1].toUpperCase()
    );
    lineUpdated = lineUpdated.replace('_', '');
    lineUpdated = lineUpdated.trim();
    let pattern = '✅'.repeat(ticks);
    console.log(lineUpdated.padEnd(20) + pattern);
  }
});

/*
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
*/

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

function formatFlights(str) {
  const lines = str.split('+');
  for (const line of lines) {
    let [type, from, to, time] = line.split(';');
    type = type.replaceAll('_', ' ');
    type = type.replace('Delayed', '🔴' + 'Delayed');
    from = from.slice(0, 3);
    to = to.slice(0, 3);
    console.log([type, 'from', from, 'to', to, time].join(' ').padStart(47));
  }
}
formatFlights(flights);
