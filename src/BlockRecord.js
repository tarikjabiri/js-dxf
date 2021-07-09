const DatabaseObject = require('./DatabaseObject')


class BlockRecord extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbBlockTableRecord"])
        this.name = name
    }

    toDxfString()
    {
        let s = "0\nBLOCK_RECORD\n"
        s += super.toDxfString()
        s += `2\n${this.name}\n`
        /* No flags set */
        s += "70\n0\n"
        /* Block explodability */
        s += "280\n1\n"
        /* Block scalability */
        s += "281\n0\n";
        return s
    }
}

module.exports = BlockRecord