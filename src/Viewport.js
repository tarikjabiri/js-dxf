const DatabaseObject = require("./DatabaseObject");

class Viewport extends DatabaseObject {
    constructor(name, height) {
        super(["AcDbSymbolTableRecord", "AcDbViewportTableRecord"]);
        this.name = name;
        this.height = height;
    }

    tags(manager) {
        manager.push(0, "VPORT");
        super.tags(manager);
        manager.push(2, this.name);
        manager.push(40, this.height);
        /* No flags set */
        manager.push(70, 0);
    }
}

module.exports = Viewport;
