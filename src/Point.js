class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/point_al_u05_c.htm
        let s = `0\nPOINT\n`;
        s += `8\n${this.layer.name}\n`;
        s += `10\n${this.x}\n20\n${this.y}\n30\n0\n`;
        return s;
    }
}

module.exports = Point;