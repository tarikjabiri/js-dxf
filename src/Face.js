const Entity = require('./Entity.js');
const Row = require('./Row.js');

class Face extends Entity
{
    /**
     * 
     * @param {number} x1   - x1 coordinate 
     * @param {number} y1   - y1 coordinate 
     * @param {number} z1   - z1 coordinate 
     * @param {number} x2   - x2 coordinate 
     * @param {number} y2   - y2 coordinate 
     * @param {number} z2   - z2 coordinate 
     * @param {number} x3   - x3 coordinate 
     * @param {number} y3   - y3 coordinate 
     * @param {number} z3   - z3 coordinate 
     * @param {number} x4   - x4 coordinate 
     * @param {number} y4   - y4 coordinate 
     * @param {number} z4   - z4 coordinate 
     */
    constructor(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
    {
        super({ entityType: '3DFACE', subclassMarker: 'AcDbFace' })
        this.x1 = x1; this.y1 = y1; this.z1 = z1;
        this.x2 = x2; this.y2 = y2; this.z2 = z2;
        this.x3 = x3; this.y3 = y3; this.z3 = z3;
        this.x4 = x4; this.y4 = y4; this.z4 = z4;
        
    }

    toDxfRows()
    {
        let rows = [];

        rows.push(new Row('10', this.x1));
        rows.push(new Row('20', this.y1));
        rows.push(new Row('30', this.z1));

        rows.push(new Row('11', this.x2));
        rows.push(new Row('21', this.y2));
        rows.push(new Row('31', this.z2));

        rows.push(new Row('12', this.x3));
        rows.push(new Row('22', this.y3));
        rows.push(new Row('32', this.z3));

        rows.push(new Row('13', this.x4));
        rows.push(new Row('23', this.y4));
        rows.push(new Row('33', this.z4));

        return rows;
    }
}

module.exports = Face;
