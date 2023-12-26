const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n');

const shouldTurnOn = (matrix, i, j) => {
    let turnedOnNeighbors = 0;
    const isValidCell = (row, col) => row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length;

    if (isValidCell(i - 1, j) && matrix[i - 1][j] === '#') {
        turnedOnNeighbors++;
    }

    if (isValidCell(i + 1, j) && matrix[i + 1][j] === '#') {
        turnedOnNeighbors++;
    }

    if (isValidCell(i, j - 1) && matrix[i][j - 1] === '#') {
        turnedOnNeighbors++;
    }

    if (isValidCell(i, j + 1) && matrix[i][j + 1] === '#') {
        turnedOnNeighbors++;
    }

    if (isValidCell(i - 1, j - 1) && matrix[i - 1][j - 1] === '#') {
        turnedOnNeighbors++;
    }

    if (isValidCell(i + 1, j + 1) && matrix[i + 1][j + 1] === '#') {
        turnedOnNeighbors++;
    }

    if (isValidCell(i - 1, j + 1) && matrix[i - 1][j + 1] === '#') {
        turnedOnNeighbors++;
    }

    if (isValidCell(i + 1, j - 1) && matrix[i + 1][j - 1] === '#') {
        turnedOnNeighbors++;
    }

    if (matrix[i][j] === '#') {
        if (turnedOnNeighbors === 2 || turnedOnNeighbors === 3) {
            return true;
        }
    } else {
        if (turnedOnNeighbors === 3) {
            return true;
        }
    }

    return false;
}

// * Part 1
let inputMatrix1 = [];
for (let i = 0; i < data.length; i++) {
    inputMatrix1.push([]);
    for (let j = 0; j < data[i].length; j++) {
        inputMatrix1[i].push(data[i][j]);
    }
}

const animate = (matrix) => {
    const newMatrix = Array.from({ length: matrix.length }, () => []);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            shouldTurnOn(matrix, i, j)
                ? (newMatrix[i][j] = '#')
                : (newMatrix[i][j] = '.');
        }
    }

    return newMatrix;
}

let stepIterator1 = 0;
while (stepIterator1 < 100) {
    inputMatrix1 = animate(inputMatrix1);
    stepIterator1++;
}

let counter1 = 0;
for (let i = 0; i < inputMatrix1.length; i++) {
    for (let j = 0; j < inputMatrix1[i].length; j++) {
        if (inputMatrix1[i][j] === '#') {
            counter1++;
        }
    }
}

console.log("Part 1 - total number of lights on:", counter1);


// * Part 2
let inputMatrix2 = [];
for (let i = 0; i < data.length; i++) {
    inputMatrix2.push([]);
    for (let j = 0; j < data[i].length; j++) {
        inputMatrix2[i].push(data[i][j]);
    }
}
inputMatrix2[0][0] = '#';
inputMatrix2[0][inputMatrix2[0].length - 1] = '#';
inputMatrix2[inputMatrix2.length - 1][0] = '#';
inputMatrix2[inputMatrix2.length - 1][inputMatrix2[0].length - 1] = '#';

const animate2 = (matrix) => {
    const newMatrix = Array.from({ length: matrix.length }, () => []);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            shouldTurnOn(matrix, i, j)
                ? (newMatrix[i][j] = '#')
                : (newMatrix[i][j] = '.');
        }
    }

    newMatrix[0][0] = '#';
    newMatrix[0][newMatrix[0].length - 1] = '#';
    newMatrix[newMatrix.length - 1][0] = '#';
    newMatrix[newMatrix.length - 1][newMatrix[0].length - 1] = '#';
    return newMatrix;
}

let stepIterator2 = 0;
while (stepIterator2 < 100) {
    inputMatrix2 = animate2(inputMatrix2);
    stepIterator2++;
}

let counter2 = 0;
for (let i = 0; i < inputMatrix2.length; i++) {
    for (let j = 0; j < inputMatrix2[i].length; j++) {
        if (inputMatrix2[i][j] === '#') {
            counter2++;
        }
    }
}

console.log("Part 2 - total number of lights on:", counter2);