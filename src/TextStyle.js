const DatabaseObject = require('./DatabaseObject')


class TextStyle extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbTextStyleTableRecord"])
        this.name = name
    }

    toDxfString()
    {
        let s = "0\nSTYLE\n"
        s += super.toDxfString()
        s += `2\n${this.name}\n`
        /* No flags set */
        s += "70\n0\n"
        s += "40\n0\n"
        s += "41\n1\n"
        s += "50\n0\n"
        s += "71\n0\n"
        s += "42\n1\n"
        s += `3\n${this.name}\n`
        s += "4\n\n"
        return s
    }
}

module.exports = TextStyle
