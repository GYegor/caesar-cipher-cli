const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const getResultText = require('./coder');


class CaesarTransformStream extends Transform {
  constructor(actionType, argShift, options) {
    super (options)
    this.decoder = new StringDecoder('utf-8');
    this.actionType = actionType;
    this.argShift = argShift;
  }

  _transform (chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this.decoder.write(chunk)
    }
    chunk = getResultText(this.actionType, chunk, this.argShift);
    callback(null, chunk);
  }
}

module.exports = CaesarTransformStream;
