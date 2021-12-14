class Tag {
    constructor(groupCode, value) {
        this._code = groupCode;
        this._value = value;
    }

    toDxfString() {
        return `\t${this._code}\n${this._value}\n`;
    }
}

module.exports = Tag;
