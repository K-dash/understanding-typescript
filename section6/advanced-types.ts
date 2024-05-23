type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// interface ElevatedEmployee extends Admin, Employee {}

// 交差型
type ElevatedEmployee = Admin & Employee;

const el: ElevatedEmployee = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date(),
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// 関数オーバーロード
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add("'Hello'", "World");
result.split(" ");

// Optional chaining
const fetchedUserData = {
    id: "u1",
    name: "Max",
    job: {
        title: "CEO",
        description: "My own company"
    },
};

// 先頭から存在しているかどうかを判断する
console.log(fetchedUserData?.job?.title);


// Null合体演算子
// const userInput = null;
const userInput = '';

// null or undefined の場合、??の右側の値を返す
const storedData = userInput ?? "DEFAULT";

console.log(storedData);


type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(emp.name);
    // 型ガード
    if ('privileges' in emp) {
        console.log("Privileges: " + emp.privileges);
    }
    // 型ガード
    if ('startDate' in emp) {
        console.log("StartDate: " + emp.startDate);
    }
}

printEmployeeInformation({ name: "manu", startDate: new Date() });

class Car {
    drive() {
        console.log("Driving...");
    }
}

class Truck {
    drive() {
        console.log("Driving a truck...");
    }

    loadCargo(amount: number) {
        console.log("Loading cargo..." + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // if ('loadCargo' in vehicle) {
    // クラスでの型ガード
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);


// Discriminated Unions
interface Bird {
    // 共通の識別可能なプロパティを定義する（これはリテラル）
    hoge: "bird";
    flyingSpeed: number;
}

interface Horse {
    // 共通の識別可能なプロパティを定義する（これはリテラル）
    hoge: "horse";
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.hoge) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
    }
    console.log("Moving at speed: " + speed);
}

console.log(moveAnimal({ hoge: "bird", flyingSpeed: 10 }));



// 型キャスト
// 1. キャスト対象の前に<>をつける
// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;

// 2. asをつける（JSXなどで使用する場合、競合してしまうので）
// エクスクラメーションマーク（!）は、返す値がNullではないことをTypeScriptに伝える仕組み
// const userInputElement = document.getElementById("user-input")!;
const userInputElement = document.getElementById("user-input");
// userInputElement.value = 'こんにちは';

// 3. nullかどうかを確認した後にキャストする
if (userInputElement) {
    // キャスト式を()で囲む
    (userInputElement as HTMLInputElement).value = 'こんにちは';
}


// index型
interface ErrorContainer { // { email: '正しいメールアドレスを入力してください', username: 'ユーザー名を入力してください' }
    [prop: string]: string;
}


const errorBag: ErrorContainer = {
    // stringに変換できるので、numberでもOK
    1: "正しいメールアドレスを入力してください",
    username: "ユーザー名を入力してください",
};
