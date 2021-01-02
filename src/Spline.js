class Spline
{
    /**
     * Creates a spline. See https://www.autodesk.com/techpubs/autocad/acad2000/dxf/spline_dxf_06.htm
     * @param {[Array]} controlPoints - Array of control points like [ [x1, y1], [x2, y2]... ]
     * @param {number} degree - Degree of spline: 2 for quadratic, 3 for cubic. Default is 3
     * @param {[number]} knots - Knot vector array. If null, will use a uniform knot vector. Default is null
     * @param {[number]} weights - Control point weights. If provided, must be one weight for each control point. Default is null
     * @param {[Array]} fitPoints - Array of fit points like [ [x1, y1], [x2, y2]... ]
     */
    constructor(controlPoints, degree = 3, knots = null, weights = null, fitPoints = [])
    {
        if (controlPoints.length < degree + 1) {
            throw new Error(`For degree ${degree} spline, expected at least ${degree + 1} control points, but received only ${controlPoints.length}`);
        }

        if (knots == null) {
            // Examples:
            // degree 2, 3 pts:  0 0 0 1 1 1
            // degree 2, 4 pts:  0 0 0 1 2 2 2
            // degree 2, 5 pts:  0 0 0 1 2 3 3 3
            // degree 3, 4 pts:  0 0 0 0 1 1 1 1
            // degree 3, 5 pts:  0 0 0 0 1 2 2 2 2

            knots = [];
            for (let i = 0; i < degree + 1; i++) {
                knots.push(0);
            }
            for (let i = 1; i < controlPoints.length - degree; i++) {
                knots.push(i);
            }
            for (let i = 0; i < degree + 1; i++) {
                knots.push(controlPoints.length - degree);
            }
        }

        if (knots.length !== controlPoints.length + degree + 1) {
            throw new Error(`Invalid knot vector length. Expected ${controlPoints.length + degree + 1} but received ${knots.length}.`);
        }

        this.controlPoints = controlPoints;
        this.knots = knots;
        this.fitPoints = fitPoints;
        this.degree = degree;
        this.weights = weights;

        const closed = 0;
        const periodic = 0;
        const rational = this.weights ? 1 : 0;
        const planar = 1;
        const linear = 0;

        this.type =
            closed * 1 +
            periodic * 2 +
            rational * 4 +
            planar * 8 +
            linear * 16;

        // Not certain where the values of these flags came from so I'm going to leave them commented for now
        // const closed = 0
        // const periodic = 0
        // const rational = 1
        // const planar = 1
        // const linear = 0
        // const splineType = 1024 * closed + 128 * periodic + 8 * rational + 4 * planar + 2 * linear

    }

    toDxfString() {
        // https://www.autodesk.com/techpubs/autocad/acad2000/dxf/spline_dxf_06.htm
        let s = `0\nSPLINE\n`;
        s += `8\n${this.layer.name}\n`;
        s += `100\nAcDbSpline\n`;
        s += `210\n0.0\n220\n0.0\n230\n1.0\n`;

        s += `70\n${this.type}\n`;
        s += `71\n${this.degree}\n`;
        s += `72\n${this.knots.length}\n`;
        s += `73\n${this.controlPoints.length}\n`;
        s += `74\n${this.fitPoints.length}\n`;
        s += `42\n1e-7\n`;
        s += `43\n1e-7\n`;
        s += `44\n1e-10\n`;

        for (let i = 0; i < this.knots.length; ++i) {
            s += `40\n${this.knots[i]}\n`;
        }

        if (this.weights) {
            for (let i = 0; i < this.knots.length; ++i) {
                s += `41\n${this.weights[i]}\n`;
            }
        }

        for (let i = 0; i < this.controlPoints.length; ++i) {
            s += `10\n${this.controlPoints[i][0]}\n`;
            s += `20\n${this.controlPoints[i][1]}\n`;
            s += `30\n0\n`;
        }

        return s;
    }
}

module.exports = Spline
