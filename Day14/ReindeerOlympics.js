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

console.log("Part 1 - max distance:",
    Object.entries(reindeerDistances)
        .sort((a, b) => b[1] - a[1])[0]);

// * Part 2
const determineIfFlying = (reindeer, second) => {
    const { flyTime, restTime } = reindeerValues[reindeer];
    const cycleTime = flyTime + restTime;
    const remainingTime = second % cycleTime;
    const isFlying = remainingTime < flyTime;
    return isFlying;
};

const calculateDistanceBySecond = (reindeer, timeInSeconds = 2503) => {
    const { speed } = reindeerValues[reindeer];
    const distances = [];
    let distance = 0;
    for (let i = 0; i < timeInSeconds; i++) {
        if (determineIfFlying(reindeer, i)) {
            distance += speed;
        }
        distances.push(distance);
    }
    return distances;
};

const reindeerDistancesBySeconds = {}
Object.keys(reindeerValues).forEach(reindeer => {
    reindeerDistancesBySeconds[reindeer] = calculateDistanceBySecond(reindeer);
});

const reindeerPoints = {};
for (let i = 0; i < 2503; i++) {
    const distances = Object.keys(reindeerValues).map(reindeer => reindeerDistancesBySeconds[reindeer][i]);
    const maxDistance = Math.max(...distances);
    const reindeerWithMaxDistance = Object.keys(reindeerValues).filter(reindeer => reindeerDistancesBySeconds[reindeer][i] === maxDistance);
    reindeerWithMaxDistance.forEach(reindeer => {
        reindeerPoints[reindeer] ? reindeerPoints[reindeer]++ : reindeerPoints[reindeer] = 1;
    });
}

console.log("Part 2 - max points:",
    Object.entries(reindeerPoints)
        .sort((a, b) => b[1] - a[1])[0]);