const TagsManager = require("../Core/TagsManager");

class Layer extends TagsManager {
    constructor(name, color, lineType, flag = 64) {
        super();
        this.addTag(0, 'LAYER');
        this.addTag(5, this.handle());
        this.addTag(100, 'AcDbSymbolTableRecord');
        this.addTag(100, 'AcDbLayerTableRecord');
        this.addTag(2, name);
        this.addTag(70, flag); // this is not obvious
        this.addTag(62, color);
        this.addTag(6, lineType);
    }

    stringify() {
        return super.stringify();
    }
}

module.exports = Layer;
