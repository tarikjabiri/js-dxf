const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Polyline3d extends DatabaseObject {
    /**
     * @param {array} points - Array of points like [ [x1, y1, z1], [x2, y2, z2]... ]
     */
    constructor(points) {
        super(["AcDbEntity", "AcDbPolyline3D"]);
        this.points = points;
        this.pointHandles = null;
    }

    assignVertexHandles(handleProvider) {
        this.pointHandles = this.points.map(() => handleProvider());
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "POLYLINE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addTag(66, 1);
        manager.addTag(70, 8);

        for (let i = 0; i < this.points.length; ++i) {
            manager.addTag(0, "VERTEX");
            manager.addTagsByElements([
                [100, "AcDbEntity"],
                [100, "AcDbVertex"],
            ]);
            manager.addTag(5, this.pointHandles[i].toString(16));
            manager.addTag(8, this.layer.name);
            manager.addTag(70, 0);
            manager.addPointTags(
                this.points[i][0],
                this.points[i][1],
                this.points[i][2]
            );
        }

        manager.addTag(0, "SEQEND");

        return manager.tags();
    }
}

module.exports = Polyline3d;
