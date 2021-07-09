class DatabaseObject {
    constructor(subclass = null)
    {
        /* Handle should be assigned externally by document instance */
        this.handle = null
        this.ownerHandle = null
        this.subclassMarkers = []
        if (subclass) {
            if (Array.isArray(subclass)) {
                for (const sc of subclass) {
                    this.subclassMarkers.push(sc)
                }
            } else {
                this.subclassMarkers.push(subclass)
            }
        }
    }

    toDxfString()
    {
        let s = ""
        if (this.handle) {
            s += `5\n${this.handle.toString(16)}\n`
        } else {
            console.warn("No handle assigned to entity", this)
        }
        if (this.ownerHandle) {
            s += `330\n${this.ownerHandle.toString(16)}\n`
        }
        for (const marker of this.subclassMarkers) {
            s += `100\n${marker}\n`
        }
        return s
    }
}

module.exports = DatabaseObject