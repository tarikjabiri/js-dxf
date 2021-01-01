const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

d.addLayer('l_green', Drawing.ACI.GREEN, 'CONTINUOUS');
d.setActiveLayer('l_green');

d.drawText(0, 0, 10, 0, 'js - DXF');
d.drawText(0, 15, 10, 0, 'js - DXF', 'center', 'middle');
d.drawText(0, 20, 10, 0, 'js - DXF', 'right');

fs.writeFileSync(__filename + '.dxf', d.toDxfString());