type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(
//   input1: number | string, // Union型
//   input2: number | string, // Union型
//   resultConversion: "as-number" | "as-text" // Literal型
  input1: Combinable,   // alias型
  input2: Combinable,
  resultConversion: ConversionDescriptor,   // alias型
) {
  let result;
  if (
    // Union型の値を評価するために、ランタイム上でtypeofを使って分岐させる
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
  // if (resultConversion === 'as-number') {
  //     return +result;
  // } else {
  //     return result.toString();
  // }
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);

export {};
