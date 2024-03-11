const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

//Selection of a few css colors
d.addLayer('l_firebrick', 0, 'CONTINUOUS');
d.setActiveLayer('l_firebrick');
d.setTrueColor(0xB22222);
d.drawCircle(-10, 10, 5);

d.addLayer('l_gold', 0, 'CONTINUOUS');
d.setActiveLayer('l_gold');
d.setTrueColor(0xFFD700);
d.drawCircle(10, 10, 5);

d.addLayer('l_mediumseagreen', 0, 'CONTINUOUS');
d.setActiveLayer('l_mediumseagreen');
d.setTrueColor(0x3CB371);
d.drawCircle(-10, -10, 5);

d.addLayer('l_midnightblue', 0, 'CONTINUOUS');
d.setActiveLayer('l_midnightblue');
d.setTrueColor(0x191970);
d.drawCircle(10, -10, 5);

fs.writeFileSync(__filename + '.dxf', d.toDxfString());