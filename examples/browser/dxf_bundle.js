require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"Drawing":[function(require,module,exports){
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
const Text = require("./Text");
const Polyline = require("./Polyline");
const Polyline3d = require("./Polyline3d");
const Face = require("./Face");
const Point = require("./Point");
const Spline = require("./Spline");
const Ellipse = require("./Ellipse");
const TagsManager = require("./TagsManager");

class Drawing {
    constructor() {
        this.layers = {};
        this.activeLayer = null;
        this.lineTypes = {};
        this.headers = {};
        this.tables = {};
        this.blocks = {};
        this.handleCount = 0;

        this.ltypeTableHandle = this._generateHandle();
        this.layerTableHandle = this._generateHandle();
        this.blockRecordTableHandle = this._generateHandle();

        this.dictionary = new Dictionary();
        this._assignHandle(this.dictionary);

        this.setUnits("Unitless");

        for (const lineType of Drawing.LINE_TYPES) {
            this.addLineType(
                lineType.name,
                lineType.description,
                lineType.elements
            );
        }

        for (const layer of Drawing.LAYERS) {
            this.addLayer(layer.name, layer.colorNumber, layer.lineTypeName);
        }

        this.setActiveLayer("0");
    }

    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
     */
    addLineType(name, description, elements) {
        this.lineTypes[name] = this._assignHandle(
            new LineType(name, description, elements)
        );
        return this;
    }

    addLayer(name, colorNumber, lineTypeName) {
        this.layers[name] = this._assignHandle(
            new Layer(name, colorNumber, lineTypeName)
        );
        return this;
    }

    setActiveLayer(name) {
        this.activeLayer = this.layers[name];
        return this;
    }

    addTable(name) {
        const table = new Table(name);
        this._assignHandle(table);
        this.tables[name] = table;
        return table;
    }

    addBlock(name) {
        const block = new Block(name);
        this._assignHandle(block);
        block.setEndHandle(this._generateHandle());
        block.setRecordHandle(this._generateHandle());
        this.blocks[name] = block;
        return block;
    }

    drawLine(x1, y1, x2, y2) {
        this.activeLayer.addShape(this._assignHandle(new Line(x1, y1, x2, y2)));
        return this;
    }

    drawLine3d(x1, y1, z1, x2, y2, z2) {
        this.activeLayer.addShape(
            this._assignHandle(new Line3d(x1, y1, z1, x2, y2, z2))
        );
        return this;
    }

    drawPoint(x, y) {
        this.activeLayer.addShape(this._assignHandle(new Point(x, y)));
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

        this._assignHandle(p);
        this.activeLayer.addShape(p);
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
        this.activeLayer.addShape(
            this._assignHandle(new Arc(x1, y1, r, startAngle, endAngle))
        );
        return this;
    }

    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     */
    drawCircle(x1, y1, r) {
        this.activeLayer.addShape(this._assignHandle(new Circle(x1, y1, r)));
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
            this._assignHandle(
                new Text(
                    x1,
                    y1,
                    height,
                    rotation,
                    value,
                    horizontalAlignment,
                    verticalAlignment
                )
            )
        );
        return this;
    }

    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ]
     * @param {boolean} closed - Closed polyline flag
     * @param {number} startWidth - Default start width
     * @param {number} endWidth - Default end width
     */
    drawPolyline(points, closed = false, startWidth = 0, endWidth = 0) {
        const p = new Polyline(points, closed, startWidth, endWidth);
        this._assignHandle(p);
        this.activeLayer.addShape(p);
        return this;
    }

    /**
     * @param {array} points - Array of points like [ [x1, y1, z1], [x2, y2, z1]... ]
     */
    drawPolyline3d(points) {
        points.forEach((point) => {
            if (point.length !== 3) {
                throw "Require 3D coordinate";
            }
        });
        const p = new Polyline3d(points);
        this._assignHandle(p);
        p.assignVertexHandles(this._generateHandle.bind(this));
        this.activeLayer.addShape(p);
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
            this._assignHandle(
                new Spline(controlPoints, degree, knots, weights, fitPoints)
            )
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
            this._assignHandle(
                new Ellipse(
                    x1,
                    y1,
                    majorAxisX,
                    majorAxisY,
                    axisRatio,
                    startAngle,
                    endAngle
                )
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
            this._assignHandle(
                new Face(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
            )
        );
        return this;
    }

    _generateHandle() {
        return ++this.handleCount;
    }

    _assignHandle(entity) {
        entity.handle = this._generateHandle();
        return entity;
    }

    _getLtypeTableTags() {
        const t = new Table("LTYPE");
        t.handle = this.ltypeTableHandle;
        Object.values(this.lineTypes).forEach((v) => t.add(v));
        return t.tags();
    }

    _getLayerTableTags() {
        const t = new Table("LAYER");
        t.handle = this.layerTableHandle;
        Object.values(this.layers).forEach((v) => t.add(v));
        return t.tags();
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
            this._assignHandle(t);
            this.tables["DIMSTYLE"] = t;
        }

        vpTable.add(this._assignHandle(new Viewport("*ACTIVE", 1000)));

        /* Non-default text alignment is not applied without this entry. */
        styleTable.add(this._assignHandle(new TextStyle("standard")));

        appIdTable.add(this._assignHandle(new AppId("ACAD")));

        this.addBlock("*Model_Space");
        this.addBlock("*Paper_Space");

        const d = new Dictionary();
        this._assignHandle(d);
        this.dictionary.addChildDictionary("ACAD_GROUP", d);
    }

    tags() {
        const manager = new TagsManager();

        // Header section start.
        manager.addSectionBegin("HEADER");
        manager.addHeaderVariable("HANDSEED", [
            [5, (this.handleCount + 1).toString(16)],
        ]);
        this.headers.forEach((variable) => {
            manager.addHeaderVariable(variable, this.headers[variable]);
        });
        manager.addSectionEnd();
        // Header section end.

        // Classes section start.
        manager.addSectionBegin("CLASSES");
        // Empty CLASSES section for compatibility
        manager.addSectionEnd();
        // Classes section end.

        // Tables section start.
        manager.addSectionBegin("TABLES");
        manager.addTags(this._getLtypeTableTags());
        manager.addTags(this._getLayerTableTags());
        Object.values(this.tables).forEach((table) => {
            manager.addTags(table.tags());
        });
        const blockRecordTable = new Table("BLOCK_RECORD");
        blockRecordTable.handle = this.blockRecordTableHandle;
        Object.values(this.blocks).forEach((b) => {
            const rec = new BlockRecord(b.name);
            rec.handle = b.recordHandle;
            blockRecordTable.add(rec);
        });
        manager.addTags(blockRecordTable.tags());
        manager.addSectionEnd();
        // Tables section end.

        // Blocks section start.
        manager.addSectionBegin("BLOCKS");
        Object.values(this.blocks).forEach((block) => {
            manager.addTags(block.tags());
        });
        manager.addSectionEnd();
        // Blocks section end.

        // Entities section start.
        manager.addSectionBegin("ENTITIES");
        Object.values(this.layers).forEach((layer) => {
            manager.addTags(layer.shapesTags());
        });
        manager.addSectionEnd();
        // Entities section end.

        // Objects section start.
        manager.addSectionBegin("OBJECTS");
        manager.addTags(this.dictionary.tags());
        manager.addSectionEnd();
        // Objects section end.

        manager.addTag(0, "EOF");

        return manager.tags;
    }

    toDxfString() {
        return this.tags().reduce((dxfString, tag) => {
            return `${dxfString}${tag.dxfString()}`;
        }, "");
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

},{"./AppId":1,"./Arc":2,"./Block":3,"./BlockRecord":4,"./Circle":5,"./Dictionary":7,"./DimStyleTable":8,"./Ellipse":9,"./Face":10,"./Layer":11,"./Line":12,"./Line3d":13,"./LineType":14,"./Point":15,"./Polyline":16,"./Polyline3d":17,"./Spline":18,"./Table":19,"./TagsManager":21,"./Text":22,"./TextStyle":23,"./Viewport":24}],1:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class AppId extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbRegAppTableRecord"]);
        this.name = name;
    }

    tags() {
        const manager = new TagsManager();
        manager.addTag(0, "APPID");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        /* No flags set */
        manager.addTag(70, 0);
        return manager.tags();
    }
}

