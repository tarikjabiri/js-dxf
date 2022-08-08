require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class AppId extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbRegAppTableRecord"]);
        this.name = name;
    }

    tags(manager) {
        manager.push(0, "APPID");
        super.tags(manager);
        manager.push(2, this.name);
        /* No flags set */
        manager.push(70, 0);
    }
}

module.exports = AppId;

},{"./DatabaseObject":7,"./TagsManager":22}],2:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Arc extends DatabaseObject {
    /**
     * @param {number} x - Center x
     * @param {number} y - Center y
     * @param {number} r - radius
     * @param {number} startAngle - degree
     * @param {number} endAngle - degree
     */
    constructor(x, y, r, startAngle, endAngle) {
        super(["AcDbEntity", "AcDbCircle"]);
        this.x = x;
        this.y = y;
        this.r = r;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    tags(manager) {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        manager.push(0, "ARC");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x, this.y);
        manager.push(40, this.r);
        manager.push(100, "AcDbArc");
        manager.push(50, this.startAngle);
        manager.push(51, this.endAngle);
    }
}

module.exports = Arc;

},{"./DatabaseObject":7,"./TagsManager":22}],3:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Block extends DatabaseObject {
    constructor(name) {
        super(["AcDbEntity", "AcDbBlockBegin"]);
        this.name = name;
        this.end = new DatabaseObject(["AcDbEntity", "AcDbBlockEnd"]);
        this.recordHandle = null;
    }

    tags(manager) {
        manager.push(0, "BLOCK");
        super.tags(manager);
        manager.push(2, this.name);
        /* No flags set */
        manager.push(70, 0);
        /* Block top left corner */
        manager.point(0, 0);
        manager.push(3, this.name);
        /* xref path name - nothing */
        manager.push(1, "");

        //XXX dump content here

        manager.push(0, "ENDBLK");
        this.end.tags(manager);
    }
}

module.exports = Block;

},{"./DatabaseObject":7,"./TagsManager":22}],4:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class BlockRecord extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbBlockTableRecord"]);
        this.name = name;
    }

    tags(manager) {
        manager.push(0, "BLOCK_RECORD");
        super.tags(manager);
        manager.push(2, this.name);
        /* No flags set */
        manager.push(70, 0);
        /* Block explodability */
        manager.push(280, 0);
        /* Block scalability */
        manager.push(281, 1);
    }
}

module.exports = BlockRecord;

},{"./DatabaseObject":7,"./TagsManager":22}],5:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Circle extends DatabaseObject {
    /**
     * @param {number} x - Center x
     * @param {number} y - Center y
     * @param {number} r - radius
     */
    constructor(x, y, r) {
        super(["AcDbEntity", "AcDbCircle"]);
        this.x = x;
        this.y = y;
        this.r = r;
    }

    tags(manager) {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/circle_al_u05_c.htm
        manager.push(0, "CIRCLE");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x, this.y);
        manager.push(40, this.r);
    }
}

module.exports = Circle;

},{"./DatabaseObject":7,"./TagsManager":22}],6:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Cylinder extends DatabaseObject {
    /**
     * @param {number} x - Center x
     * @param {number} y - Center y
     * @param {number} z - Center z
     * @param {number} r - radius
     * @param {number} thickness - thickness
     * @param {number} extrusionDirectionX - Extrusion Direction x
     * @param {number} extrusionDirectionY - Extrusion Direction y
     * @param {number} extrusionDirectionZ - Extrusion Direction z
     */
    constructor(
        x,
        y,
        z,
        r,
        thickness,
        extrusionDirectionX,
        extrusionDirectionY,
        extrusionDirectionZ
    ) {
        super(["AcDbEntity", "AcDbCircle"]);
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        this.thickness = thickness;
        (this.extrusionDirectionX = extrusionDirectionX),
            (this.extrusionDirectionY = extrusionDirectionY),
            (this.extrusionDirectionZ = extrusionDirectionZ);
    }

    tags(manager) {
        manager.push(0, "CIRCLE");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x, this.y, this.z);
        manager.push(40, this.r);
        manager.push(39, this.thickness);
        manager.push(210, this.extrusionDirectionX);
        manager.push(220, this.extrusionDirectionY);
        manager.push(230, this.extrusionDirectionZ);
    }
}

