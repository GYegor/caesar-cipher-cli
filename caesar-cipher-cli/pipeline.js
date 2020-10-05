const EOL = require('os').EOL;
const fs = require('fs');
const readline = require('readline');
const { pipeline } = require('stream');
const CaesarTransformStream = require('./CaesarTransformStream');
const getResultText = require('./coder');
const path = require('path');



const mainPipeLine = (actionType, argShift, inputPath, outputPath) => {
  const outputStream = outputPath ?
    fs.createWriteStream(outputPath, { flags: 'a' }) :
    process.stdout;

  if (inputPath) {
    const inputStream = fs.createReadStream(inputPath, 'utf8', { flags: 'a' });
    pipeline(
      inputStream,
      new CaesarTransformStream(actionType, argShift),
      outputStream,
      (error) => {
        if (!error) {
          console.log(`${EOL}Файл записан: ${EOL}${EOL}`, outputStream.path);
          if (outputStream.path) {
            process.exit()
          }
        } else {
          process.exit(5)
        }
      }
    )
  } else {
    const rl = readline.createInterface({
      input: process.stdin,
    });
    rl.on('line', text => {
      if (outputPath) {
        outputStream.write(getResultText(actionType, text, argShift) + '\n');
        console.log(`${EOL}Файл записан: ${EOL}`);
        console.log(outputStream.path);
        process.exit();
      } else  {
        console.log(getResultText(actionType, text, argShift));
      }
    })
    rl.on('SIGINT', () => {
      process.exit();
    })
  }
}


module.exports = {
  mainPipeLine,
}




