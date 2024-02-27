const DatabaseObject = require("./DatabaseObject");

class TextStyle extends DatabaseObject {
    fontFileName = 'txt';
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbTextStyleTableRecord"]);
        this.name = name;
    }

    tags(manager) {
        manager.push(0, "STYLE");
        super.tags(manager);
        manager.push(2, this.name);
        /* No flags set */
        manager.push(70, 0);
        manager.push(40, 0);
        manager.push(41, 1);
        manager.push(50, 0);
        manager.push(71, 0);
        manager.push(42, 1);
        manager.push(3, this.fontFileName);
        manager.push(4, "");
    }
}

module.exports = TextStyle;
