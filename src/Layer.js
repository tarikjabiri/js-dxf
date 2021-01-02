const Row = require('./Row')

class Layer
{
    constructor(name, colorNumber, lineTypeName)  // ToDo: Move handseed to constructor
    {
        this.name = name;
        this.colorNumber = colorNumber;
        this.lineTypeName = lineTypeName;
        this.shapes = [];
        this.trueColor = -1
    }

    toDxfString(handSeed)
    {
        const rows = this.toDxfRows(handSeed)
        const outputAsStrings = []  // string[]
        rows.forEach(item => {
          outputAsStrings.push(item.type)
          outputAsStrings.push(item.value.toString())
        })
        let s = outputAsStrings.join('\n')

        s += '\n'
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
      ]

      if (this.trueColor !== -1) {
        output.push(new Row('420', this.trueColor))

      }

      output.push(...[
        new Row('6', this.lineTypeName),
        new Row('370', 0),
        new Row('390', 47),
        new Row('347', '7D'),
        new Row('348', 0),
      ] )

      return output
    }


    setTrueColor(color)
    {
        this.trueColor = color;
    }

    addShape(shape)
    {
        this.shapes.push(shape);
        shape.layer = this;       // ToDo: Wont work in typescript. Extend Entities with shape.setLayer() method instead
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
