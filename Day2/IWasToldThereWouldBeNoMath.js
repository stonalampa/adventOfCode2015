const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n')

const part1 = () => {
    let sum = 0;
    data.forEach(element => {
        const [l, w, h] = element.split('x');
        const side1 = 2 * l * w;
        const side2 = 2 * w * h;
        const side3 = 2 * h * l;
        const slack = Math.min(side1, side2, side3) / 2; // * dividing with 2 because we have times 2 for each side
        sum += side1 + side2 + side3 + slack;
    })
    console.log("Part 1 - Total square feet:", sum);
}

const part2 = () => {
    let sum = 0;
    data.forEach(element => {
        const [l, w, h] = element.split('x'); // * each element is a string
        const sorted = [l, w, h].sort((a, b) => a - b); // * sort ascending
        const bow = l * w * h;
        const ribbon = 2 * sorted[0] + 2 * sorted[1];
        sum += bow + ribbon;
    })
    console.log("Part 2 - Total ribbon:", sum);
}

part1();
part2();