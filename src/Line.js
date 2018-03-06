class Line
{
    constructor(point1, point2)
    {
        this.point1 = point1;
        this.point2 = point2;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        let s = `0\nLINE\n`;
        s += `8\n${this.layer.name}\n`;
        s += `10\n${this.point1[0]}\n20\n${this.point1[1]}\n30\n${this.point1[2] || 0}\n`;
        s += `11\n${this.point2[0]}\n21\n${this.point2[1]}\n31\n${this.point2[2] || 0}\n`;
        return s;
    }
}

module.exports = Line;