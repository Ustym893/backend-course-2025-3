import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
  .requiredOption('-i, --input <path>', 'шлях до вхідного файлу JSON')
  .option('-o, --output <path>', 'шлях до вихідного файлу')
  .option('-d, --display', 'вивести результат у консоль')
  .option('-f, --furnished', 'показати лише будинки з меблями (furnished)')
  .option(
    '-p, --price <number>',
    'показати лише будинки з ціною нижче зазначеної'
  );

program.parse(process.argv);
const options = program.opts();

if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

let result = data;

if (options.furnished) {
  result = result.filter((item) => item.furnishingstatus === 'furnished');
}

if (options.price) {
  const maxPrice = Number(options.price);
  result = result.filter((item) => item.price < maxPrice);
}

const output = result.map((item) => `${item.price} ${item.area}`).join('\n');

if (options.display && options.output) {
  console.log(output);
  fs.writeFileSync(options.output, output);
} else if (options.display) {
  console.log(output);
} else if (options.output) {
  fs.writeFileSync(options.output, output);
}
