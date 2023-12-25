const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n');

// const hexChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f'];

const part1 = () => {
    let totalNumOfChars = 0;
    let totalNumOfCharsInMemory = 0;

    data.forEach(line => {
        totalNumOfChars += line.length;
        totalNumOfCharsInMemory += eval(line).length;

        // * Almost done, it has some edge cases I am not 100% certain which ones
        // for (let i = 1; i < line.length - 1; i++) {
        //     if (line[i] !== 'x' && line[i] !== '\\') {
        //         totalNumOfCharsInMemory++;
        //     } else if (line[i] === '\\') {
        //         if (line[i + 1] !== 'x' && line[i + 1] !== '\\') {
        //             totalNumOfCharsInMemory++;
        //             i++;
        //         }
        //     } else {
        //         if (line[i - 1] === '\\') {
        //             // This is definitely hex
        //             if (hexChars.includes(line[i + 1])) {
        //                 if (hexChars.includes(line[i + 2])) {
        //                     i += 3;
        //                 } else {
        //                     i += 2;
        //                 }
        //                 totalNumOfCharsInMemory++;
        //             }
        //         } else {
        //             totalNumOfCharsInMemory++;
        //         }
        //     }
        // }
    });

    console.log("Difference between totalNumOfChars and totalNumOfCharsInMemory is:", totalNumOfChars - totalNumOfCharsInMemory);
};

const part2 = () => {
    let totalNumOfChars = 0;
    let totalNumOfEncodedChars = 0;
    data.forEach(line => {
        totalNumOfChars += line.length;
        console.log(JSON.stringify(line));
        totalNumOfEncodedChars += JSON.stringify(line).length;
    });
    console.log("Difference between totalNumOfChars and totalNumOfEncodedChars is:", totalNumOfEncodedChars - totalNumOfChars);
}

part1();
part2();
