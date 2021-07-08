const DatabaseObject = require('./DatabaseObject')


class Layer extends DatabaseObject
{
    constructor(name, colorNumber, lineTypeName = null)
    {
        super(["AcDbSymbolTableRecord", "AcDbLayerTableRecord"])
        this.name = name;
        this.colorNumber = colorNumber;
        this.lineTypeName = lineTypeName;
        this.shapes = [];
        this.trueColor = -1;
    }

    toDxfString()
    {
        let s = '0\nLAYER\n';
        s += super.toDxfString();
        s += `2\n${this.name}\n`;
        if (this.trueColor !== -1)
        {
            s += `420\n${this.trueColor}\n`
        }
        else
        {
            s += `62\n${this.colorNumber}\n`;
        }
        s += '70\n0\n';
        if (this.lineTypeName) {
            s += `6\n${this.lineTypeName}\n`;
        }
        /* Hard-pointer handle to PlotStyleName object; seems mandatory, but any value seems OK,
         * including 0.
         */
        s += "390\n1\n";
        return s;
    }

    setTrueColor(color)
    {
        this.trueColor = color;
    }

    addShape(shape)
    {
        this.shapes.push(shape);
        shape.layer = this;
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
        } 
        
        
        return s;
    }
}

module.exports = Layer;