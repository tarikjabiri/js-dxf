const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Line extends DatabaseObject {
    constructor(x1, y1, x2, y2) {
        super(["AcDbEntity", "AcDbLine"]);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        manager.addTag(0, "LINE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x1, this.y1);
        manager.addTagsByElements([
            [11, this.x2],
            [21, this.y2],
            [31, 0],
        ]);

        return manager.tags();
    }

    computeBoundingBox() {
        return {
            min: { x: Math.min(this.x1, this.x2), y: Math.min(this.y1, this.y2)},
            max: { x: Math.max(this.x1, this.x2), y: Math.max(this.y1, this.y2)}
        }
        // return [
        //     [Math.min(this.x1, this.x2), Math.min(this.y1, this.y2)],
        //     [Math.max(this.x1, this.x2), Math.max(this.y1, this.y2)]
        // ]
    }
}

module.exports = Line;
