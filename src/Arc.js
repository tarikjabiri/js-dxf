const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Arc extends DatabaseObject {
    /**
     * @param {number} x - Center x
     * @param {number} y - Center y
     * @param {number} r - radius
     * @param {number} startAngle - degree
     * @param {number} endAngle - degree
     */
    constructor(x, y, r, startAngle, endAngle) {
        super(["AcDbEntity", "AcDbCircle"]);
        this.x = x;
        this.y = y;
        this.r = r;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        manager.addTag(0, "ARC");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x, this.y);
        manager.addTag(40, this.r);
        manager.addTag(100, "AcDbArc");
        manager.addTag(50, this.startAngle);
        manager.addTag(51, this.endAngle);

        return manager.tags();
    }
}

module.exports = Arc;
