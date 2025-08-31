// TypeScript has some fun special cases for literals in

// source code.

// In part, a lot of the support is covered in type widening

// and narrowing ( example:type-widening-and-narrowing ) and it's

// worth covering that first.

// A literal is a more concrete subtype of a collective type.

// What this means is that "Hello World" is a string, but a

// string is not "Hello World" inside the type system.

const helloWorld = "Hello World";

let hiWorld = "Hi World"; // this is a string because it is let

// This function takes all strings

declare function allowsAnyString(arg: string);

allowsAnyString(helloWorld);

allowsAnyString(hiWorld);

// This function only accepts the string literal "Hello World"

declare function allowsOnlyHello(arg: "Hello World");

allowsOnlyHello(helloWorld);

allowsOnlyHello(hiWorld);

// This lets you declare APIs which use unions to say it

// only accepts a particular literal:

declare function allowsFirstFiveNumbers(arg: 1 | 2 | 3 | 4 | 5);

allowsFirstFiveNumbers(1);

allowsFirstFiveNumbers(10);

let potentiallyAnyNumber = 3;

allowsFirstFiveNumbers(potentiallyAnyNumber);

// At first glance, this rule isn't applied to complex objects.

const myUser = {

  name: "Sabrina",

};

// See how it transforms `name: "Sabrina"` to `name: string`

// even though it is defined as a constant. This is because

// the name can still change any time:

myUser.name = "Cynthia";

// Because myUser's name property can change, TypeScript

// cannot use the literal version in the type system. There

// is a feature which will allow you to do this however.

const myUnchangingUser = {

  name: "Fatma",

} as const;

// When "as const" is applied to the object, then it becomes

// a object literal which doesn't change instead of a

// mutable object which can.

myUnchangingUser.name = "Raîssa";

// "as const" is a great tool for fixtured data, and places

// where you treat code as literals inline. "as const" also

// works with arrays:

const exampleUsers = [{ name: "Brian" }, { name: "Fahrooq" }] as const;

// TypeScript is a Structural Type System. A structural type

// system means that when comparing types, TypeScript only

// takes into account the members on the type.

// This is in contrast to nominal type systems, where you

// could create two types but could not assign them to each

// other. See example:nominal-typing

// For example, these two interfaces are completely

// transferrable in a structural type system:

interface Ball {

  diameter: number;

}

interface Sphere {

  diameter: number;

}

let ball: Ball = { diameter: 10 };

let sphere: Sphere = { diameter: 20 };

sphere = ball;

ball = sphere;

// If we add in a type which structurally contains all of

// the members of Ball and Sphere, then it also can be

// set to be a ball or sphere.

interface Tube {

  diameter: number;

  length: number;

}

let tube: Tube = { diameter: 12, length: 3 };

tube = ball;

ball = tube;

// Because a ball does not have a length, then it cannot be

// assigned to the tube variable. However, all of the members

// of Ball are inside tube, and so it can be assigned.

// TypeScript is comparing each member in the type against

// each other to verify their equality.

// A function is an object in JavaScript and it is compared

// in a similar fashion. With one useful extra trick around

// the params:

let createBall = (diameter: number) => ({ diameter });

let createSphere = (diameter: number, useInches: boolean) => {

  return { diameter: useInches ? diameter * 0.39 : diameter };

};

createSphere = createBall;

createBall = createSphere;

// TypeScript will allow (number) to equal (number, boolean)

// in the parameters, but not (number, boolean) -> (number)

// TypeScript will discard the boolean in the first assignment

// because it's very common for JavaScript code to skip passing

// params when they're not needed.

// For example the array's forEach's callback has three params,

// value, index and the full array - if TypeScript didn't

// support discarding parameters, then you would have to

// include every option to make the functions match up:

[createBall(1), createBall(2)].forEach((ball, _index, _balls) => {

  console.log(ball);

});

// No one needs that.

// Return types are treated like objects, and any differences

// are compared with the same object equality rules above.

let createRedBall = (diameter: number) => ({ diameter, color: "red" });

createBall = createRedBall;

createRedBall = createBall;

// Where the first assignment works (they both have diameter)

// but the second doesn't (the ball doesn't have a color).



// Type Guarding is the term where you influence the code

// flow analysis via code. TypeScript uses existing JavaScript

// behavior which validates your objects at runtime to influence

// the code flow. This example assumes you've read example:code-flow

// To run through these examples, we'll create some classes,

// here's a system for handling internet or telephone orders.

interface Order {

  address: string;

}

interface TelephoneOrder extends Order {

  callerNumber: string;

}

interface InternetOrder extends Order {

  email: string;

}

// Then a type which could be one of the two Order subtypes or undefined

type PossibleOrders = TelephoneOrder | InternetOrder | undefined;

