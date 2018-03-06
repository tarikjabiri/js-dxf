class Text
{
    /**
     * @param {array} point - [x, y, z]
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     */
    constructor(point, height, rotation, value)
    {
        this.point = point;
        this.height = height;
        this.rotation = rotation;
        this.value = value;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm
        let s = `0\nTEXT\n`;
        s += `8\n${this.layer.name}\n`;
        s += `1\n${this.value}\n`;
        s += `10\n${this.point[0]}\n20\n${this.point[1]}\n30\n${this.point[2]||0}\n`;
        s += `40\n${this.height}\n50\n${this.rotation}\n`;
        return s;
    }
}

module.exports = Text;