class Circle
{
    /**
     * @param {array} point - Center point  [x, y, z]
     * @param {number} r - radius
     */
    constructor(point, r)
    {
        this.point = point;
        this.r = r;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/circle_al_u05_c.htm
        let s = `0\nCIRCLE\n`;
        s += `8\n${this.layer.name}\n`;
        s += `10\n${this.point[0]}\n20\n${this.point[1]}\n30\n${this.point[2]||0}\n`;
        s += `40\n${this.r}\n`;
        return s;
    }
}

module.exports = Circle;