class Arc
{
    /**
     * @param {array} point - Center point  [x, y, z]
     * @param {number} r - radius
     * @param {number} startAngle - degree 
     * @param {number} endAngle - degree 
     */
    constructor(point, r, startAngle, endAngle)
    {
        this.point = point;
        this.r = r;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        let s = `0\nARC\n`;
        s += `8\n${this.layer.name}\n`;
        s += `10\n${this.point[0]}\n20\n${this.point[1]}\n30\n${this.point[2]||0}\n`;
        s += `40\n${this.r}\n50\n${this.startAngle}\n51\n${this.endAngle}\n`;
        return s;
    }
}

module.exports = Arc;