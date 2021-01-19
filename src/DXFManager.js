const TagsManager = require("./Core/TagsManager");
const Header = require("./Sections/Header");
const Tables = require("./Sections/Tables");

class DXFManager extends TagsManager {

    _header;
    _tables;

    constructor(version = 'AC1027') {
        super();
        this._header = new Header(version);
        this._tables = new Tables();
    }

    addLayer() {

    }

    addLineType() {

    }

    DrawLine(x_start, y_start, x_end, y_end) {

    }

    stringify() {
        this.addTag(0, 'EOF');
        let txt = '';
        txt += this._header.stringify();
        txt += this._tables.stringify();
        txt += super.stringify();

        return txt;
    }


}

module.exports = DXFManager;
