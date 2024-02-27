const DatabaseObject = require("./DatabaseObject");

class Mesh extends DatabaseObject {
    /**
     * @param {array} vertices - Array of vertices like [ [x1, y1, z3], [x2, y2, z3]... ]
     * @param {array} faceIndices - Array of face indices like [ [v1, v2, v3]... ]
     */
    constructor(vertices, faceIndices) {
        super(["AcDbEntity"]);
        this.vertices = vertices;
        this.faceIndices = faceIndices;
    }

    tags(manager) {
        // https://help.autodesk.com/view/ACD/2024/ENU/?guid=GUID-4B9ADA67-87C8-4673-A579-6E4C76FF7025
        manager.push(0, "MESH");
        super.tags(manager);
        manager.push(67, 0);
        manager.push(8, this.layer.name);
        manager.push(6, "ByLayer");
        manager.push(370, 25);
        manager.push(48, 1.0);
        manager.push(60, 0);
        // Manually add subclass here as AutoCad seems picky about its position
        manager.push(100, "AcDbSubDMesh");
        manager.push(71, 2);
        manager.push(72, 0);
        manager.push(91, 0);
        manager.push(92, this.vertices.length);

        this.vertices.forEach(([x, y, z]) => {
            manager.point(x, y, z);
        });

        // Face index count plus each index
        const faceListCount = this.faceIndices.reduce(
            (total, indices) => total + indices.length + 1,
            0
        );

        manager.push(93, faceListCount);

        this.faceIndices.forEach((indices) => {
            manager.push(90, indices.length);

            indices.forEach((index) => {
                manager.push(90, index);
            });
        });

        manager.push(90, 0);
    }
}

module.exports = Mesh;
