const readline = require('readline');
const getOutputString = require('./caesar-coder');


const pipeline = (actionType, argShift, argInput, argOutput) => {
  const curAction = actionType;
  if (!argInput) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on('line', text => {
      getOutputString(curAction, text, argShift)
      console.log(getOutputString(curAction, text, argShift) && getOutputString(curAction, text, argShift));
    })
    rl.on('SIGINT', () => {
      process.exit();
    })
  }

}


module.exports = pipeline

