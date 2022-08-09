const DatabaseObject = require("./DatabaseObject");

class Vertex extends DatabaseObject {
    /**
     *
     * @param {number} x The X coordinate
     * @param {number} y The Y coordinate
     * @param {number} z The Z coordinate
     */
    constructor(x, y, z) {
        super(["AcDbEntity", "AcDbVertex", "AcDb3dPolylineVertex"]);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    tags(manager) {
        manager.push(0, "VERTEX");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x, this.y, this.z);
        manager.push(70, 32);
    }
}

module.exports = Vertex;
