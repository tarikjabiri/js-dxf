const DatabaseObject = require("./DatabaseObject");

const LAYER_NAME_BANNED_REGEX = /<|>|\/|\\|"|:|;|\?|\*|\||=|'/g;

function isInvalidLayerName(name) {
    return LAYER_NAME_BANNED_REGEX.test(name);
}

class Layer extends DatabaseObject {
    constructor(name, colorNumber, lineTypeName = null) {
        if (isInvalidLayerName(name)) {
            throw new Error(
                `Layer name ${name} cannot include the following characters: < > / \ " : ; ? * | = ’`
            );
        }

        super(["AcDbSymbolTableRecord", "AcDbLayerTableRecord"]);
        this.name = name;
        this.colorNumber = colorNumber;
        this.lineTypeName = lineTypeName;
        this.shapes = [];
        this.trueColor = -1;
    }

    tags(manager) {
        manager.push(0, "LAYER");
        super.tags(manager);
        manager.push(2, this.name);
        if (this.trueColor !== -1) manager.push(420, this.trueColor);
        else manager.push(62, this.colorNumber);

        manager.push(70, 0);
        if (this.lineTypeName) manager.push(6, this.lineTypeName);

        /* Hard-pointer handle to PlotStyleName object; seems mandatory, but any value seems OK,
         * including 0.
         */
        manager.push(390, 1);
    }

    setTrueColor(color) {
        this.trueColor = color;
    }

    addShape(shape) {
        this.shapes.push(shape);
        shape.layer = this;
    }

    getShapes() {
        return this.shapes;
    }

    shapesTags(space, manager) {
        for (const shape of this.shapes) {
            shape.ownerObjectHandle = space.handle;
            shape.tags(manager);
        }
    }
}

module.exports = Layer;
