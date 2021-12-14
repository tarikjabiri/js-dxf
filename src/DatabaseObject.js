const TagsManager = require("./TagsManager");

class DatabaseObject {
    constructor(subclass = null) {
        /* Handle should be assigned externally by document instance */
        this.handle = null;
        this.ownerHandle = null;
        this.subclassMarkers = [];
        if (subclass) {
            if (Array.isArray(subclass)) {
                for (const sc of subclass) {
                    this.subclassMarkers.push(sc);
                }
            } else {
                this.subclassMarkers.push(subclass);
            }
        }
    }

    /**
     * Get the array of tags.
     * @returns {Tag[]}
     */
    tags() {
        const manager = new TagsManager();

        if (this.handle) {
            manager.addTag(5, this.handle.toString(16));
        } else {
            console.warn("No handle assigned to entity", this);
        }
        if (this.ownerHandle) {
            manager.addTag(330, this.ownerHandle.toString(16));
        }
        for (const marker of this.subclassMarkers) {
            manager.addTag(100, marker);
        }

        return manager.tags();
    }

    /**
     * Get the dxf string
     * @returns {String}
     */
    toDxfString() {
        const manager = new TagsManager();
        manager.addTags(this.tags());
        return manager.toDxfString();
    }
}

module.exports = DatabaseObject;
