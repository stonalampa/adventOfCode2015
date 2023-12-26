const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n');

const mappedData = {};
const mapInput = (input) => {
    const regex = /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;

    if (regex.test(input)) {
        const match = input.match(regex);
        mappedData[match[1].toLowerCase()] = {
            capacity: parseInt(match[2]),
            durability: parseInt(match[3]),
            flavor: parseInt(match[4]),
            texture: parseInt(match[5]),
            calories: parseInt(match[6])
        }
    }
}
data.forEach(mapInput);

const arrayOfCombos = () => {
    const array = [
        [0, 0, 0, 100],
        [0, 0, 100, 0],
        [0, 100, 0, 0],
        [100, 0, 0, 0]
    ];
    let counter = 4;
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            for (let k = 0; k < 100; k++) {
                for (let l = 0; l < 100; l++) {
                    if (i + j + k + l === 100) {
                        array.push([i, j, k, l])
                        counter++;
                    }
                }
            }
        }
    }

    return array;
}

const determineIngredient = (index) => {
    switch (index) {
        case 0:
            return 'frosting';
        case 1:
            return 'candy';
        case 2:
            return 'butterscotch';
        case 3:
            return 'sugar';
        default:
            return 'error';
    }
}

const calculateScore = (array, checkCalories) => {
    let maxScore = 0;

    array.forEach(element => {
        let capacity = 0;
        let durability = 0;
        let flavor = 0;
        let texture = 0;
        let calories = 0;

        element.forEach((amount, index) => {
            if (amount === 0) return;
            const ingredient = determineIngredient(index);
            capacity += amount * mappedData[ingredient].capacity;
            durability += amount * mappedData[ingredient].durability;
            flavor += amount * mappedData[ingredient].flavor;
            texture += amount * mappedData[ingredient].texture;
            calories += amount * mappedData[ingredient].calories;
        });

        let score = 0;
        if (checkCalories) {
            score = [capacity, durability, flavor, texture, calories].some(
                (value) => value < 0) || calories !== 500
                ? 0
                : capacity * durability * flavor * texture;
        } else {
            score = [capacity, durability, flavor, texture, calories].some(
                (value) => value < 0)
                ? 0
                : capacity * durability * flavor * texture;
        }

        if (score > maxScore) maxScore = score;
    });

    return maxScore;
}

console.log("Part 1 - total score:", calculateScore(arrayOfCombos(), false));
console.log("Part 2 - total score:", calculateScore(arrayOfCombos(), true));