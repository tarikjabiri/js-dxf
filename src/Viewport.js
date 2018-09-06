class Viewport
{
    constructor(centerX, centerY, centerZ, width, height, status)
    {
        this.centerX = centerX;
        this.centerY = centerY;
        this.centerZ = centerZ;
        this.width = width;
        this.height = height;
        this.status = status;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/viewport_al_u05_c.htm
        let s = `0\nVIEWPORT\n`;
        s += `10\n${this.centerX}\n20\n${this.centerY}\n30\n${this.centerZ}\n`;
        s += `40\n${this.width}\n`;
        s += `41\n${this.height}\n`;
        s += `68\n${this.status}\n`;
        return s;
    }
}

module.exports = Viewport;