module.exports = AppId;

},{"./DatabaseObject":6,"./TagsManager":21}],2:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Arc extends DatabaseObject {
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     * @param {number} startAngle - degree
     * @param {number} endAngle - degree
     */
    constructor(x1, y1, r, startAngle, endAngle) {
        super(["AcDbEntity", "AcDbArc"]);
        this.x1 = x1;
        this.y1 = y1;
        this.r = r;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        manager.addTag(0, "ARC");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x1, this.y1);
        manager.addTag(40, this.r);
        manager.addTag(50, this.startAngle);
        manager.addTag(51, this.endAngle);

        return manager.tags();
    }
}

module.exports = Arc;

},{"./DatabaseObject":6,"./TagsManager":21}],3:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Block extends DatabaseObject {
    constructor(name) {
        super(["AcDbEntity", "AcDbBlockBegin"]);
        this.name = name;
        this.end = new DatabaseObject(["AcDbEntity", "AcDbBlockEnd"]);
        this.recordHandle = null;
    }

    /* Internal method to set handle value for block end separator entity. */
    setEndHandle(handle) {
        this.end.handle = handle;
    }

    /* Internal method to set handle value for block record in block records table. */
    setRecordHandle(handle) {
        this.recordHandle = handle;
    }

    //XXX need some API to add content

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "BLOCK");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        /* No flags set */
        manager.addTag(70, 0);
        /* Block top left corner */
        manager.addPointTags(0, 0);
        manager.addTag(3, this.name);
        /* xref path name - nothing */
        manager.addTag(1, "");

        //XXX dump content here

        manager.addTag(0, "ENDBLK");
        manager.addTags(this.end.tags());

        return manager.tags();
    }
}

