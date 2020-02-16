const Text = require('./../../src/Text');
const fs = require('fs');
const endOfLine = require('os').EOL;

let text = new Text(0, 10, 2, 0, 'Cloud:');
text.layer = {name: '0'};

let s = fs.readFileSync('../data/octicons-cloud-download.dxf', 'utf8');
s = s.replace('ENTITIES'+ endOfLine, 'ENTITIES' + endOfLine + text.toDxfString())

fs.writeFileSync(__filename + '.dxf', s);