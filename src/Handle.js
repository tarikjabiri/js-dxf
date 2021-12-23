const Tag = require("./Tag");

class Handle {
    static seed = 0;

    static handle() {
        return (++Handle.seed).toString(16).toUpperCase();
    }

    constructor(handleToOwner = null) {
        this._handle = Handle.handle();
        this._handleToOwner = handleToOwner;
    }

    handleTag(groupCode = 5) {
        return [new Tag(groupCode, this._handle)];
    }

    handleToOwnerTag(groupCode = 330) {
        if (!this._handleToOwner) return [new Tag(groupCode, 0)];
        return [new Tag(groupCode, this._handleToOwner)];
    }

    set handleToOwner(handleToOwner) {
        this._handleToOwner = handleToOwner;
    }

    get handleToOwner() {
        return this._handleToOwner;
    }

    get handle() {
        return this._handle;
    }
}

module.exports = Handle;