module.exports = Cylinder;

},{"./DatabaseObject":7,"./TagsManager":22}],7:[function(require,module,exports){
const Handle = require("./Handle");
const TagsManager = require("./TagsManager");

class DatabaseObject {
    constructor(subclass = null) {
        this.handle = Handle.next();
        this.ownerObjectHandle = "0";
        this.subclassMarkers = [];
        if (subclass) {
            if (Array.isArray(subclass)) {
                this.subclassMarkers.push(...subclass);
            } else {
                this.subclassMarkers.push(subclass);
            }
        }
    }

    /**
     *
     * @param {TagsManager} manager
     */
    tags(manager) {
        manager.push(5, this.handle);
        manager.push(330, this.ownerObjectHandle);
        for (const s of this.subclassMarkers) {
            manager.push(100, s);
        }
    }
}

module.exports = DatabaseObject;

},{"./Handle":12,"./TagsManager":22}],8:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Dictionary extends DatabaseObject {
    constructor() {
        super("AcDbDictionary");
        this.children = {};
    }

    /**
     *
     * @param {*} name
     * @param {DatabaseObject} dictionary
     */
    addChildDictionary(name, dictionary) {
        dictionary.ownerObjectHandle = this.handle;
        this.children[name] = dictionary;
    }

    tags(manager) {
        manager.push(0, "DICTIONARY");
        super.tags(manager);
        /* Duplicate record cloning flag - keep existing */
        manager.push(281, 1);

        const entries = Object.entries(this.children);
        for (const entry of entries) {
            const [name, dic] = entry;
            manager.push(3, name);
            manager.push(350, dic.handle);
        }

        const children = Object.values(this.children);
        for (const c of children) {
            c.tags(manager);
        }
    }
}

module.exports = Dictionary;

},{"./DatabaseObject":7,"./TagsManager":22}],9:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const Table = require("./Table");
const TagsManager = require("./TagsManager");

class DimStyleTable extends Table {
    constructor(name) {
        super(name);
        this.subclassMarkers.push("AcDbDimStyleTable");
    }

    tags(manager) {
        manager.push(0, "TABLE");
        manager.push(2, this.name);
        DatabaseObject.prototype.tags.call(this, manager);
        manager.push(70, this.elements.length);
        /* DIMTOL */
        manager.push(71, 1);

        for (const e of this.elements) {
            e.tags(manager);
        }

        manager.push(0, "ENDTAB");
    }
}

module.exports = DimStyleTable;

},{"./DatabaseObject":7,"./Table":21,"./TagsManager":22}],10:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Ellipse extends DatabaseObject {
    /**
     * Creates an ellipse.
     * @param {number} x - Center x
     * @param {number} y - Center y
     * @param {number} majorAxisX - Endpoint x of major axis, relative to center
     * @param {number} majorAxisY - Endpoint y of major axis, relative to center
     * @param {number} axisRatio - Ratio of minor axis to major axis
     * @param {number} startAngle - Start angle
     * @param {number} endAngle - End angle
     */
    constructor(x, y, majorAxisX, majorAxisY, axisRatio, startAngle, endAngle) {
        super(["AcDbEntity", "AcDbEllipse"]);
        this.x = x;
        this.y = y;
        this.majorAxisX = majorAxisX;
        this.majorAxisY = majorAxisY;
        this.axisRatio = axisRatio;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    tags(manager) {
        // https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ellipse_al_u05_c.htm
        manager.push(0, "ELLIPSE");
        super.tags();
        manager.push(8, this.layer.name);
        manager.point(this.x, this.y);
        manager.push(11, this.majorAxisX);
        manager.push(21, this.majorAxisY);
        manager.push(31, 0);

        manager.push(40, this.axisRatio);
        manager.push(41, this.startAngle);
        manager.push(42, this.endAngle);
    }
}

module.exports = Ellipse;

},{"./DatabaseObject":7,"./TagsManager":22}],11:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Face extends DatabaseObject {
    constructor(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
        super(["AcDbEntity", "AcDbFace"]);
        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;
        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
        this.x3 = x3;
        this.y3 = y3;
        this.z3 = z3;
        this.x4 = x4;
        this.y4 = y4;
        this.z4 = z4;
    }

    tags(manager) {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/3dface_al_u05_c.htm
        manager.push(0, "3DFACE");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x1, this.y1, this.z1);

        manager.push(11, this.x2);
        manager.push(21, this.y2);
        manager.push(31, this.z2);

        manager.push(12, this.x3);
        manager.push(22, this.y3);
        manager.push(32, this.z3);

        manager.push(13, this.x4);
        manager.push(23, this.y4);
        manager.push(33, this.z4);
    }
}

