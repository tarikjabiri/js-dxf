const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Layer extends DatabaseObject {
    constructor(name, colorNumber, lineTypeName = null) {
        super(["AcDbSymbolTableRecord", "AcDbLayerTableRecord"]);
        this.name = name;
        this.colorNumber = colorNumber;
        this.lineTypeName = lineTypeName;
        this.shapes = [];
        this.trueColor = -1;
    }

    tags() {
        const manager = new TagsManager();
        manager.addTag(0, "LAYER");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        if (this.trueColor !== -1) {
            manager.addTag(420, this.trueColor);
        } else {
            manager.addTag(62, this.colorNumber);
        }
        manager.addTag(70, 0);
        if (this.lineTypeName) {
            manager.addTag(6, this.lineTypeName);
        }
        /* Hard-pointer handle to PlotStyleName object; seems mandatory, but any value seems OK,
         * including 0.
         */
        manager.addTag(390, 1);
        return manager.tags();
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

    shapesTags(space) {
        return this.shapes.reduce((tags, shape) => {
            shape.handleToOwner = space.handle;
            return [...tags, ...shape.tags()];
        }, []);
    }

    shapesToDxf() {
        return this.shapes.reduce((dxfString, shape) => {
            return `${dxfString}${shape.toDxfString()}`;
        }, "");
    }
}

module.exports = Layer;
