const Drawing = require('./src/Drawing');
const fs = require('fs');

let d = new Drawing();

let filename = `sampleFileMJ_updated`;
d.setUnits('Decimeters');
d.drawText(10, 0, 10, 0, 'Hello World'); // draw text in the default layer named "0"

let greenLayer = 'lgreen';
d.addLayer(greenLayer, Drawing.ACI.GREEN, 'CONTINUOUS');
d.setActiveLayer(greenLayer);
d.drawText(20, -70, 10, 0, 'go green!');

//or fluent
d.addLayer('l_yellow', Drawing.ACI.YELLOW, 'DOTTED')
 .setActiveLayer('l_yellow')
 .drawCircle(50, -30, 25);

let s = d.toDxfString();
fs.writeFileSync(filename + '.dxf', s);
console.log("hello there");
