const LAYER_NAME_BANNED_REGEX = /<|>|\/|\\|"|:|;|\?|\*|\||=|'/g;

function isInvalidLayerName(name) {
    return LAYER_NAME_BANNED_REGEX.test(name);
}

class Layer {
    constructor(name, colorNumber, lineTypeName) {
        if (isInvalidLayerName(name)) {
            throw new Error(
                `Layer name ${name} cannot include the following characters: < > / \ " : ; ? * | = ’`,
            );
        }
        this.name = name;
        this.colorNumber = colorNumber;
        this.lineTypeName = lineTypeName;
        this.shapes = [];
    }

    toDxfString() {
        if (this.shapes.length === 0) return "";

        let s = "0\nLAYER\n";
        s += "70\n64\n";
        s += `2\n${this.name}\n`;
        s += `62\n${this.colorNumber}\n`;
        s += `61\n0\n`;
        if (this.lineTypeName) {
            s += `6\n${this.lineTypeName}\n`;
        }
        return s;
    }

    addShape(shape) {
        this.shapes.push(shape);
        shape.layer = this;
    }

    getShapes() {
        return this.shapes;
    }

    shapesToDxf() {
        let s = "";
        for (let i = 0; i < this.shapes.length; ++i) {
            s += this.shapes[i].toDxfString();
        }

        return s;
    }
}

module.exports = Layer;
