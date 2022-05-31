const Tag = require("./Tag");

class TagsManager {
    constructor() {
        this._tags = [];
    }

    /**
     *
     * @param {number} x X coordinate of the point.
     * @param {number} y Y coordinate of the point.
     * @param {number} z Z coordinate of the point.
     */
    addPointTags(x, y, z = 0) {
        this.addTag(10, x);
        this.addTag(20, y);
        this.addTag(30, z);
    }

    addSectionBegin(name) {
        this.addTag(0, "SECTION");
        this.addTag(2, name);
    }

    addSectionEnd() {
        this.addTag(0, "ENDSEC");
    }

    addHeaderVariable(name, tagsElements) {
        this.addTag(9, `$${name}`);
        tagsElements.forEach((tagElement) => {
            this.addTag(tagElement[0], tagElement[1]);
        });
    }

    /**
     *
     * @param {[number, string|number][]} tagsElements
     */
    addTagsByElements(tagsElements) {
        tagsElements.forEach((tagElement) => {
            this.addTag(tagElement[0], tagElement[1]);
        });
    }

    /**
     *  Add a tag to the array of tags.
     * @param {number} groupCode
     * @param {number|string} value
     */
    addTag(groupCode, value) {
        this._tags.push(new Tag(groupCode, value));
    }

    /**
     * Append an array of tags to the array of tags
     * @param {Tag[]} tags
     */
    addTags(tags) {
        for (let tag of tags) {
            this._tags.push(tag);
        }
    }

    /**
     * Get the array of tags.
     * @returns {Tag[]}
     */
    tags() {
        return this._tags;
    }

    /**
     * Get the dxf string.
     * @returns {string}
     */
    toDxfString() {
        return this._tags.reduce((dxfString, tag) => {
            return `${dxfString}${tag.toDxfString()}`;
        }, "");
    }
}

module.exports = TagsManager;
