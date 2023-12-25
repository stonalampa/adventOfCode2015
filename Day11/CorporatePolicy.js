const checkInput = (pass) => {
    // * 1st condition
    if (pass.some(char => ['i', 'o', 'l'].includes(char))) {
        return false;
    }

    // * 2nd and 3rd conditions
    let hasThreeInARow = false;
    for (let index = 0; index < pass.length - 2; index++) {
        const num = pass[index].charCodeAt(0) - 96;
        if (num + 1 === pass[index + 1].charCodeAt(0) - 96 && num + 2 === pass[index + 2].charCodeAt(0) - 96) {
            hasThreeInARow = true;
            break;
        }
    }

    if (!hasThreeInARow) {
        return false;
    }

    let pairOfNonOverlappingLetters = 0;
    for (let index = 0; index < pass.length - 1; index++) {
        if (pass[index] === pass[index + 1]) {
            pairOfNonOverlappingLetters++;
            index++;
        }
    }

    if (pairOfNonOverlappingLetters < 2) {
        return false;
    }

    return true;
};

const increasePass = (pass) => {
    for (let i = pass.length - 1; i >= 0; i--) {
        if (pass[i] == 'z') {
            pass[i] = 'a';
        } else {
            pass[i] = String.fromCharCode(pass[i].charCodeAt(0) + 1);
            break;
        }
    }
};

// * part 1
let arrayOfChars = "cqjxjnds".split('');
while (!checkInput(arrayOfChars.slice())) {
    increasePass(arrayOfChars);
}
console.log(arrayOfChars.join(''));

// * part 2
while (!checkInput(arrayOfChars) && arrayOfChars.join('') !== 'cqjxxyzz'); {
    increasePass(arrayOfChars)
}
console.log(arrayOfChars.join(''));