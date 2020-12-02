const fs = require('fs');

const text = fs.readFileSync('src/resources/GR2slrRules.txt', {encoding: 'utf8'});

const toWrite = text.split('\n')
  .map((element, index) => index + ': ' + element)
  .join('\n');
fs.writeFileSync('output.txt', toWrite);

