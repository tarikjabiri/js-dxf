const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class LineType extends DatabaseObject {
    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
     */
    constructor(name, description, elements) {
        super(["AcDbSymbolTableRecord", "AcDbLinetypeTableRecord"]);
        this.name = name;
        this.description = description;
        this.elements = elements;
    }

    tags() {
        const manager = new TagsManager();

        // https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
        manager.addTag(0, "LTYPE");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        manager.addTag(3, this.description);
        manager.addTag(70, 0);
        manager.addTag(72, 65);
        manager.addTag(73, this.elements.length);
        manager.addTag(40, this.getElementsSum());

        this.elements.forEach((element) => {
            manager.addTag(49, element);
            manager.addTag(74, 0);
        });

        return manager.tags();
    }

    getElementsSum() {
        return this.elements.reduce((sum, element) => {
            return sum + Math.abs(element);
        }, 0);
    }
}

module.exports = LineType;
