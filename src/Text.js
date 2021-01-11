const Entity = require('./Entity');
const Row = require('./Row')
const H_ALIGN_CODES = ['left', 'center', 'right'];
const V_ALIGN_CODES = ['baseline','bottom', 'middle', 'top'];
class Text extends Entity
{
    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation, deg
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
        rows.push(new Row('21', this.y1)), // Y
        rows.push(new Row('31', 0)), // Y
        rows.push(new Row('72', Math.max(H_ALIGN_CODES.indexOf(this.hAlign),0)))
        rows.push(new Row('73', Math.max(V_ALIGN_CODES.indexOf(this.vAlign),0)))
      }

      return rows
    }
}

module.exports = Text;
