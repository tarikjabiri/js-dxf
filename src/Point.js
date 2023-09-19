const DatabaseObject = require("./DatabaseObject");

class Point extends DatabaseObject {
    constructor(x, y, z) {
        super(["AcDbEntity", "AcDbPoint"]);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    tags(manager) {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/point_al_u05_c.htm
        manager.push(0, "POINT");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x, this.y, this.z);
    }
}

module.exports = Point;
