/** tsconfig.jsonで`lib`を指定していないので、
 * `target`に指定したバージョンで使えるライブラリはすべて使える状態になる
 */
let appleId = 'abc';
const button = document.querySelector('button')!;


function add(n1: number, n2:number) {
    if (n1 + n1 > 0) {
        return n1 + n2;
    }
    return;
}

function clickHandler(message: string) {
    // let userName = 'Max';
    console.log("Clicked! " + message);
}

button.addEventListener('click', clickHandler.bind(null, "test"));
