const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Block extends DatabaseObject {
    constructor(name) {
        super(["AcDbEntity", "AcDbBlockBegin"]);
        this.name = name;
        this.end = new DatabaseObject(["AcDbEntity", "AcDbBlockEnd"]);
        this.recordHandle = null;
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "BLOCK");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        /* No flags set */
        manager.addTag(70, 0);
        /* Block top left corner */
        manager.addPointTags(0, 0);
        manager.addTag(3, this.name);
        /* xref path name - nothing */
        manager.addTag(1, "");

        //XXX dump content here

        manager.addTag(0, "ENDBLK");
        manager.addTags(this.end.tags());

        return manager.tags();
    }
}

module.exports = Block;
