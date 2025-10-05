const program = require('commander');

program.option('-i, --input').option('-o, --output').option('-d, --display');

program.phrase();

const options = program.opts();
console.log('');

