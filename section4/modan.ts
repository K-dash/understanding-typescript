const userName = 'Max';
let age = 20;
age = 29;

// function add(a: number, b: number) {
//     let result;
//     result = a + b;
//     return result;
// }

// const add = (a: number, b: number) => {
//     return a + b;
// };

// const add = (a: number, b: number) => a + b;

// const printOutput: (output: string | number) => void = output => {
//     console.log(output);
// }

// printOutput(add(2, 5));

// if (age > 10) {
//     let result = true;
// }

// console.log(result)

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking', ...hobbies];
// console.log(hobbies[0]);

activeHobbies.push(...hobbies);
console.log(activeHobbies);

const person = {
    name : 'Max',
    age: 30
};

// spread operator
const copiedPerson = {
    ...person,
};

person.name = 'Manu';
console.log('copiedPerson', copiedPerson);
console.log('person', person);


// Rest Parameters
const add = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};

const ret = add(1, 2, 3, 4.5, 5, 6);
