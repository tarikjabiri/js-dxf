class Polyline
{
    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ]
     */
    constructor(points)
    {
        this.points = points;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/lwpolyline_al_u05_c.htm
        let s = `0\nLWPOLYLINE\n`;
        s += `90\n${this.points.length}\n`;

        for (let i = 0; i < this.points.length; ++i)
        {
            s += `10\n${this.points[i][0]}\n20\n${this.points[i][1]}\n`;
        }
        
        return s;
    }
}

module.exports = Polyline;