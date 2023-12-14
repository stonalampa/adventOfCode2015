const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n')


const vowels = ['a', 'e', 'i', 'o', 'u'];
const disallowedStrings = ['ab', 'cd', 'pq', 'xy'];
const part1 = () => {
    let sum = 0;
    data.forEach(element => {
        const splitElements = element.split("");
        let numVowels = 0;
        let correctDoubleLetter = false;
        let noDisallowedStrings = true;
        splitElements.forEach((letter, i) => {
            if (vowels.includes(letter)) {
                numVowels++;
            }

            if (letter === splitElements[i + 1]) {
                correctDoubleLetter = true;
            }

            if (disallowedStrings.includes(letter + splitElements[i + 1])) {
                noDisallowedStrings = false;
            }
        });

        if (numVowels > 2 && correctDoubleLetter && noDisallowedStrings) {
            sum++;
        }
    });
    console.log("Part 1 - Total nice strings:", sum);
}

const part2 = () => {
    const isValid = (str) => {
        const hasRepeatingPair = /(\w\w).*\1/.test(str);
        const hasRepeatingWithOneBetween = /(\w).\1/.test(str);

        return hasRepeatingPair && hasRepeatingWithOneBetween;
    };

    let sum = 0;
    data.forEach((str) => {
        if (isValid(str)) {
            sum++;
        }
    });

    console.log("Part 2 - Total nice strings:", sum);
}

part1();
part2();