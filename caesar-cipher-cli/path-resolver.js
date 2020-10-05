const fs = require('fs');
const path = require('path');
const EOL = require('os').EOL;

// TODO: refactor
const resolvePath = (myPath, fileType) => {
  if (!myPath) {
    return null;
  }

  let normalizedPath = path.normalize(myPath);

  fs.access(normalizedPath, fs.constants.F_OK, err => {
    if (err) {
      console.error(`${normalizedPath} does not exist${EOL}`);
      process.exit(4)
    } else {
      if (fs.lstatSync(normalizedPath).isDirectory()) {
        console.error(`${normalizedPath} is path to directory${EOL}`);
        process.exit(4)
      };
      if (!path.isAbsolute(normalizedPath)) {
        normalizedPath = path.resolve(__dirname, normalizedPath);
      }
      switch (fileType) {
        case 'input':
          fs.access(normalizedPath, fs.constants.R_OK, err => {
            if (err) {
              console.error(`${normalizedPath} is not readable${EOL}`);
              process.exit(5)
            } else {
              return normalizedPath;
            }
          });

        case 'output':
          fs.access(normalizedPath, fs.constants.W_OK, err => {
            if (err) {
              console.error(`${normalizedPath} is not writable${EOL}`);
              process.exit(6)
            } else {
              return normalizedPath;
            }
          });
      }
    }
  })
}

module.exports = resolvePath
