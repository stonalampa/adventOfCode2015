const fs = require('fs');

function dataImporter(splitChar) {
    return fs.readFileSync('input.txt', 'utf8').split(splitChar);
}

module.exports = { dataImporter };