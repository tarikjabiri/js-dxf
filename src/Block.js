const DatabaseObject = require("./DatabaseObject");

class Block extends DatabaseObject {
    constructor(name) {
        super(["AcDbEntity", "AcDbBlockBegin"]);
        this.name = name;
        this.end = new DatabaseObject(["AcDbEntity", "AcDbBlockEnd"]);
        this.recordHandle = null;
    }

    tags(manager) {
        manager.push(0, "BLOCK");
        super.tags(manager);
        manager.push(2, this.name);
        /* No flags set */
        manager.push(70, 0);
        /* Block top left corner */
        manager.point(0, 0);
        manager.push(3, this.name);
        /* xref path name - nothing */
        manager.push(1, "");

        //XXX dump content here

        manager.push(0, "ENDBLK");
        this.end.tags(manager);
    }
}

module.exports = Block;
