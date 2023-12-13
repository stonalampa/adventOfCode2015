const crypto = require('crypto');

function part1(secretKey) {
    let number = 1;

    while (true) {
        const inputString = `${secretKey}${number}`;
        const hash = crypto.createHash('md5').update(inputString).digest('hex');
        if (hash.startsWith('00000')) {
            return number;
        }
        number++;
    }
}

function part2(secretKey) {
    let number = 346386; // * I will start from the solution of part 1

    while (true) {
        const inputString = `${secretKey}${number}`;
        const hash = crypto.createHash('md5').update(inputString).digest('hex');
        if (hash.startsWith('000000')) {
            return number;
        }
        number++;
    }
}

const secretKey = 'iwrupvqb';

const result1 = part1(secretKey);
console.log(`Number: ${result1}\nHash: ${crypto.createHash('md5').update('iwrupvqb' + result1).digest('hex')}`)

const result2 = part2(secretKey);
console.log(`Number: ${result2}\nHash: ${crypto.createHash('md5').update('iwrupvqb' + result2).digest('hex')}`)