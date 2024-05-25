function Logger(logString: string) {
    console.log("1. Loggerファクトリ表示");
    // デコレータファクトリーは、匿名の関数を定義し、関数内に処理を記述する
    return function (constructor: Function) {
        console.log("4. Loggerデコレータを表示");
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    console.log("2. Templateファクトリを表示");
    /**
     * デコレータは通常、クラスが定義されたときに実行されるが、
     * 以下のようにするとクラスがインスタンス化されたときに実行できる
     */
    return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log("3. Templateデコレータを表示");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

// 複数デコレータ
// デコレータファクトリは上から順に実行されるが、デコレータ自体はは下から順に実行される
@Logger("Logging - Person")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
    name = "Max";
    constructor() {
        console.log("Personオブジェクトを作成中。。。");
    }
}

const pers = new Person();

console.log(pers);

// ---

// property decorator
// 第一引数：prototype
// 第二引数：propertyの名前
// このデコレータが呼ばれるタイミングは、Javascriptでクラス定義が登録された際に呼ばれる
// インスタンス化のタイミングではない
function Log(target: any, propertyName: string | Symbol) {
    console.log("Log: PropertyDecorator");
    console.log(target, propertyName);
}

// プロパティデコレータ
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Log2: AccessorDecorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// メソッドデコレータ
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log("Log3: MethodDecorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// パラメータデコレータ
function Log4(target: any, name: string | Symbol, position: number) {
    console.log("Log4: ParameterDecorator");
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    // プロパティデコレータ
    @Log
    title: string;
    private _price: number;

    @Log2
    set Price(val: number) {
        if (val > 0) {
            this._price = val
        } else {
            throw new Error('Invalid price - should be positive!');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);

// メソッドデコレータで戻り値を返す
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalConstructor = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalConstructor.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}

class Printer {
    message = "クリックしました";

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

/// ---

interface ValidatorConfig {
    [prop: string]: {
        [validatableProp: string]: string[] // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [
            ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
            "required",
        ],
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [
            ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
            "positive",
        ],
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;
    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;
    const title = titleEl.value;
    const price = +priceEl.value;
    const course = new Course(title, price);
    if (!validate(course)) {
        alert('Invalid input, please try again!');
    } else {
        console.log(course);
    }
})
