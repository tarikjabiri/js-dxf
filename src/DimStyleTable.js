const DatabaseObject = require("./DatabaseObject");
const Table = require("./Table");

class DimStyleTable extends Table {
    constructor(name) {
        super(name);
        this.subclassMarkers.push("AcDbDimStyleTable");
    }

    tags(manager) {
        manager.push(0, "TABLE");
        manager.push(2, this.name);
        DatabaseObject.prototype.tags.call(this, manager);
        manager.push(70, this.elements.length);
        /* DIMTOL */
        manager.push(71, 1);

        for (const e of this.elements) {
            e.tags(manager);
        }

        manager.push(0, "ENDTAB");
    }
}

module.exports = DimStyleTable;
