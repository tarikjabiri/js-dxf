const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

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

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "LWPOLYLINE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addTag(6, "ByLayer");
        manager.addTag(62, 256);
        manager.addTag(370, -1);
        manager.addTag(90, this.points.length);
        manager.addTag(70, this.closed ? 1 : 0);

        this.points.forEach((point) => {
            const [x, y, z] = point;
            manager.addTag(10, x);
            manager.addTag(20, y);
            if (this.startWidth !== 0 || this.endWidth !== 0) {
                manager.addTag(40, this.startWidth);
                manager.addTag(41, this.endWidth);
            }
            if (z !== undefined) {
                manager.addTag(42, z);
            }
        });

        return manager.tags();
    }
}

module.exports = Polyline;
