const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n');

const part1 = (data) => {
    let sum = 0;
    if (Array.isArray(data)) {
        data.forEach((value) => {
            sum += part1(value);
        });
    } else if (typeof data === 'object') {
        Object.values(data).forEach((value) => {
            sum += part1(value);
        });
    } else if (typeof data === 'number') {
        sum += data;
    }

    return sum;
};

const part2 = (data) => {
    let sum = 0;

    if (Array.isArray(data)) {
        data.forEach((value) => {
            sum += part2(value);
        });
    } else if (typeof data === 'object') {
        if (Object.values(data).includes('red')) {
            return 0;
        } else {
            Object.values(data).forEach((value) => {
                sum += part2(value);
            });
        }
    } else if (typeof data === 'number') {
        sum += data;
    }

    return sum;
};

console.log(part1(JSON.parse(data)));
console.log(part2(JSON.parse(data)));