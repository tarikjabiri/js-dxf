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
}

module.exports = Line;
