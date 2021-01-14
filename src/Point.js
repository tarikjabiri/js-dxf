const Entity = require('./Entity.js');
const Row = require('./Row.js');

class Point extends Entity
{
    constructor(x, y, z = 0)
    {
        super({ entityType: 'POINT', subclassMarker: 'AcDbPoint' })
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toDxfRows()
    {
        let rows = [];

        rows.push(new Row('10', this.x));
        rows.push(new Row('20', this.y));
        rows.push(new Row('30', this.z));

        return rows;
    }
}

module.exports = Point;
