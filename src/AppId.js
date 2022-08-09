const DatabaseObject = require("./DatabaseObject");

class AppId extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbRegAppTableRecord"]);
        this.name = name;
    }

    tags(manager) {
        manager.push(0, "APPID");
        super.tags(manager);
        manager.push(2, this.name);
        /* No flags set */
        manager.push(70, 0);
    }
}

module.exports = AppId;
