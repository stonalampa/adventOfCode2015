// * INPUT
// * "To continue, please consult the code grid in the manual.
// * Enter the code at row 3010, column 3019."

function getCode(row, col) {
    let code = 20151125;
    const multiplier = 252533;
    const divisor = 33554393;
    const steps = (row + col - 2) * (row + col - 1) / 2 + col - 1;

    for (let i = 0; i < steps; i++) {
        code = (code * multiplier) % divisor;
    }

    return code;
}

console.log("Code: ", getCode(3010, 3019));