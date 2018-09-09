class Viewport
{
    constructor(centerX, centerY, width, height)
    {
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = width;
        this.height = height;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/viewport_al_u05_c.htm
        let s = `0\nVIEWPORT\n`;
        s += `10\n${this.centerX}\n20\n${this.centerY}\n`;
        s += `40\n${this.width}\n`;
        s += `41\n${this.height}\n`;
        s += `68\n1\n`;
        s += `69\n1\n`;
        return s;
    }
}

module.exports = Viewport;