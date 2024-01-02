const input = 34000000;

const part1 = () => {
    let houseNumber = 1;
    let totalPresents = 0;

    while (totalPresents < input) {
        totalPresents = 0;
        for (let i = 1; i <= Math.sqrt(houseNumber); i++) {
            if (houseNumber % i === 0) {
                totalPresents += i * 10;
                if (i !== houseNumber / i) {
                    totalPresents += (houseNumber / i) * 10;
                }
            }
        }

        houseNumber++;
    }

    console.log("Part 1 - House number: " + (houseNumber - 1));
}

const part2 = () => {
    let houseNumber = 1;
    let totalPresents = 0;

    while (totalPresents < input) {
        totalPresents = 0;
        for (let i = 1; i <= Math.sqrt(houseNumber) && i <= 50; i++) {
            if (houseNumber % i === 0) {
                totalPresents += i * 11;
                if (i !== houseNumber / i) {
                    totalPresents += (houseNumber / i) * 11;
                }
            }
        }

        houseNumber++;
    }

    console.log("Part 2 - House number: " + (houseNumber - 1));
}

part1();
part2();

// * Sqrt optimization is done to reduce the number of iterations
// * If a number is divisible by i, then it is also divisible by n/i