module.exports = Block;

},{"./DatabaseObject":6,"./TagsManager":21}],4:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class BlockRecord extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbBlockTableRecord"]);
        this.name = name;
    }

    tags() {
        const manager = new TagsManager();
        manager.addTag(0, "BLOCK_RECORD");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        /* No flags set */
        manager.addTag(70, 0);
        /* Block explodability */
        manager.addTag(280, 0);
        /* Block scalability */
        manager.addTag(281, 1);
        return manager.tags();
    }
}

module.exports = BlockRecord;

},{"./DatabaseObject":6,"./TagsManager":21}],5:[function(require,module,exports){
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

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/circle_al_u05_c.htm
        manager.addTag(0, "CIRCLE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x, this.y);
        manager.addTag(40, this.r);

        return manager.tags();
    }
}

module.exports = Circle;

},{"./DatabaseObject":6,"./TagsManager":21}],6:[function(require,module,exports){
const TagsManager = require("./TagsManager");

class DatabaseObject {
    constructor(subclass = null) {
        /* Handle should be assigned externally by document instance */
        this.handle = null;
        this.ownerHandle = null;
        this.subclassMarkers = [];
        if (subclass) {
            if (Array.isArray(subclass)) {
                for (const sc of subclass) {
                    this.subclassMarkers.push(sc);
                }
            } else {
                this.subclassMarkers.push(subclass);
            }
        }
    }

    /**
     * Get the array of tags.
     * @returns {Tag[]}
     */
    tags() {
        const manager = new TagsManager();

        if (this.handle) {
            manager.addTag(5, this.handle.toString(16));
        } else {
            console.warn("No handle assigned to entity", this);
        }
        if (this.ownerHandle) {
            manager.addTag(330, this.ownerHandle.toString(16));
        }
        for (const marker of this.subclassMarkers) {
            manager.addTag(100, marker);
        }

        return manager.tags();
    }

    /**
     * Get the dxf string
     * @returns {String}
     */
    toDxfString() {
        const manager = new TagsManager();
        manager.addTags(this.tags());
        return manager.toDxfString();
    }
}

module.exports = DatabaseObject;

},{"./TagsManager":21}],7:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Dictionary extends DatabaseObject {
    constructor() {
        super("AcDbDictionary");
        this.children = {};
    }

    addChildDictionary(name, dictionary) {
        if (!this.handle) {
            throw new Error("Handle must be set before adding children");
        }
        dictionary.ownerHandle = this.handle;
        this.children[name] = dictionary;
    }

    tags() {
        const manager = new TagsManager();
        manager.addTag(0, "DICTIONARY");
        manager.addTags(super.tags());
        /* Duplicate record cloning flag - keep existing */
        manager.addTag(281, 1);

        for (const [name, item] of Object.entries(this.children)) {
            manager.addTag(3, name);
            manager.addTag(350, item.handle.toString(16));
        }

        for (const item of Object.values(this.children)) {
            manager.addTags(item.tags());
        }

        return manager.tags();
    }
}

