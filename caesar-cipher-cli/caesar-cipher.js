const EOL = require('os').EOL;
const minimist = require('minimist');
const constants = require('./constants');
const pipeline = require('./pipeline');

const intgPattern = new RegExp(/^\d+$/);

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

const actionTypes = ['encode', 'decode'];

const handleCommandLineArgs = () => {
  if (args.help) {
    process.exitCode = constants.exitCodes.success;
  } else if (actionTypes.includes(args.action) && !intgPattern.test(args.shift)) {
    console.log(actionTypes.includes(args.action), args.shift, !intgPattern.test(args.shift));
    process.exitCode = constants.exitCodes.noShiftValue;
  } else {
    switch (args.action) {
      case 'encode':
        // TODO: handle encode
        pipeline('encode', args.shift)
        break;
      case 'decode':
        // TODO: handle decode
        pipeline('decode', args.shift)
        break;
      default:
        process.exitCode = constants.exitCodes.noActionType;
        break;
    }
  }
}

handleCommandLineArgs();

process.on('exit', (code) => {
  switch (code) {
    case constants.exitCodes.success:
      console.log(`${EOL}SPASYBO!${EOL}`);
      break;
    case constants.exitCodes.noActionType:
      console.error(`${EOL}Valid --action not found!${EOL}`);
      break;
    case constants.exitCodes.noShiftValue:
    case constants.exitCodes.noShift:
      console.error(`${EOL}Valid --shift not found!${EOL}`);
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
      `  -a, action         one of 'encode', 'decode'${EOL}`,
      `  -s, shift          integer - number of chars to shift, exclude negatives, 0 and multiples of 26${EOL}`,
      `  -i, input          absolute or relative path to text file${EOL}`,
      `  -o, otput          absolute or relative path to text file${EOL}`,
    )
  }
})
