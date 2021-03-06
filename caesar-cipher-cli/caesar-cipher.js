const EOL = require('os').EOL;
const minimist = require('minimist');
const constants = require('./constants');
const { mainPipeLine } = require('./pipeline');
const fs = require('fs')
const path = require('path')
const resolvePath = require('./path-resolver')

const args = minimist(process.argv.slice(2), {
  string: ['action', 'shift', 'input', 'output'],
  alias: {
    action: 'a',
    shift: 's',
    input: 'i',
    output: 'o',
    help: 'h',
  },
})

const intgPattern = new RegExp(/^\d+$/);

const actionTypes = ['encode', 'decode'];

const inputFilePath = args.input ? path.join(args.input) : null;

const outputFilePath = args.output ? path.join(args.output) : null;

resolvePath(inputFilePath, 'input');
resolvePath(outputFilePath, 'output');

const handleCommandLineArgs = () => {
  if (args.help) {
    process.exitCode = constants.exitCodes.success;
  } else if (actionTypes.includes(args.action) && !intgPattern.test(args.shift)) {
    process.exitCode = constants.exitCodes.noShiftValue;
  } else {
    fs.access(outputFilePath || '', fs.constants.F_OK, err => { // TODO: refactor
      if (!outputFilePath || !err) {
        switch (args.action) {
          case 'encode':
            mainPipeLine('encode', args.shift, inputFilePath, outputFilePath)
            break;
          case 'decode':
            mainPipeLine('decode', args.shift, inputFilePath, outputFilePath)
            break;
          default:
            process.exitCode = constants.exitCodes.noActionType;
            break;
        }
      }
    });
  }
}

handleCommandLineArgs();
process.on('exit', (code) => {
  switch (code) {
    case constants.exitCodes.success:
      if (!args.help) {
        console.log(`${EOL}SUCCESS!${EOL}`);
      }
      break;
    case constants.exitCodes.noActionType:
      console.error(`${EOL}Valid --action not found!${EOL}`);
      break;
    case constants.exitCodes.noShiftValue:
    case constants.exitCodes.noShift:
      console.error(`${EOL}Valid --shift not found!${EOL}`);
      break;
    case constants.exitCodes.noFile:
    case constants.exitCodes.notReadable:
    case constants.exitCodes.notWritable:
      break;
    default:
      console.error(`${EOL}Unknown error!${EOL}`);
      break;
  }
  if (args.help || code !== constants.exitCodes.success) {
    console.log(
      `Usage: node caesar-cipher --action <action-type> --shift <value> [--input <path1>] [--output <path2>]${EOL}`,
      `${EOL}Options:${EOL}`,
      `  -h, --help         print node caesar-cipher command line options (currently set)${EOL}`,
      `  -a, --action         one of encode, decode${EOL}`,
      `  -s, --shift          integer - number of chars to shift, exclude negatives, 0 and multiples of 26${EOL}`,
      `  -i, --input          absolute or relative path to readable text file${EOL}`,
      `  -o, --otput          absolute or relative path to writable text file${EOL}`,
    )
  }
})
