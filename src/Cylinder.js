const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

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
        this.extrusionDirectionX = extrusionDirectionX,
        this.extrusionDirectionY = extrusionDirectionY,
        this.extrusionDirectionZ = extrusionDirectionZ
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "CIRCLE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x, this.y, this.z);
        manager.addTag(40, this.r);
        manager.addTag(39, this.thickness);
        manager.addTag(210, this.extrusionDirectionX);
        manager.addTag(220, this.extrusionDirectionY);
        manager.addTag(230, this.extrusionDirectionZ);

        return manager.tags();
    }
}

module.exports = Cylinder;
