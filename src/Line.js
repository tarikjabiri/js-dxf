const Entity = require('./Entity');
const Row = require('./Row')
/**
 * http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-FCEF5726-53AE-4C43-B4EA-C84EB8686A66
 */
class Line extends Entity {
    constructor(x1, y1, x2, y2) {
        super({ entityType: 'LINE', subclassMarker: 'AcDbLine' });
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    toDxfRows() {
        return [
            // new Row('62', colorIndex),
            new Row('10', this.x1),
            new Row('20', this.y1),
            new Row('30', 0),
            new Row('11', this.x2),
            new Row('21', this.y2),
            new Row('31', 0),
        ]
    }
}

module.exports = Line;
