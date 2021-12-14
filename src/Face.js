const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Face extends DatabaseObject {
    constructor(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
        super(["AcDbEntity", "AcDbFace"]);
        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;
        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
        this.x3 = x3;
        this.y3 = y3;
        this.z3 = z3;
        this.x4 = x4;
        this.y4 = y4;
        this.z4 = z4;
    }

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/3dface_al_u05_c.htm
        manager.addTag(0, "3DFACE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x1, this.y1, this.z1);
        manager.addTagsByElements([
            [11, this.x2],
            [21, this.y2],
            [31, this.z2],
        ]);
        manager.addTagsByElements([
            [12, this.x3],
            [22, this.y3],
            [32, this.z3],
        ]);
        manager.addTagsByElements([
            [13, this.x4],
            [23, this.y4],
            [33, this.z4],
        ]);

        return manager.tags();
    }
}

module.exports = Face;
