const DatabaseObject = require("./DatabaseObject");

class Line3d extends DatabaseObject {
    constructor(x1, y1, z1, x2, y2, z2) {
        super(["AcDbEntity", "AcDbLine"]);
        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;
        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
    }

    tags(manager) {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        manager.push(0, "LINE");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x1, this.y1, this.z1);

        manager.push(11, this.x2);
        manager.push(21, this.y2);
        manager.push(31, this.z2);
    }
}

module.exports = Line3d;
