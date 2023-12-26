const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n');

const baselineValues = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
}

const mapInput = (input) => {
    const regex = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/;
    if (regex.test(input)) {
        const match = input.match(regex);
        const sue = match[1];
        const firstItem = match[2];
        const firstValue = match[3];
        const secondItem = match[4];
        const secondValue = match[5];
        const thirdItem = match[6];
        const thirdValue = match[7];

        const sueObject = {
            number: sue,
            [firstItem]: parseInt(firstValue),
            [secondItem]: parseInt(secondValue),
            [thirdItem]: parseInt(thirdValue)
        }
        return sueObject;
    }

}

data.map(mapInput).forEach((sue) => {
    let correctSue = true;
    Object.keys(sue).forEach((key) => {
        if (key === 'number') return;
        if (sue[key] !== baselineValues[key]) {
            correctSue = false;
        }
    })

    if (correctSue) {
        console.log("Part 1 - Sue:", sue);
    }
})

data.map(mapInput).forEach((sue) => {
    let correctSue = true;
    Object.keys(sue).forEach((key) => {
        if (key === 'number') return;
        if (key === 'cats' || key === 'trees') {
            if (sue[key] && sue[key] <= baselineValues[key]) {
                correctSue = false;
            }
        }
        else if (key === 'pomeranians' || key === 'goldfish') {
            if (sue[key] && sue[key] >= baselineValues[key]) {
                correctSue = false;
            }
        }
        else if (sue[key] !== baselineValues[key]) {
            correctSue = false;
        }
    })

    if (correctSue) {
        console.log("Part 2 - Sue:", sue);
    }
})
