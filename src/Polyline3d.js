const DatabaseObject = require("./DatabaseObject");
const Handle = require("./Handle");
const TagsManager = require("./TagsManager");
const Vertex = require("./Vertex");

class Polyline3d extends DatabaseObject {
    /**
     * @param {[number, number, number][]} points - Array of points like [ [x1, y1, z1], [x2, y2, z2]... ]
     */
    constructor(points) {
        super(["AcDbEntity", "AcDb3dPolyline"]);
        this.verticies = points.map((point) => {
            const [x, y, z] = point;
            const vertex = new Vertex(x, y, z);
            vertex.handleToOwner = this.handle;
            return vertex;
        });
        this.seqendHandle = Handle.handle();
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "POLYLINE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addTag(66, 1);
        manager.addTag(70, 0);
        manager.addPointTags(0, 0);

        this.verticies.forEach((vertex) => {
            vertex.layer = this.layer;
            manager.addTags(vertex.tags());
        });

        manager.addTag(0, "SEQEND");
        manager.addTag(5, this.seqendHandle);
        manager.addTag(100, "AcDbEntity");
        manager.addTag(8, this.layer.name);

        return manager.tags();
    }
}

module.exports = Polyline3d;
