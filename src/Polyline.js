const Entity = require('./Entity.js');
const Row = require('./Row');
const Vertex = require('./Vertex.js');
/**
 * POLYLINE (DXF)
 * 
 * http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-ABF6B778-BE20-4B49-9B58-A94E64CEFFF3
 */
class Polyline extends Entity
{
    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2, bulge]... ]
     * @param {number} flag  - Polyline flag (default 0, if set to 1 is a closed polyline)
     * @param {number} startWidth - Default start width (optional; default = 0)
     * @param {number} endWidth - Default end width (optional; default = 0)
     */
    constructor(points, flag = 0, startWidth = 0, endWidth = 0)
    {
        super({ entityType: 'POLYLINE', subclassMarker: 'AcDb2dPolyline' })
        this.points = points;
        this.falg = flag; // default 0, if set to 1 is a closed polyline
        this.startWidth = startWidth;
        this.endWidth = endWidth;
    }

    toDxfRows()
    {
        let rows = [];
        if (this.startWidth !== 0) {
            rows.push(new Row('40', this.startWidth));
        }
        if (this.endWidth !== 0) {
            rows.push(new Row('41', this.endWidth));
        }

        rows.push(new Row('70', this.falg));

        this.points.forEach(function(point) {
            const [x, y, bulge = 0] = point;
            const vertex = new Vertex(x, y, 0, 0, 0, 0, bulge);
            vertex.setLayer(this.layer)
            rows = [...rows, ...vertex.rows()];
        }.bind(this));

        rows.push(new Row('0', 'SEQEND'));
      
        return rows;
    }
}

module.exports = Polyline;