module.exports = Face;

},{"./DatabaseObject":7,"./TagsManager":22}],12:[function(require,module,exports){
class Handle {
    static seed = 0;

    static next() {
        return (++Handle.seed).toString(16).toUpperCase();
    }

    static peek() {
        return (Handle.seed + 1).toString(16).toUpperCase();
    }
}

module.exports = Handle;

},{}],13:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Layer extends DatabaseObject {
    constructor(name, colorNumber, lineTypeName = null) {
        super(["AcDbSymbolTableRecord", "AcDbLayerTableRecord"]);
        this.name = name;
        this.colorNumber = colorNumber;
        this.lineTypeName = lineTypeName;
        this.shapes = [];
        this.trueColor = -1;
    }

    tags(manager) {
        manager.push(0, "LAYER");
        super.tags(manager);
        manager.push(2, this.name);
        if (this.trueColor !== -1) manager.push(420, this.trueColor);
        else manager.push(62, this.colorNumber);

        manager.push(70, 0);
        if (this.lineTypeName) manager.push(6, this.lineTypeName);

        /* Hard-pointer handle to PlotStyleName object; seems mandatory, but any value seems OK,
         * including 0.
         */
        manager.push(390, 1);
    }

    setTrueColor(color) {
        this.trueColor = color;
    }

    addShape(shape) {
        this.shapes.push(shape);
        shape.layer = this;
    }

    getShapes() {
        return this.shapes;
    }

    shapesTags(space, manager) {
        for (const shape of this.shapes) {
            shape.ownerObjectHandle = space.handle;
            shape.tags(manager);
        }
    }
}

module.exports = Layer;

},{"./DatabaseObject":7,"./TagsManager":22}],14:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Line extends DatabaseObject {
    constructor(x1, y1, x2, y2) {
        super(["AcDbEntity", "AcDbLine"]);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    tags(manager) {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        manager.push(0, "LINE");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x1, this.y1);

        manager.push(11, this.x2);
        manager.push(21, this.y2);
        manager.push(31, 0);
    }
}

module.exports = Line;

},{"./DatabaseObject":7,"./TagsManager":22}],15:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Line3d extends DatabaseObject {
    constructor(x1, y1, z1, x2, y2, z2) {
        super(["AcDbEntity", "AcDbLine"]);
        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;
        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
    }

    tags(manager) {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        manager.push(0, "LINE");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x1, this.y1, this.z1);

        manager.push(11, this.x2);
        manager.push(21, this.y2);
        manager.push(31, this.z2);
    }
}

module.exports = Line3d;

},{"./DatabaseObject":7,"./TagsManager":22}],16:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class LineType extends DatabaseObject {
    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
     */
    constructor(name, description, elements) {
        super(["AcDbSymbolTableRecord", "AcDbLinetypeTableRecord"]);
        this.name = name;
        this.description = description;
        this.elements = elements;
    }

    tags(manager) {
        // https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
        manager.push(0, "LTYPE");
        super.tags(manager);
        manager.push(2, this.name);
        manager.push(3, this.description);
        manager.push(70, 0);
        manager.push(72, 65);
        manager.push(73, this.elements.length);
        manager.push(40, this.getElementsSum());

        this.elements.forEach((element) => {
            manager.push(49, element);
            manager.push(74, 0);
        });
    }

    getElementsSum() {
        return this.elements.reduce((sum, element) => {
            return sum + Math.abs(element);
        }, 0);
    }
}

module.exports = LineType;

},{"./DatabaseObject":7,"./TagsManager":22}],17:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Point extends DatabaseObject {
    constructor(x, y) {
        super(["AcDbEntity", "AcDbPoint"]);
        this.x = x;
        this.y = y;
    }

    tags(manager) {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/point_al_u05_c.htm
        manager.push(0, "POINT");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x, this.y);
    }
}

module.exports = Point;

},{"./DatabaseObject":7,"./TagsManager":22}],18:[function(require,module,exports){
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

},{"./DatabaseObject":7,"./TagsManager":22}],19:[function(require,module,exports){
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
            vertex.ownerObjectHandle = this.handle;
            return vertex;
        });
        this.seqendHandle = Handle.next();
    }

    tags(manager) {
        manager.push(0, "POLYLINE");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.push(66, 1);
        manager.push(70, 0);
        manager.point(0, 0);

        this.verticies.forEach((vertex) => {
            vertex.layer = this.layer;
            vertex.tags(manager);
        });

        manager.push(0, "SEQEND");
        manager.push(5, this.seqendHandle);
        manager.push(100, "AcDbEntity");
        manager.push(8, this.layer.name);
    }
}

