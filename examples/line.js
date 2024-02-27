const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

d.setUnits('Yards').addLayer('l_green', Drawing.ACI.GREEN, 'CONTINUOUS');
d.setActiveLayer('l_green');

d.drawLine(50, 50, 100, 100)
 .drawLine(100, 100, 150, 50)
 .drawLine(150, 50, 100, 0)
 .drawLine(100, 0, 50, 50)

fs.writeFileSync(__filename + '.dxf', d.toDxfString());