const Row = require('./Row')

class Layer
{
    constructor(name, colorNumber, lineTypeName)
    {
        this.name = name;
        this.colorNumber = colorNumber;
        this.lineTypeName = lineTypeName;
        this.shapes = [];
        this.trueColor = -1;
    }

    toDxfString() // ToDo: Include handSeed
    {
        let s = '0\nLAYER\n';
        s += '70\n64\n';
        s += `2\n${this.name}\n`;
        if (this.trueColor !== -1)
        {
            s += `420\n${this.trueColor}\n`
        }
        else
        {
            s += `62\n${this.colorNumber}\n`;
        }
        s += `6\n${this.lineTypeName}\n`;
        return s;
    }

    toDxfRows (handSeed) {  // ToDo: Merge with toDxfString?
      const output = [
        new Row('0', 'LAYER'),
        new Row('5', handSeed.toString(16)),
        new Row('330', '3B'),
        new Row('100', 'AcDbSymbolTableRecord'),
        new Row('100', 'AcDbLayerTableRecord'),
        new Row('2', this.name),
        new Row('70', 0),
        new Row('62', this.colorNumber),
        new Row('420', this.trueColor),
        new Row('6', this.lineTypeName),
        new Row('370', 0),
        new Row('390', 47),
        new Row('347', '7D'),
        new Row('348', 0),
      ]
      return output
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
