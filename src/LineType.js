const DatabaseObject = require("./DatabaseObject");

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

    tags(manager) {
        // https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
        manager.push(0, "LTYPE");
        super.tags(manager);
        manager.push(2, this.name);
        manager.push(3, this.description);
        manager.push(70, 0);
        manager.push(72, 65);
        manager.push(73, this.elements.length);
        manager.push(40, this.getElementsSum());

        this.elements.forEach((element) => {
            manager.push(49, element);
            manager.push(74, 0);
        });
    }

    getElementsSum() {
        return this.elements.reduce((sum, element) => {
            return sum + Math.abs(element);
        }, 0);
    }
}

module.exports = LineType;
