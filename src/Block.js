const DatabaseObject = require('./DatabaseObject')


class Block extends DatabaseObject {
    constructor(name)
    {
        super(["AcDbEntity", "AcDbBlockBegin"])
        this.name = name
        this.end = new DatabaseObject(["AcDbEntity","AcDbBlockEnd"])
        this.recordHandle = null
    }

    /* Internal method to set handle value for block end separator entity. */
    setEndHandle(handle) {
        this.end.handle = handle
    }

    /* Internal method to set handle value for block record in block records table. */
    setRecordHandle(handle) {
        this.recordHandle = handle
    }

    //XXX need some API to add content

    toDxfString()
    {
        let s = "0\nBLOCK\n"
        s += super.toDxfString()
        s += `2\n${this.name}\n`
        /* No flags set */
        s += "70\n0\n"
        /* Block top left corner */
        s += "10\n0\n"
        s += "20\n0\n"
        s += "30\n0\n"
        s += `3\n${this.name}\n`
        /* xref path name - nothing */
        s += "1\n\n"

        //XXX dump content here

        s += "0\nENDBLK\n"
        s += this.end.toDxfString()
        return s
    }
}

module.exports = Block