module.exports = Polyline3d;

},{"./DatabaseObject":7,"./Handle":12,"./TagsManager":22,"./Vertex":25}],20:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

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

},{"./DatabaseObject":7,"./TagsManager":22}],21:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Table extends DatabaseObject {
    constructor(name) {
        super("AcDbSymbolTable");
        this.name = name;
        this.elements = [];
    }

    add(element) {
        element.ownerObjectHandle = this.handle;
        this.elements.push(element);
    }

    tags(manager) {
        manager.push(0, "TABLE");
        manager.push(2, this.name);
        super.tags(manager);
        manager.push(70, this.elements.length);

        this.elements.forEach((element) => {
            element.tags(manager);
        });

        manager.push(0, "ENDTAB");
    }
}

module.exports = Table;

},{"./DatabaseObject":7,"./TagsManager":22}],22:[function(require,module,exports){
class TagsManager {
    constructor() {
        this.lines = [];
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    point(x, y, z = 0) {
        this.push(10, x);
        this.push(20, y);
        this.push(30, z);
    }

    /**
     *
     * @param {string} name The name of the section
     */
    start(name) {
        this.push(0, "SECTION");
        this.push(2, name);
    }

    end() {
        this.push(0, "ENDSEC");
    }

    addHeaderVariable(name, tagsElements) {
        this.push(9, `$${name}`);
        tagsElements.forEach((tagElement) => {
            this.push(tagElement[0], tagElement[1]);
        });
    }

    push(code, value) {
        this.lines.push(code, value);
    }

    toDxfString() {
        return this.lines.join("\n");
    }
}

module.exports = TagsManager;

},{}],23:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

const H_ALIGN_CODES = ["left", "center", "right"];
const V_ALIGN_CODES = ["baseline", "bottom", "middle", "top"];

class Text extends DatabaseObject {
    /**
     * @param {number} x - x
     * @param {number} y - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     * @param {string} [horizontalAlignment="left"] left | center | right
     * @param {string} [verticalAlignment="baseline"] baseline | bottom | middle | top
     */
    constructor(
        x,
        y,
        height,
        rotation,
        value,
        horizontalAlignment = "left",
        verticalAlignment = "baseline"
    ) {
        super(["AcDbEntity", "AcDbText"]);
        this.x = x;
        this.y = y;
        this.height = height;
        this.rotation = rotation;
        this.value = value;
        this.hAlign = horizontalAlignment;
        this.vAlign = verticalAlignment;
    }

    tags(manager) {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm
        manager.push(0, "TEXT");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x, this.y);
        manager.push(40, this.height);
        manager.push(1, this.value);
        manager.push(50, this.rotation);

        if (
            H_ALIGN_CODES.includes(this.hAlign, 1) ||
            V_ALIGN_CODES.includes(this.vAlign, 1)
        ) {
            manager.push(72, Math.max(H_ALIGN_CODES.indexOf(this.hAlign), 0));

            manager.push(11, this.x);
            manager.push(21, this.y);
            manager.push(31, 0);

            /* AutoCAD needs this one more time, yes, exactly here. */
            manager.push(100, "AcDbText");
            manager.push(73, Math.max(V_ALIGN_CODES.indexOf(this.vAlign), 0));
        } else {
            /* AutoCAD needs this one more time. */
            manager.push(100, "AcDbText");
        }
    }
}

module.exports = Text;

},{"./DatabaseObject":7,"./TagsManager":22}],24:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class TextStyle extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbTextStyleTableRecord"]);
        this.name = name;
    }

    tags(manager) {
        manager.push(0, "STYLE");
        super.tags(manager);
        manager.push(2, this.name);
        /* No flags set */
        manager.push(70, 0);
        manager.push(40, 0);
        manager.push(41, 1);
        manager.push(50, 0);
        manager.push(71, 0);
        manager.push(42, 1);
        manager.push(3, this.name);
        manager.push(4, "");
    }
}

