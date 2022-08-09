const DatabaseObject = require("./DatabaseObject");

class Cylinder extends DatabaseObject {
    /**
     * @param {number} x - Center x
     * @param {number} y - Center y
     * @param {number} z - Center z
     * @param {number} r - radius
     * @param {number} thickness - thickness
     * @param {number} extrusionDirectionX - Extrusion Direction x
     * @param {number} extrusionDirectionY - Extrusion Direction y
     * @param {number} extrusionDirectionZ - Extrusion Direction z
     */
    constructor(
        x,
        y,
        z,
        r,
        thickness,
        extrusionDirectionX,
        extrusionDirectionY,
        extrusionDirectionZ
    ) {
        super(["AcDbEntity", "AcDbCircle"]);
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        this.thickness = thickness;
        (this.extrusionDirectionX = extrusionDirectionX),
            (this.extrusionDirectionY = extrusionDirectionY),
            (this.extrusionDirectionZ = extrusionDirectionZ);
    }

    tags(manager) {
        manager.push(0, "CIRCLE");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x, this.y, this.z);
        manager.push(40, this.r);
        manager.push(39, this.thickness);
        manager.push(210, this.extrusionDirectionX);
        manager.push(220, this.extrusionDirectionY);
        manager.push(230, this.extrusionDirectionZ);
    }
}

module.exports = Cylinder;
