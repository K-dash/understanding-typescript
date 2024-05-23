// type AddFn = (a: number, b: number) => number;
interface AddFn {
    // 匿名メソッドが書かれていると同義
    (a: number, b: number): number
}

let add: AddFn;
add = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Named {
    /** readonlyをつけることで、このインターフェースを実装するクラスでは、
     * nameプロパティをコンストラクタで初期化する必要がある
     */
    readonly name?: string;
    // ?を指定するとなくてもOK
    outputName?: string;
}
interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name?: string;
    age: number = 30;
    constructor(n?: string) {
        // optionalにしたので、値が存在するかどうか判断する必要がある
        if (n) {
            this.name = n;
        }
    }
    greet(phrase: string): void {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        } else {
            console.log('Hi!');
        }
    }
}

// インターフェースの型を定義できる
let user1: Greetable;

user1 = new Person();
user1.greet("Hi there - I am");
console.log(user1);