module.exports = Dictionary;

},{"./DatabaseObject":6,"./TagsManager":21}],8:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const Table = require("./Table");
const TagsManager = require("./TagsManager");

class DimStyleTable extends Table {
    constructor(name) {
        super(name);
        this.subclassMarkers.push("AcDbDimStyleTable");
    }

    tags() {
        const manager = new TagsManager();
        manager.addTag(0, "TABLE");
        manager.addTag(2, this.name);
        manager.addTags(DatabaseObject.prototype.tags.call(this));
        manager.addTag(70, this.elements.length);
        /* DIMTOL */
        manager.addTag(71, 1);

        for (const element of this.elements) {
            manager.addTags(element.tags());
        }

        manager.addTag(0, "ENDTAB");
        return manager.tags();
    }
}

module.exports = DimStyleTable;

},{"./DatabaseObject":6,"./Table":19,"./TagsManager":21}],9:[function(require,module,exports){
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

    tags() {
        const manager = new TagsManager();

        // https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ellipse_al_u05_c.htm
        manager.addTag(0, "ELLIPSE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x, this.y);
        manager.addTag(11, this.majorAxisX);
        manager.addTag(21, this.majorAxisY);
        manager.addTag(31, 0);

        manager.addTag(40, this.axisRatio);
        manager.addTag(41, this.startAngle);
        manager.addTag(42, this.endAngle);

        return manager.tags();
    }
}

module.exports = Ellipse;

},{"./DatabaseObject":6,"./TagsManager":21}],10:[function(require,module,exports){
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

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/3dface_al_u05_c.htm
        manager.addTag(0, "3DFACE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x1, this.y1, this.z1);
        manager.addTagsByElements([
            [11, this.x2],
            [21, this.y2],
            [31, this.z2],
        ]);
        manager.addTagsByElements([
            [12, this.x3],
            [22, this.y3],
            [32, this.z3],
        ]);
        manager.addTagsByElements([
            [13, this.x4],
            [23, this.y4],
            [33, this.z4],
        ]);

        return manager.tags();
    }
}

module.exports = Face;

},{"./DatabaseObject":6,"./TagsManager":21}],11:[function(require,module,exports){
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

    tags() {
        const manager = new TagsManager();
        manager.addTag(0, "LAYER");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        if (this.trueColor !== -1) {
            manager.addTag(420, this.trueColor);
        } else {
            manager.addTag(62, this.colorNumber);
        }
        manager.addTag(70, 0);
        if (this.lineTypeName) {
            manager.addTag(6, this.lineTypeName);
        }
        /* Hard-pointer handle to PlotStyleName object; seems mandatory, but any value seems OK,
         * including 0.
         */
        manager.addTag(390, 1);
        return manager.tags();
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

    shapesTags() {
        return this.shapes.reduce((tags, shape) => {
            return [...tags, ...shape.tags()];
        }, []);
    }

    shapesToDxf() {
        return this.shapes.reduce((dxfString, shape) => {
            return `${dxfString}${shape.toDxfString()}`;
        }, "");
    }
}

module.exports = Layer;

},{"./DatabaseObject":6,"./TagsManager":21}],12:[function(require,module,exports){
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

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        manager.addTag(0, "LINE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x1, this.y1);
        manager.addTagsByElements([
            [11, this.x2],
            [21, this.y2],
            [31, 0],
        ]);

        return manager.tags();
    }
}

module.exports = Line;

},{"./DatabaseObject":6,"./TagsManager":21}],13:[function(require,module,exports){
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

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        manager.addTag(0, "LINE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x1, this.y1, this.z1);
        manager.addTagsByElements([
            [11, this.x2],
            [21, this.y2],
            [31, this.z2],
        ]);

        return manager.tags();
    }
}

module.exports = Line3d;

},{"./DatabaseObject":6,"./TagsManager":21}],14:[function(require,module,exports){
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

    tags() {
        const manager = new TagsManager();

        // https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
        manager.addTag(0, "STYLE");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        manager.addTag(3, this.description);
        manager.addTag(70, 0);
        manager.addTag(72, 65);
        manager.addTag(73, this.elements.length);
        manager.addTag(40, this.getElementsSum());

        this.elements.forEach((element) => {
            manager.addTag(49, element);
            manager.addTag(74, 0);
        });

        return manager.tags();
    }

    getElementsSum() {
        return this.elements.reduce((sum, element) => {
            return sum + Math.abs(element);
        }, 0);
    }
}

module.exports = LineType;

},{"./DatabaseObject":6,"./TagsManager":21}],15:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Point extends DatabaseObject {
    constructor(x, y) {
        super(["AcDbEntity", "AcDbPoint"]);
        this.x = x;
        this.y = y;
    }

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/point_al_u05_c.htm
        manager.addTag(0, "LINE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x, this.y);

        return manager.tags();
    }
}

