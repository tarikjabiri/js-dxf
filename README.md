# JavaScript DXF writer

Simple [DXF](https://en.wikipedia.org/wiki/AutoCAD_DXF) writer.

## Installing
```
npm install dxf-writer
```

## Node.js example
```javascript
const Drawing = require('dxf-writer');
const fs = require('fs');

let d = new Drawing();

d.setUnits('Decimeters');
d.drawText(10, 0, 10, 0, 'Hello World'); // draw text in the default layer named "0"
d.addLayer('l_green', Drawing.ACI.GREEN, 'CONTINUOUS');
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

## Browser examples

 - [demo](//ognjen-petrovic.github.io/js-dxf/examples/browser/index.html)

 - [editor](//ognjen-petrovic.github.io/js-dxf/examples/browser/editor/index.html)

## Supported entities: 
 - arc 
 - circle
 - ellipse
 - line
 - point
 - polygon
 - polyline 
 - polyline 3D 
 - spline
 - text
 - 3DFace
 
## Supported colors: 
 - red
 - green 
 - cyan
 - blue
 - magenta
 - white

## Supported units:
 - Unitless
 - Inches
 - Feet
 - Miles
 - Millimeters
 - Centimeters
 - Meters
 - Kilometers
 - Microinches
 - Mils
 - Yards
 - Angstroms
 - Nanometers
 - Microns
 - Decimeters
 - Decameters
 - Hectometers
 - Gigameters
 - Astronomical units
 - Light years
 - Parsecs

## Line types
3 line type out of the box (CONTINUOUS, DASHED, DOTTED) with the ability to add a custom line type.

```javascript
let d = new Drawing();
d.addLineType('DASHDOT', '_ . _ ', [0.5, -0.5, 0.0, -0.5]);
```
