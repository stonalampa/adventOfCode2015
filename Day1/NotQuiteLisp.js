const fs = require('fs');

const filePath = 'input.txt';
const data = fs.readFileSync(filePath, 'utf8').split('');

const part1 = () => {
    try {
        let floor = 0;
        data.forEach(element => {
            if (element === '(') {
                floor++;
            } else if (element ===')') {
                floor--;
            }
        });
        console.log("Part 1 - Ends up on floor:", floor);
      } catch (err) {
        console.error('Error reading file:', err);
      }
}

const part2 = () => {
    try {
        let floor = 0;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element === '(') {
                floor++;
            } else if (element === ')') {
                floor--;
            }
            if (floor === -1) {
                console.log("Part 2 - Position:", i + 1);
                break;
            }
        }
      } catch (err) {
        console.error('Error reading file:', err);
      }
}


part1();
part2();