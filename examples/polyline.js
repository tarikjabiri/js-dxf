const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

d.addLineType('DASHDOT', '_ . _ ', [0.5, -0.5, 0.0, -0.5])
d.addLayer('l_green', Drawing.ACI.GREEN, 'DASHDOT');
d.setActiveLayer('l_green');

d.drawPolyline([ [0,0], [10, 10, 0.5], [20, 10], [30, 0] ], true, 1.5, 1.5);

fs.writeFileSync(__filename + '.dxf', d.toDxfString());