module.exports = Point;

},{"./DatabaseObject":6,"./TagsManager":21}],16:[function(require,module,exports){
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

        for (const point of this.points) {
            manager.addTag(10, point[0]);
            manager.addTag(20, point[1]);
            if (this.startWidth !== 0 || this.endWidth !== 0) {
                manager.addTag(40, this.startWidth);
                manager.addTag(41, this.endWidth);
            }
            if (point[2] !== undefined) {
                manager.addTag(42, point[2]);
            }
        }

        return manager.tags();
    }
}

module.exports = Polyline;

},{"./DatabaseObject":6,"./TagsManager":21}],17:[function(require,module,exports){
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

},{"./DatabaseObject":6,"./TagsManager":21}],18:[function(require,module,exports){
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

    tags() {
        const manager = new TagsManager();

        // https://www.autodesk.com/techpubs/autocad/acad2000/dxf/spline_dxf_06.htm
        manager.addTag(0, "SPLINE");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addTagsByElements([
            [210, 0.0],
            [220, 0.0],
            [230, 1.0],
        ]);

        manager.addTag(70, this.type);
        manager.addTag(71, this.degree);
        manager.addTag(72, this.knots.length);
        manager.addTag(73, this.controlPoints.length);
        manager.addTag(74, this.fitPoints.length);

        manager.addTagsByElements([
            [42, 1e-7],
            [43, 1e-7],
            [44, 1e-10],
        ]);

        this.knots.forEach((knot) => {
            manager.addTag(40, knot);
        });

        if (this.weights) {
            this.weights.forEach((weight) => {
                manager.addTag(41, weight);
            });
        }

        this.controlPoints.forEach((point) => {
            manager.addPointTags(point[0], point[1]);
        });

        return manager.tags();
    }
}

module.exports = Spline;

},{"./DatabaseObject":6,"./TagsManager":21}],19:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Table extends DatabaseObject {
    constructor(name) {
        super("AcDbSymbolTable");
        this.name = name;
        this.elements = [];
    }

    add(element) {
        this.elements.push(element);
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "TABLE");
        manager.addTag(2, this.name);
        manager.addTags(super.tags());
        manager.addTag(70, this.elements.length);

        this.elements.forEach((element) => {
            manager.addTags(element.tags());
        });

        manager.addTag(0, "ENDTAB");

        return manager.tags();
    }
}

