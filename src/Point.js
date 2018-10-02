class Point
{
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     */
    constructor(x1, y1, z1)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acad2000/dxf/point_dxf_06.htm
        let s = `0\nPOINT\n`;
        s += `8\n${this.layer.name}\n`;
        s += `10\n${this.x1}\n20\n${this.y1}\n30\n${this.z1}\n`;
        return s;
    }
}

module.exports = Point;