const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n')

const returnValuesFromInput = (element) => {
    const regex = /^(turn on|turn off|toggle) (\d+,\d+) through (\d+,\d+)$/;
    const matches = element.match(regex);

    if (matches) {
        const [_, action, start, end] = matches;
        return { action, start, end };
    }
}

const part1 = () => {
    const matrix = Array.from({ length: 1000 }, () => Array(1000).fill(0));
    data.forEach(element => {
        const { action, start, end } = returnValuesFromInput(element);
        const [x, y] = start.split(',').map(Number);
        const [z, w] = end.split(',').map(Number);

        for (let i = x; i <= z; i++) {
            for (let j = y; j <= w; j++) {
                if (action === 'turn on' && matrix[i][j] !== 1) {
                    matrix[i][j] = 1;
                } else if (action === 'turn off' && matrix[i][j] !== 0) {
                    matrix[i][j] = 0;
                } else if (action === 'toggle') {
                    matrix[i][j] = matrix[i][j] === 1 ? 0 : 1;
                }
            }
        }
    });

    const sum = matrix.reduce((acc, row) => acc + row.reduce((rowSum, cell) => rowSum + cell, 0), 0);

    console.log("Part 1 - Number of lights:", sum);
}

const part2 = () => {
    const matrix = Array.from({ length: 1000 }, () => Array(1000).fill(0));
    data.forEach(element => {
        const { action, start, end } = returnValuesFromInput(element);
        const [x, y] = start.split(',').map(Number);
        const [z, w] = end.split(',').map(Number);

        for (let i = x; i <= z; i++) {
            for (let j = y; j <= w; j++) {
                if (action === 'turn on') {
                    matrix[i][j]++;
                } else if (action === 'turn off' && matrix[i][j] > 0) {
                    matrix[i][j]--;
                } else if (action === 'toggle') {
                    matrix[i][j] += 2;
                }
            }
        }
    });

    const sum = matrix.reduce((acc, row) => acc + row.reduce((rowSum, cell) => rowSum + cell, 0), 0);

    console.log("Part 2 - Total brightness of lights:", sum);
}

part1();
part2();