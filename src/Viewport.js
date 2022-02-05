const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Viewport extends DatabaseObject {
    constructor({
        name, 
        height = 1000,
        centerPoint = {x: 0, y: 0}
    }) {
        super(["AcDbSymbolTableRecord", "AcDbViewportTableRecord"]);
        this.name = name;
        this.height = height;
        this.centerPoint = centerPoint;
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "VPORT");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        manager.addTag(40, this.height);
        manager.addTag(12, this.centerPoint.x);
        manager.addTag(22, this.centerPoint.y);
        /* No flags set */
        manager.addTag(70, 0);

        return manager.tags();
    }
}

module.exports = Viewport;
