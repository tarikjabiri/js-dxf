const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

// The degree 3 spline will be "rounder" than degree 2
d.drawSpline([[0, 0], [10, 10], [20, 10], [30, 0]], 2);
d.drawSpline([[0, 0], [10, 10], [20, 10], [30, 0]], 3);

// These are "flatter" on top
d.drawSpline([[0, 0], [0, 10], [15, 15], [30, 10], [30, 0]], 2);
d.drawSpline([[0, 0], [0, 10], [15, 15], [30, 10], [30, 0]], 3);

// This one should be skewed to the left
d.drawSpline([[0, 0], [0, 10], [15, 15], [30, 10], [30, 0]], 3, [0, 0, 0, 0, 0.5, 2, 2, 2, 2]);

// This should have a "point" on top
d.drawSpline([[0, 0], [0, 10], [15, 15], [30, 10], [30, 0]], 2, [0, 0, 0, 1, 1, 2, 2, 2]);

fs.writeFileSync(__filename + '.dxf', d.toDxfString());