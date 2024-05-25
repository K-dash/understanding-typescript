const names: Array<string> = [];
// const names: string[] = [];

// const promise: Promise<number> = new Promise(
//     function(resolve, reject){
//         setTimeout(function(){
//             resolve(10);
//         }, 2000)
//     });

// const promise: Promise<number> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(10);
//     }, 2000);
// });

// promise.then(data => {
//     data.toString();
// });

function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
// console.log(merge({name: "Max"}, {age: 30}));

const mergeObj = merge({ name: "Max", hobbieis: ["Sports", "Cooking"] }, { age: 30 });
console.log(mergeObj);


interface lengthy {
    length: number;
}
function countAndDescribe<T extends lengthy>(element: T): [T, string] {
    let descriptionText = "値がありません";
    if (element.length > 0) {
        descriptionText = "値は" + element.length + "個あります";
    }
    return [element, descriptionText];
}

console.log(countAndDescribe(["Sports", "Cooking"]));

// keyofを指定すると、Tのkeyの型であることを保証できる
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return "Value: " + obj[key];
}

extractAndConvert({ "name": "Max" }, "name");


class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            console.log("削除する値がありません")
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // -1
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(3);
numberStorage.addItem(10);
numberStorage.removeItem(3);
console.log(numberStorage.getItems());

// const objStorage = new DataStorage<object>();
// const obj = { name: "Max" };
// objStorage.addItem(obj);
// objStorage.addItem({ name: "Manu" });
// objStorage.removeItem(obj);
// console.log(objStorage.getItems());


interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

// Partial Generic
function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    // Partialを使うことにより、オブジェクトの型をOptionalにできるので空のオブジェクトを作成できる
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    // 最後にキャストして返す
    return courseGoal as CourseGoal;
}

// Reeaonly Generic
const namess: Readonly<string[]> = ["max", "anna"];
// namess.push("Max");
