const handleSeed = require('./handleSeed.js')

class Circle
{
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     */
    constructor(x1, y1, r)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.r = r;
        
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/circle_al_u05_c.htm
        let s = `0\nCIRCLE\n`;
        s += `5\n${handleSeed()}\n`;
        s += `100\nAcDbEntity\n`;
        s += `8\n${this.layer.name}\n`;
        s += `100\nAcDbCircle\n`;
        s += `10\n${this.x1}\n20\n${this.y1}\n30\n0\n`;
        s += `40\n${this.r}\n`;
        return s;
    }
}

module.exports = Circle;
