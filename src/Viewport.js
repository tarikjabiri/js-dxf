//http://docs.autodesk.com/ACD/2011/ENU/filesDXF/WS1a9193826455f5ff18cb41610ec0a2e719-79c6.htm
//https://help.autodesk.com/view/OARX/2023/ENU/?guid=GUID-2602B0FB-02E4-4B9A-B03C-B1D904753D34
const DatabaseObject = require("./DatabaseObject");
class Viewport extends DatabaseObject {
    constructor(name, x, y, width, height) {
        if (x !== undefined && y === undefined && width === undefined && height === undefined) {
            width = x;
            x = undefined;
        }
        super(["AcDbSymbolTableRecord", "AcDbViewportTableRecord"]);
        this.name = name;
        this.x = parseFloat(x)||0;
        this.y = parseFloat(y)||0;
        this.width = parseFloat(width)||0;
        this.height = parseFloat(height)||0;
    }

    tags(manager) {
        manager.push(0, "VPORT");
        super.tags(manager);
        manager.push(2, this.name);
        if (this.x || this.y) {
            manager.push(12, this.x);
            manager.push(22, this.y);
        }
        if (this.width)
            manager.push(40, this.width);
        if (this.height)
            manager.push(41, this.height);
        /* No flags set */
        manager.push(70, 0);
    }
}

module.exports = Viewport;
