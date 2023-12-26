const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n');

const reindeerValues = {};
const processInput = (input) => {
    const regex = /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./;
    const match = input.match(regex);

    if (match) {
        const reindeer = match[1];
        const speed = parseInt(match[2]);
        const flyTime = parseInt(match[3]);
        const restTime = parseInt(match[4]);

        reindeerValues[reindeer] = { speed, flyTime, restTime };
    }
}
data.forEach(row => processInput(row));

// * Part 1
const calculateDistance = (reindeer, time) => {
    const { speed, flyTime, restTime } = reindeerValues[reindeer];

    const cycleTime = flyTime + restTime;
    const cycles = Math.floor(time / cycleTime);
    const remainingTime = time % cycleTime;
    const remainingFlyTime = Math.min(remainingTime, flyTime);

    return (cycles * flyTime + remainingFlyTime) * speed;
}

const reindeerDistances = {};
Object.keys(reindeerValues).forEach(reindeer => {
    reindeerDistances[reindeer] = calculateDistance(reindeer, 2503);
});

Object.values(reindeerDistances).sort((a, b) => b - a);
console.log("Part 1 - max distance: ", Object.entries(reindeerDistances)[0]);

// * Part 2
const reindeerPoints = {};
const reindeerDistancesArray = {};

Object.keys(reindeerValues).forEach(reindeer => {
    reindeerPoints[reindeer] = 0;
    reindeerDistancesArray[reindeer] = [];
})

for (let i = 0; i < 2503; i++) {
    Object.keys(reindeerValues).forEach(reindeer => {
        reindeerDistancesArray[reindeer].push(calculateDistance(reindeer, i + 1));
    })
}

for (let i = 0; i < 2503; i++) {
    const maxDistance = Math.max(...Object.values(reindeerDistancesArray).map(arr => arr[i]));
    const reindeersWithMaxDistance = Object.keys(reindeerDistancesArray).find(reindeer => reindeerDistancesArray[reindeer][i] === maxDistance);

    reindeerPoints[reindeersWithMaxDistance]++;
}
console.log(Object.values(reindeerPoints).sort((a, b) => b - a)[0]);