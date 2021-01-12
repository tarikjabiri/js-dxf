const Entity = require('./Entity')
const Row = require('./Row')
/**
 * http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-8663262B-222C-414D-B133-4A8506A27C18
 */
class Circle extends Entity
{
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     */
    constructor(x1, y1, r)
    {
        super({ entityType: 'CIRCLE', subclassMarker: 'AcDbCircle' })
        this.x1 = x1
        this.y1 = y1
        this.r = r
        
    }

    toDxfRows() {
        return [
            new Row('10', this.x1),
            new Row('20', this.y1),
            new Row('30', 0),
            new Row('40', this.r)
        ]
    }
}

module.exports = Circle