const Entity = require('./Entity')
const Row = require('./Row')
/**
 * http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-0741E831-599E-4CBF-91E1-8ADBCFD6556D
 */
class Vertex extends Entity
{
    /**
     * VERTEX (DXF)
     * 
     * @param {number} x -  x Coordinate
     * @param {number} y -  y Coordinate
     * @param {number} z - y Coordinate
     * @param {number} startWidth - Starting width (optional; default is 0)
     * @param {number} endWidth - Ending width (optional; default is 0)
     * @param {number} bulge - Bulge (optional; default is 0). See link above for more informations
     */
    constructor(x, y, z = 0, startWidth = 0, endWidth = 0, vertexFlag = 0, bulge = 0)
    {
        super({ entityType: 'VERTEX', subclassMarker: 'AcDbVertex' })
        this.x = x
        this.y = y
        this.z = z
        this.startWidth = startWidth
        this.endWidth = endWidth
         
        this.vertexFlag = vertexFlag;
        this.bulge = bulge;
    }

    toDxfRows() {
        let rows = [];
        rows.push(new Row('70', this.vertexFlag));
        rows.push(new Row('10', this.x));
        rows.push(new Row('20', this.y));

        if (this.z !== 0) {
            rows.push(new Row('30', this.z));
        }
        if (this.startWidth !== 0) {
            rows.push(new Row('40', this.startWidth));
        }
        if (this.endWidth !== 0) {
            rows.push(new Row('41', this.endWidth));
        }
        if (this.bulge !== 0) {
            rows.push(new Row('42', this.bulge));
        }

        return rows;
    }
}

module.exports = Vertex