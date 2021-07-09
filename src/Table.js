const DatabaseObject = require('./DatabaseObject')


class Table extends DatabaseObject {
    constructor(name) {
        super("AcDbSymbolTable")
        this.name = name
        this.elements = []
    }

    add(element) {
        this.elements.push(element)
    }

    toDxfString()
    {
        let s = "0\nTABLE\n"
        s += `2\n${this.name}\n`
        s += super.toDxfString()
        s += `70\n${this.elements.length}\n`
        for (const element of this.elements) {
            s += element.toDxfString()
        }
        s += "0\nENDTAB\n"
        return s
    }
}

module.exports = Table