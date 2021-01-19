class Tag {
    /**
     * Tag class represent the DXF tag.
     * The DXF™ format is a tagged data representation of all the information contained in an AutoCAD ® drawing file.
     *
     * @link http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-235B22E0-A567-4CF6-92D3-38A2306D73F3
     *
     * @param {number} code Group code
     * @param {number | string} value Value
     */
    constructor(code, value) {
        this._code = code;
        this._value = value;
    }
    /**
     * @returns {number} Get the group code of this tag.
     */
    get code() {
        return this._code;
    }
    /**
     * @returns {string | number} Get the value of this tag.
     */
    get value() {
        return this._value;
    }
    /**
     * @returns {string} Get the dxf string.
     */
    stringify() {
        return `${this._code}\n${this._value}\n`;
    }

}
module.exports = Tag;
