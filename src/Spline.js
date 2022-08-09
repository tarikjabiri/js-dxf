const DatabaseObject = require("./DatabaseObject");

class Spline extends DatabaseObject {
    /**
     * Creates a spline. See https://www.autodesk.com/techpubs/autocad/acad2000/dxf/spline_dxf_06.htm
     * @param {[Array]} controlPoints - Array of control points like [ [x1, y1], [x2, y2]... ]
     * @param {number} degree - Degree of spline: 2 for quadratic, 3 for cubic. Default is 3
     * @param {[number]} knots - Knot vector array. If null, will use a uniform knot vector. Default is null
     * @param {[number]} weights - Control point weights. If provided, must be one weight for each control point. Default is null
     * @param {[Array]} fitPoints - Array of fit points like [ [x1, y1], [x2, y2]... ]
     */
    constructor(
        controlPoints,
        degree = 3,
        knots = null,
        weights = null,
        fitPoints = []
    ) {
        super(["AcDbEntity", "AcDbSpline"]);
        if (controlPoints.length < degree + 1) {
            throw new Error(
                `For degree ${degree} spline, expected at least ${
                    degree + 1
                } control points, but received only ${controlPoints.length}`
            );
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
            throw new Error(
                `Invalid knot vector length. Expected ${
                    controlPoints.length + degree + 1
                } but received ${knots.length}.`
            );
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
            closed * 1 + periodic * 2 + rational * 4 + planar * 8 + linear * 16;

        // Not certain where the values of these flags came from so I'm going to leave them commented for now
        // const closed = 0
        // const periodic = 0
        // const rational = 1
        // const planar = 1
        // const linear = 0
        // const splineType = 1024 * closed + 128 * periodic + 8 * rational + 4 * planar + 2 * linear
    }

    tags(manager) {
        // https://www.autodesk.com/techpubs/autocad/acad2000/dxf/spline_dxf_06.htm
        manager.push(0, "SPLINE");
        super.tags(manager);
        manager.push(8, this.layer.name);

        manager.push(210, 0.0);
        manager.push(220, 0.0);
        manager.push(230, 1.0);

        manager.push(70, this.type);
        manager.push(71, this.degree);
        manager.push(72, this.knots.length);
        manager.push(73, this.controlPoints.length);
        manager.push(74, this.fitPoints.length);

        manager.push(42, 1e-7);
        manager.push(43, 1e-7);
        manager.push(44, 1e-10);

        this.knots.forEach((knot) => {
            manager.push(40, knot);
        });

        if (this.weights) {
            this.weights.forEach((weight) => {
                manager.push(41, weight);
            });
        }

        this.controlPoints.forEach((point) => {
            manager.point(point[0], point[1]);
        });
    }
}

module.exports = Spline;
