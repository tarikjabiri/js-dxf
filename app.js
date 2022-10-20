const Drawing = require("./src/Drawing");
const fs = require('fs');

let d = new Drawing();

let filename = `likely disfunctional`;
d.setUnits('Decimeters');
d.drawText(10, 0, 10, 0, 'Hello World'); // draw text in the default layer named "0"

let greenLayer = 'l green';
d.addLayer(greenLayer, Drawing.ACI.GREEN, 'CONTINUOUS');
d.setActiveLayer(greenLayer);
d.drawText(20, -70, 10, 0, 'go green!');
let yellowLayer = 'this is a yellow layer';
//or fluent
d.addLayer(yellowLayer, Drawing.ACI.YELLOW, 'DOTTED')
 .setActiveLayer(yellowLayer)
 .drawCircle(50, -30, 25);

let s = d.toDxfString();
fs.writeFileSync(filename + '.dxf', s);
console.log("hello there");
