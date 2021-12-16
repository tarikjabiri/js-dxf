const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class BlockRecord extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbBlockTableRecord"]);
        this.name = name;
    }

    tags() {
        const manager = new TagsManager();
        manager.addTag(0, "BLOCK_RECORD");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        /* No flags set */
        manager.addTag(70, 0);
        /* Block explodability */
        manager.addTag(280, 0);
        /* Block scalability */
        manager.addTag(281, 1);
        return manager.tags();
    }
}

module.exports = BlockRecord;
