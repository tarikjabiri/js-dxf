class VPort
{
    constructor({
        name = "*ACTIVE",
        viewCenterX,
        viewCenterY,
        viewHeight,
        viewAspectRatio,
        lowerLeftX = 0.0,
        lowerLeftY = 0.0,
        upperRightX = 1.0,
        upperRightY = 1.0
    })
    {
        this.name = name;
        this.viewCenterX = viewCenterX;
        this.viewCenterY = viewCenterY;
        this.viewHeight = viewHeight;
        this.viewAspectRatio = viewAspectRatio;
        this.lowerLeftX = lowerLeftX;
        this.lowerLeftY = lowerLeftY;
        this.upperRightX = upperRightX;
        this.upperRightY = upperRightY;
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/3dface_al_u05_c.htm
        let s = '';
        s += `0\nVPORT\n`;
        s += `2\n${this.name}\n`;
        s += `70\n0\n`;
        s += `10\n${this.lowerLeftX}\n`;
        s += `20\n${this.lowerLeftY}\n`;
        s += `11\n${this.upperRightX}\n`;
        s += `21\n${this.upperRightY}\n`;
        s += `12\n${this.viewCenterX}\n`;
        s += `22\n${this.viewCenterX}\n`;
        s += `13\n0.0\n`;
        s += `23\n0.0\n`;
        s += `14\n1.0\n`;
        s += `24\n1.0\n`;
        s += `15\n0.0\n`;
        s += `25\n0.0\n`;
        s += `16\n0.0\n`;
        s += `26\n0.0\n`;
        s += `36\n1.0\n`;
        s += `17\n0.0\n`;
        s += `27\n0.0\n`;
        s += `37\n0.0\n`;
        s += `40\n${this.viewHeight}\n`;
        s += `41\n${this.viewAspectRatio}\n`;
        s += `42\n50.0\n`;
        s += `43\n0.0\n`;
        s += `44\n0.0\n`;
        s += `50\n0.0\n`;
        s += `51\n0.0\n`;
        s += `71\n0\n`;
        s += `72\n100\n`;
        s += `73\n1\n`;
        s += `74\n1\n`;
        s += `75\n0\n`;
        s += `76\n0\n`;
        s += `77\n0\n`;
        s += `78\n0\n`;
        return s;
    }
}

module.exports = VPort;