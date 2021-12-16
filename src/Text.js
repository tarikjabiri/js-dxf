const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

const H_ALIGN_CODES = ["left", "center", "right"];
const V_ALIGN_CODES = ["baseline", "bottom", "middle", "top"];

class Text extends DatabaseObject {
    /**
     * @param {number} x - x
     * @param {number} y - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     * @param {string} [horizontalAlignment="left"] left | center | right
     * @param {string} [verticalAlignment="baseline"] baseline | bottom | middle | top
     */
    constructor(
        x,
        y,
        height,
        rotation,
        value,
        horizontalAlignment = "left",
        verticalAlignment = "baseline"
    ) {
        super(["AcDbEntity", "AcDbText"]);
        this.x = x;
        this.y = y;
        this.height = height;
        this.rotation = rotation;
        this.value = value;
        this.hAlign = horizontalAlignment;
        this.vAlign = verticalAlignment;
    }

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm
        manager.addTag(0, "TEXT");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x, this.y);
        manager.addTag(40, this.height);
        manager.addTag(1, this.value);
        manager.addTag(50, this.rotation);

        if (
            H_ALIGN_CODES.includes(this.hAlign, 1) ||
            V_ALIGN_CODES.includes(this.vAlign, 1)
        ) {
            manager.addTag(72, Math.max(H_ALIGN_CODES.indexOf(this.hAlign), 0));
            manager.addTagsByElements([
                [11, this.x],
                [21, this.y],
                [31, 0],
            ]);
            /* AutoCAD needs this one more time, yes, exactly here. */
            manager.addTag(100, "AcDbText");
            manager.addTag(73, Math.max(V_ALIGN_CODES.indexOf(this.vAlign), 0));
        } else {
            /* AutoCAD needs this one more time. */
            manager.addTag(100, "AcDbText");
        }

        return manager.tags();
    }
}

module.exports = Text;
