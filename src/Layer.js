class Layer
{
    constructor(name, colorNumber, lineTypeName)
    {
        this.name = name;
        this.colorNumber = colorNumber;
        this.lineTypeName = lineTypeName;
        this.shapes = [];
    }

    toDxfString()
    {
        let s = '0\nLAYER\n';
        s += '70\n64\n';
        s += `2\n${this.name}\n`;
        s += `62\n${this.colorNumber}\n`;
        s += `6\n${this.lineTypeName}\n`;
        return s;        
    }

    addShape(shape)
    {
        this.shapes.push(shape);
    }

    getShapes()
    {
        return this.shapes;
    }

    shapesToDxf()
    {
        let s = '';
        for (let i = 0; i < this.shapes.length; ++i)
        {
            s += this.shapes[i].toDxfString();
            s += `8\n${this.name}\n`;
        } 
        
        
        return s;
    }
}

module.exports = Layer;