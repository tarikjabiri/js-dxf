const DatabaseObject = require('./DatabaseObject')


class Dictionary extends DatabaseObject {
    constructor()
    {
        super("AcDbDictionary")
        this.children = {}
    }

    addChildDictionary(name, dictionary) {
        if (!this.handle) {
            throw new Error("Handle must be set before adding children")
        }
        dictionary.ownerHandle = this.handle
        this.children[name] = dictionary
    }

    toDxfString()
    {
        let s = "0\nDICTIONARY\n"
        s += super.toDxfString()
        /* Duplicate record cloning flag - keep existing */
        s += "281\n1\n"
        for (const [name, item] of Object.entries(this.children)) {
            s += `3\n${name}\n`
            s += `350\n${item.handle.toString(16)}\n`
        }
        for (const item of Object.values(this.children)) {
            s += item.toDxfString()
        }
        return s
    }
}

module.exports = Dictionary