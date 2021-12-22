const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Dictionary extends DatabaseObject {
    constructor() {
        super("AcDbDictionary");
        this.children = {};
    }

    /**
     *
     * @param {*} name
     * @param {DatabaseObject} dictionary
     */
    addChildDictionary(name, dictionary) {
        if (!this.handle) {
            throw new Error("Handle must be set before adding children");
        }
        dictionary.handleToOwner = this.handle;
        this.children[name] = dictionary;
    }

    tags() {
        const manager = new TagsManager();
        manager.addTag(0, "DICTIONARY");
        manager.addTags(super.tags());
        /* Duplicate record cloning flag - keep existing */
        manager.addTag(281, 1);

        Object.entries(this.children).forEach((child) => {
            const [name, item] = child;
            manager.addTag(3, name);
            manager.addTags(item.handleTag(350));
        });

        Object.values(this.children).forEach((child) => {
            manager.addTags(child.tags());
        });

        return manager.tags();
    }
}

module.exports = Dictionary;
