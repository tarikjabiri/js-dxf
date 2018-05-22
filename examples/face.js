const Drawing = require('./../src/Drawing');
const fs = require('fs');

let d = new Drawing();

d.addLayer('face_example', Drawing.ACI.GREEN, 'CONTINUOUS');
d.setActiveLayer('face_example');

d.drawFace(
    0,0,0,
    0,1,1,
    1,1,0,
    0,0,0)

fs.writeFileSync(__filename + '.dxf', d.toDxfString());