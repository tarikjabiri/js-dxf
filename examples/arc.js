const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

d.addLayer('l_green', Drawing.ACI.RED, 'DOTTED');
d.setActiveLayer('l_green');

d.drawArc(50, 50, 50, 30, 90);

fs.writeFileSync(__filename + '.dxf', d.toDxfString());