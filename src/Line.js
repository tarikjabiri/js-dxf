const Row = require('./Row')
const H = require('./Helpers')

class Line
{
    constructor(x1, y1, x2, y2, handSeed)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.handSeed = handSeed
    }

    toDxfRow () {
      const output = [  // Row[]
        new Row('0', 'LINE'),
        new Row('5', this.handSeed.toString(16)),
        new Row('100', 'AcDbEntity'),
        new Row('8', this.layer.name),
        new Row('100', 'AcDbLine'),
        // new Row('62', colorIndex),
        new Row('10', this.x1),
        new Row('20', this.y1),
        new Row('30', 0),
        new Row('11', this.x2),
        new Row('21', this.y2),
        new Row('31', 0),
      ]

      return output

    }

    toDxfString()
    {
        const rows = this.toDxfRow()
        return H.generateStringFromRows(rows)
    }
}

module.exports = Line;
