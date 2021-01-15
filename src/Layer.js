const Row = require('./Row')
const handleSeed = require('./handleSeed.js');
const Entity = require('./Entity');

class Layer
{
    constructor(name, colorNumber, lineTypeName)
    {
        this.name = name;
        this.colorNumber = colorNumber;
        this.lineTypeName = lineTypeName;
        this.shapes = [];
        this.trueColor = -1
        
    }

    toDxfString()
    {
        const rows = this.toDxfRows()
        const outputAsStrings = []  // string[]
        rows.forEach(item => {
          outputAsStrings.push(item.type)
          outputAsStrings.push(item.value.toString())
        })
        let s = outputAsStrings.join('\n')

        s += '\n'
        return s;
    }

    toDxfRows () {  // ToDo: Merge with toDxfString?
      const output = [
        new Row('0', 'LAYER'),
        new Row('5', handleSeed()),
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

    /**
     * 
     * @param {Entity} shape 
     */
    addShape(shape)
    {
      shape.setLayer(this);  // ToDo: Wont work in typescript. Extend Entities with shape.setLayer() method instead
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
        }


        return s;
    }
}

module.exports = Layer;
