const { dataImporter } = require('../DataImporter');
const data = dataImporter('\n');

console.log(data);


console.log(data.sort((a, b) => a - b))


// a b c
// a b d
// a b e
// a b f
// a b c d
// a b c e