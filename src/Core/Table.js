const TagsManager = require("./TagsManager");

class Table extends TagsManager {

    _records = [];

    constructor(type) {
        super();
        this._type = type;
        this.addTag(2, this._type);
        this.addTag(5, this.handle());
        this.addTag(100, 'AcDbSymbolTable');
    }

    stringify() {
        this.addTag(70, this._records.length);
        let txt = super.stringify();
        txt += this._records.reduce((acc, current) => {
            return acc + current.stringify();
        }, '');
        return txt;
    }

    addRecord(record) {
        this._records.push(record);
    }
}

module.exports = Table;
