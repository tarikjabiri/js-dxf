const Handle = require("./Handle");
const TagsManager = require("./TagsManager");

class DatabaseObject extends Handle {
    constructor(subclass = null) {
        super();
        this.subclassMarkers = [];
        if (subclass) {
            if (Array.isArray(subclass)) {
                this.subclassMarkers.push(...subclass);
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

        manager.addTags(this.handleTag());
        manager.addTags(this.handleToOwnerTag());
        this.subclassMarkers.forEach((subclassMarker) => {
            manager.addTag(100, subclassMarker);
        });

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
