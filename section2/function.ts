function addTest(n1: number, n2: number) {
    return n1 + n2;
}

function printResult2(num: number): void {
    console.log('Result: ' + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

addAndHandle(10, 20, (result) => {
    console.log(result);
});

let combineValues: (n1: number, n2: number) => number;

combineValues = addTest;
// combineValues = printResult2;
console.log(combineValues(8, 8));


printResult2(addTest(5, 12));

export {};
