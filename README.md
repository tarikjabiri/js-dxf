# JavaScript DXF writer

Dead simple 2D [DXF](https://en.wikipedia.org/wiki/AutoCAD_DXF) writer. 
2D space only (z is always 0).

Supported entities: line, arc, circle and text.
Supported colors: red, green, cyan, blue, magenta and white.
3 line type out of the box (CONTINOUS, DASHED, DOTTED) with the ability to add a custom line type.

```javascript
let d = new Drawing();
d.addLineType('DASHDOT', '_ . _ ', [0.5, -0.5, 0.0, -0.5]);
```
