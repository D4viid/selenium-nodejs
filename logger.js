/* eslint-disable */
const fs = require('fs');
const date = new Date();
const logsDirectory = 'logs/' +  date.getFullYear() + '-' + date.getMonth() + date.getDate() + '/';

let Logger = {};

Logger = {
  Log: (logLevel, msg) => {
    if (logLevel === 1) {
      return `[INFO] ${msg}`;
    }

    return `[ERROR] ${msg}`;
  },

  ExportLog: (browserName, filename, idCountry, content) => {
    if (!fs.existsSync(logsDirectory)) {
      fs.mkdirSync(logsDirectory);
    }

    const logFile = `${logsDirectory}[${browserName}][${filename}][${idCountry}].txt`;
    fs.writeFile(logFile, content, (err) => {
      if (err) {
        console.log(err);
        return false;
      }

      console.log('The file was saved!');

      return true;
    });
  }
};

module.exports = Logger;
