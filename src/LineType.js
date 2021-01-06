const handleSeed = require('./handleSeed.js')

class LineType
{
    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a 
     */
    constructor(name, description, elements)
    {
        this.name = name;
        this.description = description;
        this.elements = elements;
    }

    /**
     * @link https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
     */
    toDxfString()
    {
        let s = '0\nLTYPE\n';
        s += '72\n65\n';
        s += '70\n64\n';
        s += `2\n${this.name}\n`;
        s += `3\n${this.description}\n`;
        s += `73\n${this.elements.length}\n`;
        s += `40\n${this.getElementsSum()}\n`;

        for (let i = 0; i < this.elements.length; ++i)
        {
            s += `49\n${this.elements[i]}\n`;
        }

        return s;
    }

    toDxfRows()
    {
        const output = []
        output.push(new Row('0', 'LTYPE'))
        output.push(new Row('5', handleSeed()))
        output.push(new Row('330', '3D'))
        output.push(new Row('100', 'AcDbSymbolTableRecord'))
        output.push(new Row('100', 'AcDbLinetypeTableRecord'))
        output.push(new Row('2', this.name))
        output.push(new Row('70', '0'))
        output.push(new Row('3', this.description))
        output.push(new Row('72', '65'))
        output.push(new Row('73', this.elements.length))
        output.push(new Row('40', this.getElementsSum()))
        for (let i = 0; i < this.elements.length; ++i)
        {
            s += `49\n${this.elements[i]}\n`;
            output.push(new Row('49', this.elements[i]))
        }
        return output
    }

    getElementsSum()
    {
        let sum = 0;
        for (let i = 0; i < this.elements.length; ++i)
        {
            sum += Math.abs(this.elements[i]);
        }

        return sum;
    }
}

module.exports = LineType;