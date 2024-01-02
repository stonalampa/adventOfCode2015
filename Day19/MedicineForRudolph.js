const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n')[0];
const replacements = {
    "Al": ["ThF", "ThRnFAr"],
    "B": ["BCa", "TiB", "TiRnFAr"],
    "Ca": ["CaCa", "PB", "PRnFAr", "SiRnFYFAr", "SiRnMgAr", "SiTh"],
    "F": ["CaF", "PMg", "SiAl"],
    "H": ["CRnAlAr", "CRnFYFYFAr", "CRnFYMgAr", "CRnMgYFAr", "HCa", "NRnFYFAr", "NRnMgAr", "NTh", "OB", "ORnFAr"],
    "Mg": ["BF", "TiMg"],
    "N": ["CRnFAr", "HSi"],
    "O": ["CRnFYFAr", "CRnMgAr", "HP", "NRnFAr", "OTi"],
    "P": ["CaP", "PTi", "SiRnFAr"],
    "Si": ["CaSi"],
    "Th": ["ThCa"],
    "Ti": ["BP", "TiTi"],
    "e": ["HF", "NAl", "OMg"]
};;

const part1 = () => {
    const allCombos = [];
    const splitData = data.match(/[A-Z][a-z]*/g);
    for (let i = 0; i < splitData.length; i++) {
        if (replacements[splitData[i]]) {
            const before = splitData.slice(0, i);
            const after = splitData.slice(i + 1);
            replacements[splitData[i]].forEach(replacement => {
                allCombos.push(before.concat([replacement], after).join(''));
            })
        }
    }

    console.log("Part 1 - Number of uniquene molecules: " + new Set(allCombos).size);
}

const part2 = (molecule, replacements, steps = 0) => {
    if (molecule === 'e') {
        console.log("Part 2 - Number of steps to create medicine molecule: " + steps);
        return;
    }

    for (const [key, values] of Object.entries(replacements)) {
        for (const value of values) {
            const index = molecule.indexOf(value);
            if (index !== -1) {
                const newMolecule = molecule.slice(0, index) + key + molecule.slice(index + value.length);
                const result = part2(newMolecule, replacements, steps + 1);
                if (result !== -1) {
                    return result;
                }
            }
        }
    }

    return -1;
}

part1();
part2(data, replacements);