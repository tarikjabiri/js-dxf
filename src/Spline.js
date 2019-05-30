class Spline
{
    /**
     * @param {array} controlPoints - Array of points like [ [x1, y1], [x2, y2]... ]
     */
    constructor(type, degree, controlPoints, knots, fitPoints)
    {
        this.controlPoints = controlPoints
        this.knots = knots
        this.fitPoints = fitPoints
        this.type = type
        this.degree = degree

        // const closed = 0
        // const periodic = 0
        // const rational = 1
        // const planar = 1
        // const linear = 0
        // const splineType = 1024 * closed + 128 * periodic + 8 * rational + 4 * planar + 2 * linear



    }

    toDxfString()
    {
      // https://www.autodesk.com/techpubs/autocad/acad2000/dxf/spline_dxf_06.htm
        let s = `0\nSPLINE\n`
        s += `8\n${this.layer.name}\n`
        s += `100\nAcDbSpline\n`
        s += `210\n0.0\n220\n0.0\n230\n1.0\n`

        s+= `70\n${this.type}\n`
        s+= `71\n${this.degree}\n`
        s+= `72\n${this.knots.length}\n`
        s+= `73\n${this.controlPoints.length}\n`
        s+= `74\n${this.fitPoints.length}\n`
        s+= `42\n1e-6\n`
        s+= `43\n1e-6\n`

        for (let i = 0; i < this.knots.length; ++i)
        {
            s += `40\n${this.knots[i]}\n`
        }


        for (let i = 0; i < this.controlPoints.length; ++i)
        {
            s += `10\n${this.controlPoints[i][0]}\n`
            s += `20\n${this.controlPoints[i][1]}\n`
            s += `30\n0\n`
        }

        return s;
    }
}

module.exports = Spline
