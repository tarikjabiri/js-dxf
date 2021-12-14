const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class TextStyle extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbTextStyleTableRecord"]);
        this.name = name;
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "STYLE");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        /* No flags set */
        manager.addTag(70, 0);
        manager.addTag(40, 0);
        manager.addTag(41, 1);
        manager.addTag(50, 0);
        manager.addTag(71, 0);
        manager.addTag(42, 1);
        manager.addTag(3, this.name);
        manager.addTag(4, "");

        return manager.tags();
    }
}

module.exports = TextStyle;
