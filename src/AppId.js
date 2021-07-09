const DatabaseObject = require('./DatabaseObject');


class AppId extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbRegAppTableRecord"])
        this.name = name
    }

    toDxfString()
    {
        let s = "0\nAPPID\n"
        s += super.toDxfString()
        s += `2\n${this.name}\n`
        /* No flags set */
        s += "70\n0\n"
        return s
    }
}

module.exports = AppId