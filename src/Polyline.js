class Polyline
{
    /**
     * @param {array} points - Array of points like [ [x1, y1, z1], [x2, y2, z2]... ]
     */
    constructor(points)
    {
        this.points = points;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acad2000/dxf/polyline_dxf_06.htm
        //https://www.autodesk.com/techpubs/autocad/acad2000/dxf/vertex_dxf_06.htm
        let s = `0\nPOLYLINE\n`;
        let polylineFlag = 0;
        let vertexFlag = 0;
        if(this.points[0].length === 3) {
            polylineFlag = 8;
            vertexFlag = 32;
        }

        s += `8\n${this.layer.name}\n`;
        s += `66\n1\n70\n${polylineFlag}\n`;

        for (let i = 0; i < this.points.length; ++i)
        {
            s += `0\nVERTEX\n`;
            s += `8\n${this.layer.name}\n`;
            s += `70\n${vertexFlag}\n`;
            s += `10\n${this.points[i][0]}\n20\n${this.points[i][1]}\n30\n${this.points[i][2]||0}\n`;
        }
        
        s += `0\nSEQEND\n`;
        return s;
    }
}

module.exports = Polyline;