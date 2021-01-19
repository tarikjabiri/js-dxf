const TagsManager = require("../Core/TagsManager");

class Header extends TagsManager {

    /**
     *
     * @param {string | number} version by default 'AC1027'
     */
    constructor(version = 'AC1027') {
        super();
        this.addTag(0, 'SECTION');
        this.addTag(2, 'HEADER');
        this.addTag(9, '$ACADVER');
        this.addTag(1, version);
        this.addTag(9, '$HANDSEED');
        this.addTag(5, 0);
        // Here we can add any variable we need for future update
    }

    addVariable(code, value) {
        this.addTag(code, value);
    }

    stringify() {
        this.addTag(0, 'ENDSEC');
        return super.stringify();
    }

}

module.exports = Header;

