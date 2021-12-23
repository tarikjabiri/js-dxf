const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Table extends DatabaseObject {
    constructor(name) {
        super("AcDbSymbolTable");
        this.name = name;
        this.elements = [];
    }

    add(element) {
        element.handleToOwner = this.handle;
        this.elements.push(element);
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "TABLE");
        manager.addTag(2, this.name);
        manager.addTags(super.tags());
        manager.addTag(70, this.elements.length);

        this.elements.forEach((element) => {
            manager.addTags(element.tags());
        });

        manager.addTag(0, "ENDTAB");

        return manager.tags();
    }
}

module.exports = Table;
