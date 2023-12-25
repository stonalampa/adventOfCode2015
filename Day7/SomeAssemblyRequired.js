const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n')

const wires = {};
function Wire(instruction) {
    this.calculate = this.generateValueGetter(instruction);
}

Wire.prototype.getValue = function () {
    if (this.value === undefined) {
        this.value = this.calculate();
    }
    return this.value;
};

Wire.prototype.generateValueGetter = function (instruction) {
    let assignMatch, opMatch;

    if (assignMatch = /^(NOT )?([0-9]+|[a-z]+)$/.exec(instruction)) {
        return function () {
            let value = parseValue(assignMatch[2]);
            if (assignMatch[1])
                value = ~value;
            return value;
        }
    } else if (opMatch = /^([a-z]+|[0-9]+) (AND|OR|LSHIFT|RSHIFT) ([a-z]+|[0-9]+)$/.exec(instruction)) {
        let opCode = this.ops[opMatch[2]];

        return function () {
            return eval(parseValue(opMatch[1]) + ' ' + opCode + ' ' + parseValue(opMatch[3]));
        }

    }
};

Wire.prototype.ops = {
    'AND': '&',
    'OR': '|',
    'LSHIFT': '<<',
    'RSHIFT': '>>',
};

// Determine if a key refers to an integer or a wire & return its value
function parseValue(key) {
    let i = parseInt(key);
    return !isNaN(i) ? i : wires[key].getValue();
}

// Generate all wire objects
data.forEach(function (item) {
    let match;
    if (match = /(.*) -> ([a-z]+)/.exec(item))
        wires[match[2]] = new Wire(match[1]);
});

// Output Part One Answer
let partOne = wires.a.getValue();
console.log('Part One:', partOne);

// Reset for Part Two
Object.keys(wires).forEach(function (key) {
    wires[key].value = undefined;
});
wires.b.value = partOne;

// Output Part Two Answer
console.log('Part Two:', wires.a.getValue());