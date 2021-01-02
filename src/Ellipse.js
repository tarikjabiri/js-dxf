class Ellipse {
    /**
     * Creates an ellipse.
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} majorAxisX - Endpoint x of major axis, relative to center
     * @param {number} majorAxisY - Endpoint y of major axis, relative to center
     * @param {number} axisRatio - Ratio of minor axis to major axis
     * @param {number} startAngle - Start angle
     * @param {number} endAngle - End angle
     */
    constructor(x1, y1, majorAxisX, majorAxisY, axisRatio, startAngle, endAngle) {
        this.x1 = x1;
        this.y1 = y1;
        this.majorAxisX = majorAxisX;
        this.majorAxisY = majorAxisY;
        this.axisRatio = axisRatio;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    toDxfString() {
        // https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ellipse_al_u05_c.htm
        let s = `0\nELLIPSE\n`;
        s += `8\n${this.layer.name}\n`;
        s += `10\n${this.x1}\n`;
        s += `20\n${this.y1}\n`;
        s += `30\n0\n`;
        s += `11\n${this.majorAxisX}\n`;
        s += `21\n${this.majorAxisY}\n`;
        s += `31\n0\n`;
        s += `40\n${this.axisRatio}\n`;
        s += `41\n${this.startAngle}\n`;
        s += `42\n${this.endAngle}\n`;
        return s;
    }
}

module.exports = Ellipse;