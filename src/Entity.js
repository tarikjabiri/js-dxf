const Row = require('./Row')
const H = require('./Helpers')
const handleSeed = require('./handleSeed.js')
const Layer = require('./Layer')
/**
 * Base class representing a DXF entity
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
    constructor({entityType, subclassMarker})
    {
        this.entityType = entityType
        this.subclassMarker = subclassMarker
    }

    /**
     * 
     * @param {Layer} layer 
     */
    setLayer(layer)
    {
        this.layer = layer
        
    }

    toDxfString()
    {
        return H.generateStringFromRows(this.rows());
    }

    rows() {
        let rows = [
            new Row('0', this.entityType),
            new Row('100', 'AcDbEntity'),
            new Row('5', handleSeed()),
            new Row('8', this.layer.name),
            new Row('6', 'BYLAYER'),
            new Row('100', this.subclassMarker),
        ];
        rows.push(...this.toDxfRows())
        return rows;
    }
}

module.exports = Entity
