const DatabaseObject = require('./DatabaseObject')


class Point extends DatabaseObject
{
    constructor(x, y, lineTypeName)
    {
        super(["AcDbEntity", "AcDbPoint"])
        this.x = x;
        this.y = y;
        this.lineTypeName = lineTypeName;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/point_al_u05_c.htm
        let s = `0\nPOINT\n`;
        s += super.toDxfString()
        s += `8\n${this.layer.name}\n`;
        if (this.lineTypeName) {
            s += `6\n${this.lineTypeName}\n`;
        }
        s += `10\n${this.x}\n20\n${this.y}\n30\n0\n`;
        return s;
    }
}

module.exports = Point;