module.exports = TextStyle;

},{"./DatabaseObject":7,"./TagsManager":22}],25:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Vertex extends DatabaseObject {
    /**
     *
     * @param {number} x The X coordinate
     * @param {number} y The Y coordinate
     * @param {number} z The Z coordinate
     */
    constructor(x, y, z) {
        super(["AcDbEntity", "AcDbVertex", "AcDb3dPolylineVertex"]);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    tags(manager) {
        manager.push(0, "VERTEX");
        super.tags(manager);
        manager.push(8, this.layer.name);
        manager.point(this.x, this.y, this.z);
        manager.push(70, 32);
    }
}

module.exports = Vertex;

},{"./DatabaseObject":7,"./TagsManager":22}],26:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Viewport extends DatabaseObject {
    constructor(name, height) {
        super(["AcDbSymbolTableRecord", "AcDbViewportTableRecord"]);
        this.name = name;
        this.height = height;
    }

    tags(manager) {
        manager.push(0, "VPORT");
        super.tags(manager);
        manager.push(2, this.name);
        manager.push(40, this.height);
        /* No flags set */
        manager.push(70, 0);
    }
}

module.exports = Viewport;

},{"./DatabaseObject":7,"./TagsManager":22}],"Drawing":[function(require,module,exports){
const LineType = require("./LineType");
const Layer = require("./Layer");
const Table = require("./Table");
const DimStyleTable = require("./DimStyleTable");
const TextStyle = require("./TextStyle");
const Viewport = require("./Viewport");
const AppId = require("./AppId");
const Block = require("./Block");
const BlockRecord = require("./BlockRecord");
const Dictionary = require("./Dictionary");
const Line = require("./Line");
const Line3d = require("./Line3d");
const Arc = require("./Arc");
const Circle = require("./Circle");
const Cylinder = require("./Cylinder");
const Text = require("./Text");
const Polyline = require("./Polyline");
const Polyline3d = require("./Polyline3d");
const Face = require("./Face");
const Point = require("./Point");
const Spline = require("./Spline");
const Ellipse = require("./Ellipse");
const TagsManager = require("./TagsManager");
const Handle = require("./Handle");

class Drawing {
    constructor() {
        this.layers = {};
        this.activeLayer = null;
        this.lineTypes = {};
        this.headers = {};
        this.tables = {};
        this.blocks = {};

        this.dictionary = new Dictionary();

        this.setUnits("Unitless");

        for (const ltype of Drawing.LINE_TYPES) {
            this.addLineType(ltype.name, ltype.description, ltype.elements);
        }

        for (const l of Drawing.LAYERS) {
            this.addLayer(l.name, l.colorNumber, l.lineTypeName);
        }

        this.setActiveLayer("0");

        // Must call this function
        this.generateAutocadExtras();
    }

    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
     */
    addLineType(name, description, elements) {
        this.lineTypes[name] = new LineType(name, description, elements);
        return this;
    }

    addLayer(name, colorNumber, lineTypeName) {
        this.layers[name] = new Layer(name, colorNumber, lineTypeName);
        return this;
    }

    setActiveLayer(name) {
        this.activeLayer = this.layers[name];
        return this;
    }

    addTable(name) {
        const table = new Table(name);
        this.tables[name] = table;
        return table;
    }

    /**
     *
     * @param {string} name The name of the block.
     * @returns {Block}
     */
    addBlock(name) {
        const block = new Block(name);
        this.blocks[name] = block;
        return block;
    }

    drawLine(x1, y1, x2, y2) {
        this.activeLayer.addShape(new Line(x1, y1, x2, y2));
        return this;
    }

    drawLine3d(x1, y1, z1, x2, y2, z2) {
        this.activeLayer.addShape(new Line3d(x1, y1, z1, x2, y2, z2));
        return this;
    }

    drawPoint(x, y) {
        this.activeLayer.addShape(new Point(x, y));
        return this;
    }

    drawRect(x1, y1, x2, y2, cornerLength, cornerBulge) {
        const w = x2 - x1;
        const h = y2 - y1;
        cornerBulge = cornerBulge || 0;
        let p = null;
        if (!cornerLength) {
            p = new Polyline(
                [
                    [x1, y1],
                    [x1, y1 + h],
                    [x1 + w, y1 + h],
                    [x1 + w, y1],
                ],
                true
            );
        } else {
            p = new Polyline(
                [
                    [x1 + w - cornerLength, y1, cornerBulge], // 1
                    [x1 + w, y1 + cornerLength], // 2
                    [x1 + w, y1 + h - cornerLength, cornerBulge], // 3
                    [x1 + w - cornerLength, y1 + h], // 4
                    [x1 + cornerLength, y1 + h, cornerBulge], // 5
                    [x1, y1 + h - cornerLength], // 6
                    [x1, y1 + cornerLength, cornerBulge], // 7
                    [x1 + cornerLength, y1], // 8
                ],
                true
            );
        }
        this.activeLayer.addShape(p);
        return this;
    }

    /**
     * Draw a regular convex polygon as a polyline entity.
     *
     * @see [Regular polygon | Wikipedia](https://en.wikipedia.org/wiki/Regular_polygon)
     *
     * @param {number} x - The X coordinate of the center of the polygon.
     * @param {number} y - The Y coordinate of the center of the polygon.
     * @param {number} numberOfSides - The number of sides.
     * @param {number} radius - The radius.
     * @param {number} rotation - The  rotation angle (in Degrees) of the polygon. By default 0.
     * @param {boolean} circumscribed - If `true` is a polygon in which each side is a tangent to a circle.
     * If `false` is a polygon in which all vertices lie on a circle. By default `false`.
     *
     * @returns {Drawing} - The current object of {@link Drawing}.
     */
    drawPolygon(
        x,
        y,
        numberOfSides,
        radius,
        rotation = 0,
        circumscribed = false
    ) {
        const angle = (2 * Math.PI) / numberOfSides;
        const vertices = [];
        let d = radius;
        const rotationRad = (rotation * Math.PI) / 180;
        if (circumscribed) d = radius / Math.cos(Math.PI / numberOfSides);
        for (let i = 0; i < numberOfSides; i++) {
            vertices.push([
                x + d * Math.sin(rotationRad + i * angle),
                y + d * Math.cos(rotationRad + i * angle),
            ]);
        }
        this.activeLayer.addShape(new Polyline(vertices, true));
        return this;
    }

    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     * @param {number} startAngle - degree
     * @param {number} endAngle - degree
     */
    drawArc(x1, y1, r, startAngle, endAngle) {
        this.activeLayer.addShape(new Arc(x1, y1, r, startAngle, endAngle));
        return this;
    }

    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     */
    drawCircle(x1, y1, r) {
        this.activeLayer.addShape(new Circle(x1, y1, r));
        return this;
    }

    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} z1 - Center z
     * @param {number} r - radius
     * @param {number} thickness - thickness
     * @param {number} extrusionDirectionX - Extrusion Direction x
     * @param {number} extrusionDirectionY - Extrusion Direction y
     * @param {number} extrusionDirectionZ - Extrusion Direction z
     */
    drawCylinder(
        x1,
        y1,
        z1,
        r,
        thickness,
        extrusionDirectionX,
        extrusionDirectionY,
        extrusionDirectionZ
    ) {
        this.activeLayer.addShape(
            new Cylinder(
                x1,
                y1,
                z1,
                r,
                thickness,
                extrusionDirectionX,
                extrusionDirectionY,
                extrusionDirectionZ
            )
        );
        return this;
    }

    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     * @param {string} [horizontalAlignment="left"] left | center | right
     * @param {string} [verticalAlignment="baseline"] baseline | bottom | middle | top
     */
    drawText(
        x1,
        y1,
        height,
        rotation,
        value,
        horizontalAlignment = "left",
        verticalAlignment = "baseline"
    ) {
        this.activeLayer.addShape(
            new Text(
                x1,
                y1,
                height,
                rotation,
                value,
                horizontalAlignment,
                verticalAlignment
            )
        );
        return this;
    }

    /**
     * @param {[number, number][]} points - Array of points like [ [x1, y1], [x2, y2]... ]
     * @param {boolean} closed - Closed polyline flag
     * @param {number} startWidth - Default start width
     * @param {number} endWidth - Default end width
     */
    drawPolyline(points, closed = false, startWidth = 0, endWidth = 0) {
        this.activeLayer.addShape(
            new Polyline(points, closed, startWidth, endWidth)
        );
        return this;
    }

    /**
     * @param {[number, number, number][]} points - Array of points like [ [x1, y1, z1], [x2, y2, z1]... ]
     */
    drawPolyline3d(points) {
        points.forEach((point) => {
            if (point.length !== 3) {
                throw "Require 3D coordinates";
            }
        });
        this.activeLayer.addShape(new Polyline3d(points));
        return this;
    }

    /**
     *
     * @param {number} trueColor - Integer representing the true color, can be passed as an hexadecimal value of the form 0xRRGGBB
     */
    setTrueColor(trueColor) {
        this.activeLayer.setTrueColor(trueColor);
        return this;
    }

    /**
     * Draw a spline.
     * @param {[Array]} controlPoints - Array of control points like [ [x1, y1], [x2, y2]... ]
     * @param {number} degree - Degree of spline: 2 for quadratic, 3 for cubic. Default is 3
     * @param {[number]} knots - Knot vector array. If null, will use a uniform knot vector. Default is null
     * @param {[number]} weights - Control point weights. If provided, must be one weight for each control point. Default is null
     * @param {[Array]} fitPoints - Array of fit points like [ [x1, y1], [x2, y2]... ]
     */
    drawSpline(
        controlPoints,
        degree = 3,
        knots = null,
        weights = null,
        fitPoints = []
    ) {
        this.activeLayer.addShape(
            new Spline(controlPoints, degree, knots, weights, fitPoints)
        );
        return this;
    }

    /**
     * Draw an ellipse.
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} majorAxisX - Endpoint x of major axis, relative to center
     * @param {number} majorAxisY - Endpoint y of major axis, relative to center
     * @param {number} axisRatio - Ratio of minor axis to major axis
     * @param {number} startAngle - Start angle
     * @param {number} endAngle - End angle
     */
    drawEllipse(
        x1,
        y1,
        majorAxisX,
        majorAxisY,
        axisRatio,
        startAngle = 0,
        endAngle = 2 * Math.PI
    ) {
        this.activeLayer.addShape(
            new Ellipse(
                x1,
                y1,
                majorAxisX,
                majorAxisY,
                axisRatio,
                startAngle,
                endAngle
            )
        );
        return this;
    }

    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} z1 - z
     * @param {number} x2 - x
     * @param {number} y2 - y
     * @param {number} z2 - z
     * @param {number} x3 - x
     * @param {number} y3 - y
     * @param {number} z3 - z
     * @param {number} x4 - x
     * @param {number} y4 - y
     * @param {number} z4 - z
     */
    drawFace(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
        this.activeLayer.addShape(
            new Face(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
        );
        return this;
    }

    _ltypeTable() {
        const t = new Table("LTYPE");
        const ltypes = Object.values(this.lineTypes);
        for (const lt of ltypes) t.add(lt);
        return t;
    }

    _layerTable(manager) {
        const t = new Table("LAYER");
        const layers = Object.values(this.layers);
        for (const l of layers) t.add(l);
        return t;
    }

    /**
     * @see https://www.autodesk.com/techpubs/autocad/acadr14/dxf/header_section_al_u05_c.htm
     * @see https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
     *
     * @param {string} variable
     * @param {array} values Array of "two elements arrays". [  [value1_GroupCode, value1_value], [value2_GroupCode, value2_value]  ]
     */
    header(variable, values) {
        this.headers[variable] = values;
        return this;
    }

    /**
     *
     * @param {string} unit see Drawing.UNITS
     */
    setUnits(unit) {
        let value =
            typeof Drawing.UNITS[unit] != "undefined"
                ? Drawing.UNITS[unit]
                : Drawing.UNITS["Unitless"];
        this.header("INSUNITS", [[70, Drawing.UNITS[unit]]]);
        return this;
    }

    /** Generate additional DXF metadata which are required to successfully open resulted document
     * in AutoDesk products. Call this method before serializing the drawing to get the most
     * compatible result.
     */
    generateAutocadExtras() {
        if (!this.headers["ACADVER"]) {
            /* AutoCAD 2007 version. */
            this.header("ACADVER", [[1, "AC1021"]]);
        }

        if (!this.lineTypes["ByBlock"]) {
            this.addLineType("ByBlock", "", []);
        }
        if (!this.lineTypes["ByLayer"]) {
            this.addLineType("ByLayer", "", []);
        }

        let vpTable = this.tables["VPORT"];
        if (!vpTable) {
            vpTable = this.addTable("VPORT");
        }
        let styleTable = this.tables["STYLE"];
        if (!styleTable) {
            styleTable = this.addTable("STYLE");
        }
        if (!this.tables["VIEW"]) {
            this.addTable("VIEW");
        }
        if (!this.tables["UCS"]) {
            this.addTable("UCS");
        }
        let appIdTable = this.tables["APPID"];
        if (!appIdTable) {
            appIdTable = this.addTable("APPID");
        }
        if (!this.tables["DIMSTYLE"]) {
            const t = new DimStyleTable("DIMSTYLE");
            this.tables["DIMSTYLE"] = t;
        }

        vpTable.add(new Viewport("*ACTIVE", 1000));

        /* Non-default text alignment is not applied without this entry. */
        styleTable.add(new TextStyle("standard"));

        appIdTable.add(new AppId("ACAD"));

        this.modelSpace = this.addBlock("*Model_Space");
        this.addBlock("*Paper_Space");

        const d = new Dictionary();
        this.dictionary.addChildDictionary("ACAD_GROUP", d);
    }

    _tagsManager() {
        const manager = new TagsManager();

        // Setup
        const blockRecordTable = new Table("BLOCK_RECORD");
        const blocks = Object.values(this.blocks);
        for (const b of blocks) {
            const r = new BlockRecord(b.name);
            blockRecordTable.add(r);
        }
        const ltypeTable = this._ltypeTable();
        const layerTable = this._layerTable();

        // Header section start.
        manager.start("HEADER");
        manager.addHeaderVariable("HANDSEED", [[5, Handle.peek()]]);
        const variables = Object.entries(this.headers);
        for (const v of variables) {
            const [name, values] = v;
            manager.addHeaderVariable(name, values);
        }
        manager.end();
        // Header section end.

        // Classes section start.
        manager.start("CLASSES");
        // Empty CLASSES section for compatibility
        manager.end();
        // Classes section end.

        // Tables section start.
        manager.start("TABLES");
        ltypeTable.tags(manager);
        layerTable.tags(manager);
        const tables = Object.values(this.tables);
        for (const t of tables) {
            t.tags(manager);
        }
        blockRecordTable.tags(manager);
        manager.end();
        // Tables section end.

        // Blocks section start.
        manager.start("BLOCKS");
        for (const b of blocks) {
            b.tags(manager);
        }
        manager.end();
        // Blocks section end.

        // Entities section start.
        manager.start("ENTITIES");
        const layers = Object.values(this.layers);
        for (const l of layers) {
            l.shapesTags(this.modelSpace, manager);
        }
        manager.end();
        // Entities section end.

        // Objects section start.
        manager.start("OBJECTS");
        this.dictionary.tags(manager);
        manager.end();
        // Objects section end.

        manager.push(0, "EOF");

        return manager;
    }

    toDxfString() {
        return this._tagsManager().toDxfString();
    }
}

//AutoCAD Color Index (ACI)
//http://sub-atomic.com/~moses/acadcolors.html
Drawing.ACI = {
    LAYER: 0,
    RED: 1,
    YELLOW: 2,
    GREEN: 3,
    CYAN: 4,
    BLUE: 5,
    MAGENTA: 6,
    WHITE: 7,
};

Drawing.LINE_TYPES = [
    { name: "CONTINUOUS", description: "______", elements: [] },
    { name: "DASHED", description: "_ _ _ ", elements: [5.0, -5.0] },
    { name: "DOTTED", description: ". . . ", elements: [0.0, -5.0] },
];

Drawing.LAYERS = [
    { name: "0", colorNumber: Drawing.ACI.WHITE, lineTypeName: "CONTINUOUS" },
];

//https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
Drawing.UNITS = {
    Unitless: 0,
    Inches: 1,
    Feet: 2,
    Miles: 3,
    Millimeters: 4,
    Centimeters: 5,
    Meters: 6,
    Kilometers: 7,
    Microinches: 8,
    Mils: 9,
    Yards: 10,
    Angstroms: 11,
    Nanometers: 12,
    Microns: 13,
    Decimeters: 14,
    Decameters: 15,
    Hectometers: 16,
    Gigameters: 17,
    "Astronomical units": 18,
    "Light years": 19,
    Parsecs: 20,
};

module.exports = Drawing;

},{"./AppId":1,"./Arc":2,"./Block":3,"./BlockRecord":4,"./Circle":5,"./Cylinder":6,"./Dictionary":8,"./DimStyleTable":9,"./Ellipse":10,"./Face":11,"./Handle":12,"./Layer":13,"./Line":14,"./Line3d":15,"./LineType":16,"./Point":17,"./Polyline":18,"./Polyline3d":19,"./Spline":20,"./Table":21,"./TagsManager":22,"./Text":23,"./TextStyle":24,"./Viewport":26}]},{},[]);
