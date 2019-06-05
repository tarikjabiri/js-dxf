const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

d.drawSplineFromControlPoints([ [0,0], [10, 10], [20, 10], [30, 0] ]);

fs.writeFileSync(__filename + '.dxf', d.toDxfString());