const Row = require('./Row')
const H = require('./Helpers')
const handleSeed = require('./handleSeed.js')
/**
 * Base const handleSeed = require('./handleSeed.js')

classrepresenting a DXF entity
 * About the DXF ENTITIES Section: http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-7D07C886-FD1D-4A0C-A7AB-B4D21F18E484
 */

class Entity
{
    /**
     * Entity type like TEXT, LINE, CIRCLE...
     * @type string
     * @memberof Entity
     */
    entityType
    constructor({entityType})
    {
        this.entityType = entityType
    }

    toDxfString()
    {
        const rows = [  // Row[]
        new Row('00', this.entityType),
        new Row('100', 'AcDbEntity'),
        new Row('100', 'AcDbText'),
        new Row('5', handleSeed()),
        new Row('8', this.layer.name),
      ]
        rows.push(...this.toDxfRows())
        return H.generateStringFromRows(rows)
    }
}

module.exports = Entity