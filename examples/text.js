const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

d.addLayer('l_green', Drawing.ACI.GREEN, 'CONTINOUS');
d.setActiveLayer('l_green');

d.drawText(0, 0, 10, 0, 'js - DXF');
d.drawText(0, 10, 10, 0, 'js - DXF');

fs.writeFileSync(__filename + '.dxf', d.toDxfString());