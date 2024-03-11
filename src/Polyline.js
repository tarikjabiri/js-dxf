const DatabaseObject = require("./DatabaseObject");

class Polyline extends DatabaseObject {
    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2, bulge]... ]
     * @param {boolean} closed
     * @param {number} startWidth
     * @param {number} endWidth
     */
    constructor(points, closed = false, startWidth = 0, endWidth = 0) {
        super(["AcDbEntity", "AcDbPolyline"]);
        this.points = points;
        this.closed = closed;
        this.startWidth = startWidth;
        this.endWidth = endWidth;
    }

    tags(manager) {
        manager.push(0, "LWPOLYLINE");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.push(6, "ByLayer");
        manager.push(62, 256);
        manager.push(370, -1);
        manager.push(90, this.points.length);
        manager.push(70, this.closed ? 1 : 0);

        this.points.forEach((point) => {
            const [x, y, z] = point;
            manager.push(10, x);
            manager.push(20, y);
            if (this.startWidth !== 0 || this.endWidth !== 0) {
                manager.push(40, this.startWidth);
                manager.push(41, this.endWidth);
            }
            if (z !== undefined) manager.push(42, z);
        });
    }
}

module.exports = Polyline;
