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
}

module.exports = Entity