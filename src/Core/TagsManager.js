const Tag = require('./Tag')

class TagsManager {
    constructor() {
        this._tags = [];
    }
    stringify() {
        return this._tags.reduce((acc, current) => {
            return acc + current.stringify();
        }, '');
    }
    addTag(code, value) {
        this._tags.push(new Tag(code, value));
    }
    get tags() {
        return this._tags;
    }
    set tags(tags) {
        this._tags = [...this._tags, ...tags];
    }

    handle() {
        return Math.random().toString(32).substr(2, 6);
    }
}
module.exports = TagsManager;
