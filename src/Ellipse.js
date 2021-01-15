const Entity = require("./Entity");
const Row = require("./Row");

class Ellipse extends Entity
{
    /**
     * ELLIPSE (DXF)
     * 
     * @link http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-107CB04F-AD4D-4D2F-8EC9-AC90888063AB
     * 
     * @param {number} x_center X coordinate of Center point
     * @param {number} y_center Y coordinate of Center point
     * @param {number} x_major_axis X coordinate of Endpoint of major axis, relative to the center
     * @param {number} y_major_axis Y coordinate of Endpoint of major axis, relative to the center
     * @param {number} ratio_minor_axis Ratio of minor axis to major axis
     * @param {number} start_parameter Start parameter (this value is 0.0 for a full ellipse)
     * @param {number} end_parameter End parameter (this value is 2pi = 6.2831853071795862 for a full ellipse)
     */
    constructor(x_center, y_center, x_major_axis, y_major_axis, ratio_minor_axis, start_parameter = 0.0, end_parameter = 6.2831853071795862)
    {
        super({ entityType: 'ELLIPSE', subclassMarker: 'AcDbEllipse' });
        this.x_center = x_center;
        this.y_center = y_center;
        this.z_center = 0;
        this.x_major_axis = x_major_axis;
        this.y_major_axis = y_major_axis;
        this.z_major_axis = 0;
        this.ratio_minor_axis = ratio_minor_axis;
        this.start_parameter = start_parameter;
        this.end_parameter = end_parameter;
    }

    toDxfRows()
    {
        let rows = [];
        rows.push(new Row('10', this.x_center));
        rows.push(new Row('20', this.y_center));
        rows.push(new Row('30', this.z_center));
        
        rows.push(new Row('11', this.x_major_axis));
        rows.push(new Row('21', this.y_major_axis));
        rows.push(new Row('31', this.z_major_axis));

        rows.push(new Row('40', this.ratio_minor_axis));
        rows.push(new Row('42', this.start_parameter));
        rows.push(new Row('43', this.end_parameter));

        return rows;
    }
}

module.exports = Ellipse