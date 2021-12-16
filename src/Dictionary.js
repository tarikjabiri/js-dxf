const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Dictionary extends DatabaseObject {
    constructor() {
        super("AcDbDictionary");
        this.children = {};
    }

    addChildDictionary(name, dictionary) {
        if (!this.handle) {
            throw new Error("Handle must be set before adding children");
        }
        dictionary.ownerHandle = this.handle;
        this.children[name] = dictionary;
    }

    tags() {
        const manager = new TagsManager();
        manager.addTag(0, "DICTIONARY");
        manager.addTags(super.tags());
        /* Duplicate record cloning flag - keep existing */
        manager.addTag(281, 1);

        for (const [name, item] of Object.entries(this.children)) {
            manager.addTag(3, name);
            manager.addTag(350, item.handle.toString(16));
        }

        for (const item of Object.values(this.children)) {
            manager.addTags(item.tags());
        }

        return manager.tags();
    }
}

module.exports = Dictionary;
