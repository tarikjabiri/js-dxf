const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

d.setUnits('Yards').addLayer('l_green', Drawing.ACI.GREEN, 'CONTINUOUS');
d.setActiveLayer('l_green');

d.drawLine3d(50, 50, 50, 100, 100, 100)
 .drawLine3d(100, 100, 100, 150, 50, 50)
 .drawLine3d(150, 50, 50, 100, 0, 0)
 .drawLine3d(100, 0, 0, 50, 50, 50)

fs.writeFileSync(__filename + '.dxf', d.toDxfString());