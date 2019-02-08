const POLYLINE_TYPE = {
    POLYLINE: 8,
    POLYGON: 1,
}

const DEFAULT_OPTIONS = {
    polylineType: POLYLINE_TYPE.POLYLINE,
    thickness: 0,
    lineType: null,
}

class Polyline
{
    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ]
     */
    constructor(points, options)
    {
        this.points = points;
        this.options = {
            ...DEFAULT_OPTIONS,
            ...options,
        };
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acad2000/dxf/polyline_dxf_06.htm
        //https://www.autodesk.com/techpubs/autocad/acad2000/dxf/vertex_dxf_06.htm
        let s = `0\nPOLYLINE\n`;
        s += `8\n${this.layer.name}\n`;
        s += `66\n1\n`;
        s += `70\n${this.options.polylineType}\n`;
        s += `39\n${this.options.thickness}\n`;
        s += `10\n0\n20\n0\n30\n0\n`;
        s += '100\nAcDbEntity\n100\nAcDb3dPolyline\n'

        if (this.options.lineType) {
            s += `6\n${this.options.lineType}\n`;
        }

        for (let i = 0; i < this.points.length; ++i)
        {
            s += `0\nVERTEX\n`;
            s += `8\n${this.layer.name}\n`;
            s += `70\n32\n`;
            s += `10\n${this.points[i][0]}\n20\n${this.points[i][1]}\n30\n${this.points[i][2]}\n`;
            s += '100\nAcDbVertex\n100\nAcDb3dPolylineVertex\n'
        }
        
        s += `0\nSEQEND\n`;
        return s;
    }
}

Polyline.POLYLINE_TYPE = POLYLINE_TYPE

module.exports = Polyline;