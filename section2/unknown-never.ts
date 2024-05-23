let userInput: unknown; // 型がチェックされるので、any型よりも安全
let userName: string;

userInput = 5;
userInput = "test";

if (typeof userInput === 'string') {
    userName = userInput;
}

// 絶対に戻り値を返すことがない
function generateError(message: string, code: number): never{
    throw { message: message, errorCode: code };
    // while (true) {}
}

const result = generateError("Errorが発生しました", 500)
console.log(result)

export {}
