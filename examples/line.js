const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

//d.setUnits('Yards').addLayer('l_green', Drawing.ACI.GREEN, 'CONTINUOUS');
//d.setActiveLayer('l_green');

d.drawLine(-50, 0, 0, 50)
 .drawLine(0, 50, 50, 0)
 .drawLine(50, 0, 0, -50)
 .drawLine(0, -50, -50, 0)

fs.writeFileSync(__filename + '.dxf', d.toDxfString());