module.exports = Table;

},{"./DatabaseObject":6,"./TagsManager":21}],20:[function(require,module,exports){
class Tag {
  constructor(groupCode, value) {
    this._code = groupCode;
    this._value = value;
  }

  toDxfString() {
    return `${this._code}\n${this._value}\n`;
  }
}

module.exports = Tag;

},{}],21:[function(require,module,exports){
const Tag = require("./Tag");

class TagsManager {
    constructor() {
        this._tags = [];
    }

    /**
     *
     * @param {number} x X coordinate of the point.
     * @param {number} y Y coordinate of the point.
     * @param {number} z Z coordinate of the point.
     */
    addPointTags(x, y, z = 0) {
        this.addTag(10, x);
        this.addTag(20, y);
        this.addTag(30, z);
    }

    addSectionBegin(name) {
        this.addTag(0, "SECTION");
        this.addTag(2, name);
    }

    addSectionEnd() {
        this.addTag(0, "ENDSEC");
    }

    addHeaderVariable(name, tagsElements) {
        this.addTag(9, name);
        tagsElements.forEach((tagElement) => {
            this.addTag(tagElement[0], tagElement[1]);
        });
    }

    /**
     *
     * @param {[number, string|number][]} tagsElements
     */
    addTagsByElements(tagsElements) {
        tagsElements.forEach((tagElement) => {
            this.addTag(tagElement[0], tagElement[1]);
        });
    }

    /**
     *  Add a tag to the array of tags.
     * @param {number} groupCode
     * @param {number|string} value
     */
    addTag(groupCode, value) {
        this._tags.push(new Tag(groupCode, value));
    }

    /**
     * Append an array of tags to the array of tags
     * @param {Tag[]} tags
     */
    addTags(tags) {
        this._tags.push(...tags);
    }

    /**
     * Get the array of tags.
     * @returns {Tag[]}
     */
    tags() {
        return this._tags;
    }

    /**
     * Get the dxf string.
     * @returns {string}
     */
    toDxfString() {
        return this._tags.reduce((dxfString, tag) => {
            return `${dxfString}${tag.dxfString()}`;
        }, "");
    }
}

module.exports = TagsManager;

},{"./Tag":20}],22:[function(require,module,exports){
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

    tags() {
        const manager = new TagsManager();

        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm
        manager.addTag(0, "TEXT");
        manager.addTags(super.tags());
        manager.addTag(8, this.layer.name);
        manager.addPointTags(this.x, this.y);
        manager.addTag(40, this.height);
        manager.addTag(1, this.value);
        manager.addTag(50, this.rotation);

        if (
            H_ALIGN_CODES.includes(this.hAlign, 1) ||
            V_ALIGN_CODES.includes(this.vAlign, 1)
        ) {
            manager.addTag(72, Math.max(H_ALIGN_CODES.indexOf(this.hAlign), 0));
            manager.addTagsByElements([
                [11, this.x],
                [21, this.y],
                [31, 0],
            ]);
            /* AutoCAD needs this one more time, yes, exactly here. */
            manager.addTag(100, "AcDbText");
            manager.addTag(73, Math.max(V_ALIGN_CODES.indexOf(this.vAlign), 0));
        } else {
            /* AutoCAD needs this one more time. */
            manager.addTag(100, "AcDbText");
        }

        return manager.tags();
    }
}

module.exports = Text;

},{"./DatabaseObject":6,"./TagsManager":21}],23:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class TextStyle extends DatabaseObject {
    constructor(name) {
        super(["AcDbSymbolTableRecord", "AcDbTextStyleTableRecord"]);
        this.name = name;
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "STYLE");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        /* No flags set */
        manager.addTag(70, 0);
        manager.addTag(40, 0);
        manager.addTag(41, 1);
        manager.addTag(50, 0);
        manager.addTag(71, 0);
        manager.addTag(42, 1);
        manager.addTag(3, this.name);
        manager.addTag(4, "");

        return manager.tags();
    }
}

module.exports = TextStyle;

},{"./DatabaseObject":6,"./TagsManager":21}],24:[function(require,module,exports){
const DatabaseObject = require("./DatabaseObject");
const TagsManager = require("./TagsManager");

class Viewport extends DatabaseObject {
    constructor(name, height) {
        super(["AcDbSymbolTableRecord", "AcDbViewportTableRecord"]);
        this.name = name;
        this.height = height;
    }

    tags() {
        const manager = new TagsManager();

        manager.addTag(0, "VPORT");
        manager.addTags(super.tags());
        manager.addTag(2, this.name);
        manager.addTag(40, this.height);
        /* No flags set */
        manager.addTag(70, 0);

        return manager.tags();
    }
}

module.exports = Viewport;

},{"./DatabaseObject":6,"./TagsManager":21}]},{},[]);
