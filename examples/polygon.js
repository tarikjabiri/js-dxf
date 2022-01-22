const Drawing = require("./../src/Drawing");
const fs = require("fs");

let d = new Drawing();

d.addLayer("inscribed_polygon", Drawing.ACI.YELLOW, "CONTINUOUS");
d.setActiveLayer("inscribed_polygon");

d.drawPolygon(0, 0, 5, 10, 45); // Rotated with 45°
d.drawCircle(0, 0, 10);
d.drawText(-3, 0, 1, 0, "Inscribed");

d.addLayer("circumscribed_polygon", Drawing.ACI.GREEN, "CONTINUOUS");
d.setActiveLayer("circumscribed_polygon");

d.drawPolygon(30, 0, 5, 10, 0, true);
d.drawCircle(30, 0, 10);
d.drawText(25, 0, 1, 0, "Circumscribed");

fs.writeFileSync(__filename + ".dxf", d.toDxfString());
