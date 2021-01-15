const Entity = require('./Entity');
const Row = require('./Row')

class Arc extends Entity
{
    /**
     * @param {number} x - Center x
     * @param {number} y - Center y
     * @param {number} r - radius
     * @param {number} startAngle - degree
     * @param {number} endAngle - degree
     */
    constructor(x, y, r, startAngle, endAngle)
    {
        super({ entityType: 'ARC', subclassMarker: 'AcDbCircle' })
        this.x = x;
        this.y = y;
        this.z = 0;
        this.r = r;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        
    }

    toDxfRows()
    {
        let rows = [];

        rows.push(new Row('10', this.x));
        rows.push(new Row('20', this.y));
        rows.push(new Row('30', this.z));
        rows.push(new Row('40', this.r));
        rows.push(new Row('50', this.startAngle));
        rows.push(new Row('51', this.endAngle));

        return rows;
    }
}

module.exports = Arc;
