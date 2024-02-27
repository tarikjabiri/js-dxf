const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

d.drawEllipse(10, 10, 5, 0, 0.5);
d.drawEllipse(10, 10, 3.53, 3.53, 0.5);
d.drawEllipse(10, 10, 0, 5, 0.5);
d.drawEllipse(10, 10, -3.53, 3.53, 0.5);

d.drawEllipse(10, 10, 8, 0, 1, 0, 1.57);
d.drawEllipse(10, 10, 8, 0, 1, 3.14, 4.71);


fs.writeFileSync(__filename + '.dxf', d.toDxfString());