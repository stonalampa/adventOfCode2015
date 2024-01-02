const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n');

const calculate = (initialRegisters) => {
    let registers = { ...initialRegisters };

    let i = 0;
    while (i >= 0 && i < data.length) {
        const simpleMatch = /^(hlf|tpl|inc) (a|b)$/.exec(data[i]);
        const jumpMatch = /^(jmp|jie|jio)(?: (a|b),)? ([+-]\d+)$/.exec(data[i]);

        if (simpleMatch) {
            const register = simpleMatch[2];
            if (simpleMatch[1] === 'hlf') {
                registers[register] /= 2;
            } else if (simpleMatch[1] === 'tpl') {
                registers[register] *= 3;
            } else if (simpleMatch[1] === 'inc') {
                registers[register] += 1;
            }

            i++;

        } else if (jumpMatch) {
            const offset = parseInt(jumpMatch[3]);
            if (jumpMatch[1] === 'jmp') {
                i += offset;
            } else if (jumpMatch[1] === 'jie') {
                if (registers[jumpMatch[2]] % 2 === 0) {
                    i += offset;
                } else {
                    i++;
                }
            } else if (jumpMatch[1] === 'jio') {
                if (registers[jumpMatch[2]] === 1) {
                    i += offset;
                } else {
                    i++;
                }
            }
        }
    }

    return registers.b;
}

console.log('Part 1 - Value in register b:', calculate({ a: 0, b: 0, pc: 0 }));
console.log('Part 2 - Value in register b:', calculate({ a: 0, b: 1, pc: 0 }));
