abstract class Depertment {
    // private readonly id: string;
    // name: string;
    protected employees: string[] = [];

    static fiscalYear = 2024;

    // static method
    static createEmployee(name: string) {
        return { 'name': name };
    }

    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
    }

    abstract describe(this: Depertment): void;

    addEmployee(this: Depertment, employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepertment extends Depertment {
    constructor(id: string, private admins: string[]) {
        super(id, "IT");
    }

    describe(): void {
        console.log("IT部門 ID:" + this.id);
    }
}

class accountingDepartment extends Depertment {
    private lastReport: string;
    private static instance: accountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found.");
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error("Please pass in a valid value!");
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, "Accounting");
        this.lastReport = reports[0];
    }

    static getInstance() {
        // スタティックメソッドにおけるthisはクラス自身を表す
        if (this.instance) {
            return this.instance;
        }
        this.instance = new accountingDepartment("d2", []);
        return this.instance;
    }

    describe(): void {
        console.log("会計部門:" + this.id);
    }

    addReport(this: accountingDepartment, text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    addEmployee(name: string): void {
        if (name === "Max") {
            return;
        }
        this.employees.push(name);
    }
}


// 抽象クラスはインスタンス化不可
// const dept = new Depertment("d1", "Accounting");

const employee1 = Depertment.createEmployee("Max");
console.log(employee1);
console.log(Depertment.fiscalYear);

const it = new ITDepertment("d1", ["Max"]);
// console.log(it);
it.describe();

// it.name = "NEW NAME";

it.addEmployee("Max");
it.addEmployee("manu");
it.printEmployeeInformation();

console.log(it);

// シングルトンパターン
const accounting = accountingDepartment.getInstance();
const accounting2 = accountingDepartment.getInstance();
console.log(accounting, accounting2);

// setter
accounting.mostRecentReport = "Year End Report";
accounting.addReport("Something went wrong...");

// getter
console.log(accounting.mostRecentReport);

// accounting.printReports();

console.log(accounting);

accounting.addEmployee("Max");
accounting.addEmployee("manu");
// accounting.printEmployeeInformation();
accounting.describe();

// const accountingCopy = {'name': 'DUMMY', 'describe': it.describe};
// accountingCopy.describe();
