const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Circle extends DatabaseObject {
    /**
     * @param {number} x - Center x
     * @param {number} y - Center y
     * @param {number} r - radius
     */
    constructor(x, y, r) {
        super(["AcDbEntity", "AcDbCircle"]);
        this.x = x;
        this.y = y;
        this.r = r;
    }

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/circle_al_u05_c.htm
        manager.addTag(0, "CIRCLE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x, this.y);
        manager.addTag(40, this.r);

        return manager.tags();
    }
}

module.exports = Circle;
