const DatabaseObject = require('./DatabaseObject')


class Face extends DatabaseObject
{
    constructor(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
    {
        super(["AcDbEntity", "AcDbFace"])
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

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/3dface_al_u05_c.htm
        let s = `0\n3DFACE\n`;
        s += super.toDxfString()
        s += `8\n${this.layer.name}\n`;
        s += `10\n${this.x1}\n20\n${this.y1}\n30\n${this.z1}\n`;
        s += `11\n${this.x2}\n21\n${this.y2}\n31\n${this.z2}\n`;
        s += `12\n${this.x3}\n22\n${this.y3}\n32\n${this.z3}\n`;
        s += `13\n${this.x4}\n23\n${this.y4}\n33\n${this.z4}\n`;
        return s;
    }
}

module.exports = Face;