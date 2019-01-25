const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

d.addLayer('l_green', Drawing.ACI.GREEN, 'CONTINUOUS');
d.setActiveLayer('l_green');

d.drawPoint(50, 50)
 .drawLine(60,60)
 .drawLine(70,70)
 .drawLine(80,80)

fs.writeFileSync(__filename + '.dxf', d.toDxfString());