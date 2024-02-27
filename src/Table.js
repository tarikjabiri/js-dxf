const DatabaseObject = require("./DatabaseObject");

class Table extends DatabaseObject {
    constructor(name) {
        super("AcDbSymbolTable");
        this.name = name;
        this.elements = [];
    }

    add(element) {
        element.ownerObjectHandle = this.handle;
        this.elements.push(element);
    }

    tags(manager) {
        manager.push(0, "TABLE");
        manager.push(2, this.name);
        super.tags(manager);
        manager.push(70, this.elements.length);

        this.elements.forEach((element) => {
            element.tags(manager);
        });

        manager.push(0, "ENDTAB");
    }
}

module.exports = Table;
