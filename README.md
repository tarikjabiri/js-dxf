# JavaScript DXF writer

Dead simple 2D [DXF](https://en.wikipedia.org/wiki/AutoCAD_DXF) writer. 
2D space only (z is always 0).

## Installing
```
npm install dxf-writer
```

Supported entities: line, polyline, arc, circle and text.
Supported colors: red, green, cyan, blue, magenta and white.
3 line type out of the box (CONTINOUS, DASHED, DOTTED) with the ability to add a custom line type.

```javascript
let d = new Drawing();
d.addLineType('DASHDOT', '_ . _ ', [0.5, -0.5, 0.0, -0.5]);
```

## Example
```javascript
const Drawing = require('dxf-writer');
const fs = require('fs');

let d = new Drawing();

d.drawText(10, 0, 10, 0, 'Hello World'); // draw text in the default layer named "0"
d.addLayer('l_green', Drawing.ACI.GREEN, 'CONTINOUS');
d.setActiveLayer('l_green');
d.drawText(20, -70, 10, 0, 'go green!');

//or fluent
d.addLayer('l_yellow', Drawing.ACI.YELLOW, 'DOTTED')
 .setActiveLayer('l_yellow')
 .drawCircle(50, -30, 25);

fs.writeFileSync(__filename + '.dxf', d.toDxfString());
```
Example preview in the LibreCAD:
![exmple in LibreCAD](https://raw.githubusercontent.com/ognjen-petrovic/js-dxf/master/examples/demo.png "example in LibreCAD")