// And a function which returns a PossibleOrder

declare function getOrder(): PossibleOrders;

const possibleOrder = getOrder();

// We can use the "in" operator to check whether a particular

// key is on the object to narrow the union. ("in" is a JavaScript

// operator for testing object keys.)

if ("email" in possibleOrder) {

  const mustBeInternetOrder = possibleOrder;

}

// You can use the JavaScript "instanceof" operator if you

// have a class which conforms to the interface:

class TelephoneOrderClass {

  address: string;

  callerNumber: string;

}

if (possibleOrder instanceof TelephoneOrderClass) {

  const mustBeTelephoneOrder = possibleOrder;

}

// You can use the JavaScript "typeof" operator to

// narrow your union. This only works with primitives

// inside JavaScript (like strings, objects, numbers).

if (typeof possibleOrder === "undefined") {

  const definitelyNotAnOder = possibleOrder;

}

// You can see a full list of possible typeof values

// here: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/typeof

// Using JavaScript operators can only get you so far. When

// you want to check your own object types you can use

// type predicate functions.

// A type predicate function is a function where the return

// type offers information to the code flow analysis when

// the function returns true.

// Using the possible order, we can use two type guards

// to declare which type the possibleOrder is:

function isAnInternetOrder(order: PossibleOrders): order is InternetOrder {

  return order && "email" in order;

}

function isATelephoneOrder(order: PossibleOrders): order is TelephoneOrder {

  return order && "callerNumber" in order;

}

// Now we can use these functions in if statements to narrow

// down the type which possibleOrder is inside the if:

if (isAnInternetOrder(possibleOrder)) {

  console.log("Order received via email:", possibleOrder.email);

}

if (isATelephoneOrder(possibleOrder)) {

  console.log("Order received via phone:", possibleOrder.callerNumber);

}

// You can read more on code flow analysis here:

//

//  - example:code-flow

//  - example:type-guards

//  - example:discriminate-types

// Unknown

// Unknown is one of those types that once it clicks, you

// can find quite a lot of uses for it. It acts like a sibling

// to the any type. Where any allows for ambiguity - unknown

// requires specifics.

// A good example would be in wrapping a JSON parser. JSON

// data can come in many different forms and the creator

// of the json parsing function won't know the shape of the

// data - the person calling that function should.

const jsonParser = (jsonString: string) => JSON.parse(jsonString);

const myAccount = jsonParser(`{ "name": "Dorothea" }`);

myAccount.name;

myAccount.email;

// If you hover on jsonParser, you can see that it has the

// return type of any, so then does myAccount. It's possible

// to fix this with generics - but it's also possible to fix

// this with unknown.

const jsonParserUnknown = (jsonString: string): unknown => JSON.parse(jsonString);

const myOtherAccount = jsonParserUnknown(`{ "name": "Samuel" }`);

myOtherAccount.name;

// The object myOtherAccount cannot be used until the type has

// been declared to TypeScript. This can be used to ensure

// that API consumers think about their typing up-front:

type User = { name: string };

const myUserAccount = jsonParserUnknown(`{ "name": "Samuel" }`) as User;

myUserAccount.name;

// Unknown is a great tool, to understand it more read these:

// https://mariusschulz.com/blog/the-unknown-type-in-typescript

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type

// Never

// Because TypeScript supports code flow analysis, the language

// needs to be able to represent when code logically cannot

// happen. For example, this function cannot return:

const neverReturns = () => {

  // If it throws on the first line

  throw new Error("Always throws, never returns");

};

// If you hover on the type, you see it is a () => never

// which means it should never happen. These can still be

// passed around like other values:

const myValue = neverReturns();

// Having a function never return can be useful when dealing

// with the unpredictability of the JavaScript runtime and

// API consumers that might not be using types:

const validateUser = (user: User) => {

  if (user) {

​    return user.name !== "NaN";

  }

  // According to the type system, this code path can never

  // happen, which matches the return type of neverReturns.

  return neverReturns();

};

// The type definitions state that a user has to be passed in

// but there are enough escape valves in JavaScript whereby

// you can't guarantee that.

// Using a function which returns never allows you to add

// additional code in places which should not be possible.

// This is useful for presenting better error messages,

// or closing resources like files or loops.

// A very popular use for never, is to ensure that a

// switch is exhaustive. E.g., that every path is covered.

// Here's an enum and an exhaustive switch, try adding

// a new option to the enum (maybe Tulip?)

enum Flower {

  Rose,

  Rhododendron,

  Violet,

  Daisy,

}

const flowerLatinName = (flower: Flower) => {

  switch (flower) {

​    case Flower.Rose:

​      return "Rosa rubiginosa";

​    case Flower.Rhododendron:

​      return "Rhododendron ferrugineum";

​    case Flower.Violet:

​      return "Viola reichenbachiana";

​    case Flower.Daisy:

​      return "Bellis perennis";

​    default:

​      const _exhaustiveCheck: never = flower;

​      return _exhaustiveCheck;

  }

};

