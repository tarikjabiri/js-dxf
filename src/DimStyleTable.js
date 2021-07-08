const DatabaseObject = require('./DatabaseObject')
const Table = require('./Table')


class DimStyleTable extends Table {
    constructor(name) {
        super(name)
        this.subclassMarkers.push("AcDbDimStyleTable")
    }

    toDxfString()
    {
        let s = "0\nTABLE\n"
        s += `2\n${this.name}\n`
        s += DatabaseObject.prototype.toDxfString.call(this)
        s += `70\n${this.elements.length}\n`
        /* DIMTOL */
        s += "71\n1\n"
        for (const element of this.elements) {
            s += element.toDxfString()
        }
        s += "0\nENDTAB\n"
        return s
    }
}

module.exports = DimStyleTable