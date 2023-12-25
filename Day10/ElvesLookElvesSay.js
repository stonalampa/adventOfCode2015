const input = "1113222113";

const recursion = (input, counter, counterLimit) => {
    if (counter === counterLimit) {
        console.log(input.length);
        return;
    }

    const arrayOfStringsFromInput = input.split('');
    let localInc = 0;
    let fullString = '';

    for (let i = 0; i < arrayOfStringsFromInput.length; i++) {
        if (arrayOfStringsFromInput[i] !== arrayOfStringsFromInput[i + 1]) {
            fullString += `${localInc + 1}${arrayOfStringsFromInput[i]}`
            localInc = 0;
        } else {
            localInc++;
        }
    }

    part1(fullString, counter + 1);
}

recursion(input, 0, 40);
recursion(input, 0, 50);