// You will get a compiler error saying that your new

// flower type cannot be converted into never.

// Never in Unions

// A never is something which is automatically removed from

// a type union.

type NeverIsRemoved = string | never | number;

// If you look at the type for NeverIsRemoved, you see that

// it is string | number. This is because it should never

// happen at runtime because you cannot assign to it.

// This feature is used a lot in example:conditional-types



// JavaScript has two ways to declare values which don't

// exist, and TypeScript adds extra syntax which allows even

// more ways to declare something as optional or nullable.

// First up, the difference between the two JavaScript

// primitives: undefined and null

// Undefined is when something cannot be found or set

const emptyObj = {};

const anUndefinedProperty: undefined = emptyObj["anything"];

// Null is meant to be used when there is a conscious lack

// of a value.

const searchResults = {

  video: { name: "LEGO Movie" },

  text: null,

  audio: { name: "LEGO Movie Soundtrack" },

};

// Why not use undefined? Mainly, because now you can verify

// that text was correctly included. If text returned as

// undefined then the result is the same as though it was

// not there.

// This might feel a bit superficial, but when converted into

// a JSON string, if text was an undefined, it would not be

// included in the string equivalent.

// Strict Null Types

// Before TypeScript 2.0 undefined and null were effectively

// ignored in the type system. This let TypeScript provide a

// coding environment closer to un-typed JavaScript.

// Version 2.0 added a compiler flag called "strictNullChecks"

// and this flag required people to treat undefined and null

// as types which needs to be handled via code-flow analysis

// ( see more at example:code-flow )

// For an example of the difference in turning on strict null

// checks to TypeScript, hover over "Potential String" below:

type PotentialString = string | undefined | null;

// The PotentialString discards the undefined and null. If

// you open the "TS Config" menu, enable strictNullChecks, and come

// back, you'll see that hovering on PotentialString now shows

// the full union.

declare function getID(): PotentialString;

const userID = getID();

console.log("User Logged in: ", userID.toUpperCase());

// Only in strict mode the above will fail ^

// There are ways to tell TypeScript you know more, such as

// a type assertion or via a non-null assertion operator (!)

const definitelyString1 = getID() as string;

const definitelyString2 = getID()!;

// Or you safely can check for the existence via an if:

if (userID) {

  console.log(userID);

}

// Optional Properties

// Void

// Void is the return type of a function which does not

// return a value.

const voidFunction = () => { };

const resultOfVoidFunction = voidFunction();

// This is usually an accident, and TypeScript keeps the void

// type around to let you get compiler errors - even though at

// runtime it would be an undefined.





// Enums are a feature added to JavaScript in TypeScript

// which makes it easier to handle named sets of constants.

// By default an enum is number based, starting at zero,

// and each option is assigned an increment by one. This is

// useful when the value is not important.

enum CompassDirection {

  North,

  East,

  South,

  West,

}

// By annotating an enum option, you set the value;

// increments continue from that value:

enum StatusCodes {

  OK = 200,

  BadRequest = 400,

  Unauthorized,

  PaymentRequired,

  Forbidden,

  NotFound,

}

// You reference an enum by using EnumName.Value

const startingDirection = CompassDirection.East;

const currentStatus = StatusCodes.OK;

// Enums support accessing data in both directions from key

// to value, and value to key.

const okNumber = StatusCodes.OK;

const okNumberIndex = StatusCodes["OK"];

const stringBadRequest = StatusCodes[400];

// Enums can be different types, a string type is common.

// Using a string can make it easier to debug, because the

// value at runtime does not require you to look up the number.

enum GamePadInput {

  Up = "UP",

  Down = "DOWN",

  Left = "LEFT",

  Right = "RIGHT",

}

// If you want to reduce the number of objects in your

// JavaScript runtime, you can create a const enum.

// A const enum's value is replaced by TypeScript during

// transpilation of your code, instead of being looked up

// via an object at runtime.

const enum MouseAction {

  MouseDown,

  MouseUpOutside,

  MouseUpInside,

}

const handleMouseAction = (action: MouseAction) => {

  switch (action) {

​    case MouseAction.MouseDown:

​      console.log("Mouse Down");

​      break;

  }

};

// If you look at the transpiled JavaScript, you can see

// how the other enums exist as objects and functions,

// however MouseAction is not there.

// This is also true for the check against MouseAction.MouseDown

// inside the switch statement inside handleMouseAction.

// Enums can do more than this, you can read more in the

// TypeScript handbook:

//

// https://www.typescriptlang.org/docs/handbook/enums.html