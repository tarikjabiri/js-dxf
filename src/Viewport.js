const DatabaseObject = require('./DatabaseObject')


class Viewport extends DatabaseObject {
    constructor(name, height)
    {
        super(["AcDbSymbolTableRecord", "AcDbViewportTableRecord"])
        this.name = name
        this.height = height
    }

    toDxfString()
    {
        let s = "0\nVPORT\n"
        s += super.toDxfString()
        s += `2\n${this.name}\n`
        s += `40\n${this.height}\n`
        /* No flags set */
        s += "70\n0\n"
        return s
    }
}

module.exports = Viewport