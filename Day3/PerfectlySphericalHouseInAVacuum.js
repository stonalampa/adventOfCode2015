const { dataImporter } = require('../DataImporter');
const data = dataImporter('')

const houseCoordinates1 = new Map();
const houseCoordinates2 = new Map();

const checkMap = (newPosition, map) => {
    const key = newPosition.toString();
    if (!map.has(key)) {
        map.set(key, true);
    }
};

const move = (elem, currentPosition) => {
    if (elem === "^") {
        currentPosition[0]--;
    } else if (elem === "v") {
        currentPosition[0]++;
    } else if (elem === "<") {
        currentPosition[1]--;
    } else if (elem === ">") {
        currentPosition[1]++;
    }
}


const part1 = () => {
    let currentPosition = [0, 0];
    checkMap(currentPosition, houseCoordinates1);

    data.forEach((elem) => {
        move(elem, currentPosition);

        checkMap([...currentPosition], houseCoordinates1);
    });

    console.log("Part 1 - Number of houses:", houseCoordinates1.size);
};


const part2 = () => {
    let currentPosition1 = [0, 0];
    let currentPosition2 = [0, 0];
    checkMap(currentPosition1, houseCoordinates2);

    data.forEach((elem, index) => {
        if (index % 2 === 0) {
            move(elem, currentPosition1);
            checkMap([...currentPosition1], houseCoordinates2);
        }

        if (index % 2 !== 0) {
            move(elem, currentPosition2);
            checkMap([...currentPosition2], houseCoordinates2);
        }
    });

    console.log("Part 2 - Number of houses:", houseCoordinates2.size);
}

part1();
part2();