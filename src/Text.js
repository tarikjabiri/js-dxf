const Entity = require('./Entity');
const Row = require('./Row')
const H = require('./Helpers')
const H_ALIGN_CODES = ['left', 'center', 'right'];
const V_ALIGN_CODES = ['baseline','bottom', 'middle', 'top'];
const handleSeed = require('./handleSeed.js')
class Text extends Entity
{
    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     * @param {string} [horizontalAlignment="left"] left | center | right
     * @param {string} [verticalAlignment="baseline"] baseline | bottom | middle | top
     */
    constructor(x1, y1, height, rotation, value, horizontalAlignment = 'left', verticalAlignment = 'baseline')
    {
        super({entityType: 'TEXT'});
        this.x1 = x1;
        this.y1 = y1;
        this.height = height;
        this.rotation = rotation;
        this.value = value;
        this.hAlign = horizontalAlignment;
        this.vAlign = verticalAlignment;
        
    }

    toDxfRows () {
      const rows = [  // Row[]
        new Row('0', 'TEXT'),
        new Row('5', handleSeed()),
        new Row('100', 'AcDbEntity'),
        new Row('8', this.layer.name),
        // new Row('62', dxfColorIndex),
        new Row('100', 'AcDbText'),
        new Row('1', this.value),
        new Row('40', this.height),
        new Row('50', this.rotation), // DEG
        new Row('10', this.x1), // X
        new Row('20', this.y1), // Y
        new Row('30', 0), // Z
        new Row('100', 'AcDbText'),
      ]

      if (H_ALIGN_CODES.includes(this.hAlign, 1) || V_ALIGN_CODES.includes(this.vAlign, 1)){
        rows.push(new Row('11', this.x1)), // X
        rows.push(new Row('21', this.x2)), // Y
        rows.push(new Row('31', 0)), // Y
        rows.push(new Row('72', Math.max(H_ALIGN_CODES.indexOf(this.hAlign),0)))
        rows.push(new Row('73', Math.max(V_ALIGN_CODES.indexOf(this.vAlign),0)))
      }

      return rows
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm
        // let s = `${new Row(0, this.entityType)}`;
        // s += `5\n${handleSeed()}\n`;
        // s += `8\n${this.layer.name}\n`;
        // s += `1\n${this.value}\n`;
        // s += `10\n${this.x1}\n20\n${this.y1}\n30\n0\n`;
        // s += `40\n${this.height}\n50\n${this.rotation}\n`;
        // if (H_ALIGN_CODES.includes(this.hAlign, 1) || V_ALIGN_CODES.includes(this.vAlign, 1)){
        //     s += `11\n${this.x1}\n21\n${this.y1}\n31\n0\n`;
        //     s += `72\n${Math.max(H_ALIGN_CODES.indexOf(this.hAlign),0)}\n`;
        //     s += `73\n${Math.max(V_ALIGN_CODES.indexOf(this.vAlign),0)}\n`;
        // }
        // return s;
        const rows = this.toDxfRows()
        return H.generateStringFromRows(rows)
    }
}

module.exports = Text;
