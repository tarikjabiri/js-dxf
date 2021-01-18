const Entity = require('./Entity')
const Row = require('./Row')
/**
 * http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-8663262B-222C-414D-B133-4A8506A27C18
 */
class Circle extends Entity
{
    /**
     * @param {number} x - Center x
     * @param {number} y - Center y
     * @param {number} r - radius
     */
    constructor(x, y, r)
    {
        super({ entityType: 'CIRCLE', subclassMarker: 'AcDbCircle' })
        this.x = x
        this.y = y
        this.r = r
        
    }

    toDxfRows() {
        return [
            new Row('10', this.x),
            new Row('20', this.y),
            new Row('30', 0),
            new Row('40', this.r)
        ]
    }
}

module.exports = Circle