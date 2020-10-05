const constants = require('./constants');


const azAZpattern = new RegExp(/[a-zA-Z]/);

const charCodeFor = {
  a: +'a'.charCodeAt(0),
  z: +'z'.charCodeAt(0),
  A: +'A'.charCodeAt(0),
  Z: +'Z'.charCodeAt(0),
};

const getNormalizedShiftValue = (shiftValue = 0) => {
  return +shiftValue > 25 ? +shiftValue%26 : +shiftValue;
}

const caesarIt = (actionType, char, normalizedShiftValue) => {
  const charCode = +char.charCodeAt(0);
  const upperCase = (charCode <= charCodeFor.Z) ? true : false
  let shiftedCharCode;
  switch (actionType) {
    case 'encode':
      if (upperCase) {
        shiftedCharCode = (charCode + normalizedShiftValue) > charCodeFor.Z ?
          charCode + normalizedShiftValue - charCodeFor.Z + charCodeFor.A - 1 :
          charCode + normalizedShiftValue
      } else {
        shiftedCharCode = (charCode + normalizedShiftValue) > charCodeFor.z ?
          charCode + normalizedShiftValue - charCodeFor.z + charCodeFor.a - 1 :
          charCode + normalizedShiftValue
      }
      break;
    case 'decode':
      if (upperCase) {
        shiftedCharCode = (charCode - normalizedShiftValue) < charCodeFor.A ?
          charCodeFor.Z - normalizedShiftValue + charCode - charCodeFor.A + 1:
          charCode - normalizedShiftValue
      } else {
        shiftedCharCode = (charCode - normalizedShiftValue) < charCodeFor.a ?
          charCodeFor.z - normalizedShiftValue + charCode - charCodeFor.a + 1:
          charCode - normalizedShiftValue;
    }
      break;
  }
  return String.fromCharCode(shiftedCharCode)
}

const getResultText = (actionType, inputString, shiftValue) => {
  if (!inputString) {
    return '';
  }
  const normalizedShiftValue = getNormalizedShiftValue(shiftValue)
  if (!normalizedShiftValue) {
    process.exitCode = constants.exitCodes.noShiftValue;
    return;
  }

  return inputString.split('')
    .map(char => azAZpattern.test(char) ?
      caesarIt(actionType, char, normalizedShiftValue) :
      char
    )
    .join('')
}

module.exports = getResultText;
