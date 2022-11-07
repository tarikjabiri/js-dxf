declare module "dxf-writer" {
    export type Unit =
        | "Unitless"
        | "Inches"
        | "Feet"
        | "Miles"
        | "Millimeters"
        | "Centimeters"
        | "Meters"
        | "Kilometers"
        | "Microinches"
        | "Mils"
        | "Yards"
        | "Angstroms"
        | "Nanometers"
        | "Microns"
        | "Decimeters"
        | "Decameters"
        | "Hectometers"
        | "Gigameters"
        | "Astronomical units"
        | "Light years"
        | "Parsecs";

    export type HorizontalAlignment = "left" | "center" | "right";
    export type VerticalAlignment = "baseline" | "bottom" | "middle" | "top";

    export type Point2D = [number, number];
    export type Point3D = [number, number, number];

    // [GroupCode, value]
    export type HeaderValue = [number, number];

    export abstract class RenderableToDxf {
        toDxfString(): string;
    }

    abstract class Block {
        constructor(name: string);
        tags(manager: TagsManager): void;
    }

    export abstract class TagsManager extends RenderableToDxf {
        point(x: number, y: number, z?: number): void;
        start(name: string): void;
        end(): void;
        addHeaderVariable(name: string, tagsElements: HeaderValue[]): void;
        push(code: string | number, value: string | number): void;
    }


    export class Arc extends RenderableToDxf {
        public x1: number;
        public y1: number;
        public r: number;
        public startAngle: number;
        public endAngle: number;

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         * @param {number} startAngle - degree
         * @param {number} endAngle - degree
         */
        constructor(
            x1: number,
            y1: number,
            r: number,
            startAngle: number,
            endAngle: number
        );
        tags(manager: TagsManager): void;
    }

    export class Circle extends RenderableToDxf {
        public x1: number;
        public y1: number;
        public r: number;

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         */
        constructor(x1: number, y1: number, r: number);
        tags(manager: TagsManager): void;
    }

    export class Cylinder extends RenderableToDxf {
        public x1: number;
        public y1: number;
        public z1: number;
        public r: number;
        public thickness: number;
        public extrusionDirectionX: number;
        public extrusionDirectionY: number;
        public extrusionDirectionZ: number;

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
        constructor(
            x1: number,
            y1: number,
            z1: number,
            r: number,
            thickness: number,
            extrusionDirectionX: number,
            extrusionDirectionY: number,
            extrusionDirectionZ: number
        );
        tags(manager: TagsManager): void;
    }

    export class Face extends RenderableToDxf {
        public x1: number;
        public y1: number;
        public z1: number;
        public x2: number;
        public y2: number;
        public z2: number;
        public x3: number;
        public y3: number;
        public z3: number;
        public x4: number;
        public y4: number;
        public z4: number;

        constructor(
            x1: number,
            y1: number,
            z1: number,
            x2: number,
            y2: number,
            z2: number,
            x3: number,
            y3: number,
            z3: number,
            x4: number,
            y4: number,
            z4: number
        );
        tags(manager: TagsManager): void;
    }

    export class Layer extends RenderableToDxf {
        public name: string;
        public colorNumber: number;
        public lineTypeName: string;
        public shapes: RenderableToDxf[];
        public trueColor: number;

        constructor(name: string, colorNumber: number, lineTypeName: string);
        toDxfString(): string;

        setTrueColor(color: number): void;
        addShape(shape: RenderableToDxf): void;
        getShapes(): Array<RenderableToDxf>;
        shapesTags(space: Block, manager: TagsManager): void;
        tags(manager: TagsManager): void;
    }

    export class Line extends RenderableToDxf {
        public x1: number;
        public y1: number;
        public x2: number;
        public y2: number;

        constructor(x1: number, y1: number, x2: number, y2: number);
        tags(manager: TagsManager): void;
    }

    export class LineType extends RenderableToDxf {
        public name: string;
        public description: string;
        public elements: Array<number>;
        /**
         * @param {string} name
         * @param {string} description
         * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
         */
        constructor(name: string, description: string, elements: Array<number>);
        tags(manager: TagsManager): void;
        getElementsSum(): number;
    }

    export class Point extends RenderableToDxf {
        public x: number;
        public y: number;

        constructor(x: number, y: number);
        tags(manager: TagsManager): void;
    }

    export class Polyline extends RenderableToDxf {
        public points: Array<Point2D>;

        constructor(points: Array<Point2D>);
        tags(manager: TagsManager): void;
    }

    export class Polyline3D extends RenderableToDxf {
        public points: Array<Point3D>;

        constructor(points: Array<Point3D>);
        tags(manager: TagsManager): void;
    }

    export class Text extends RenderableToDxf {
        public x1: number;
        public y1: number;
        public height: number;
        public rotation: number;
        public value: string;
        public horizontalAlignment: HorizontalAlignment;
        public verticalAlignment: VerticalAlignment;
        /**
         * @param {number} x1 - x
         * @param {number} y1 - y
         * @param {number} height - Text height
         * @param {number} rotation - Text rotation
         * @param {string} value - the string itself
         * @param {HorizontalAlignment} [horizontalAlignment="left"] left | center | right
         * @param {VerticalAlignment} [verticalAlignment="baseline"] baseline | bottom | middle | top
         */
        constructor(
            x1: number,
            y1: number,
            height: number,
            rotation: number,
            value: string,
            horizontalAlignment?: HorizontalAlignment,
            verticalAlignment?: VerticalAlignment
        );
        tags(manager: TagsManager): void;
    }

    export type ACIKey =
        | "LAYER"
        | "RED"
        | "YELLOW"
        | "GREEN"
        | "CYAN"
        | "BLUE"
        | "MAGENTA"
        | "WHITE";

    export default class Drawing extends RenderableToDxf {
        constructor();

        layers: { [key: string]: Layer };
        activeLayer: Layer | null;
        lineTypes: { [key: string]: LineType };
        headers: { [key: string]: Array<HeaderValue> };

        /**
         * @param {string} name
         * @param {string} description
         * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
         */
        addLineType(
            name: string,
            description: string,
            elements: Array<number>
        ): Drawing;

        addLayer(
            name: string,
            colorNumber: number,
            lineTypeName: string
        ): Drawing;
        setActiveLayer(name: string): Drawing;
        drawLine(x1: number, y1: number, x2: number, y2: number): Drawing;
        drawPoint(x: number, y: number): Drawing;

        /**
         * draws a closed rectangular polyline with option for round or diagonal corners
         * @param {number} x1
         * @param {number} y1
         * @param {number} x2
         * @param {number} y2
         * @param {number} cornerLength given P (the 90deg corner point), and P1 (the point where arc begins), where cornerLength is the length of P to P1
         * @param {number} cornerBulge defaults to 0, for diagonal corners
         */
        drawRect(
            x1: number,
            y1: number,
            x2: number,
            y2: number,
            cornerLength?: number,
            cornerBulge?: number
        ): Drawing;

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
            x: number,
            y: number,
            numberOfSides: number,
            radius: number,
            rotation?: number,
            circumscribed?: boolean
        ): Drawing;

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         * @param {number} startAngle - degree
         * @param {number} endAngle - degree
         */
        drawArc(
            x1: number,
            y1: number,
            r: number,
            startAngle: number,
            endAngle: number
        ): Drawing;

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         */
        drawCircle(x1: number, y1: number, r: number): Drawing;

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
            x1: number,
            y1: number,
            z1: number,
            r: number,
            thickness: number,
            extrusionDirectionX: number,
            extrusionDirectionY: number,
            extrusionDirectionZ: number
        ): Drawing;

        /**
         * @param {number} x1 - x
         * @param {number} y1 - y
         * @param {number} height - Text height
         * @param {number} rotation - Text rotation
         * @param {string} value - the string itself
         * @param {HorizontalAlignment} [horizontalAlignment="left"] left | center | right
         * @param {VerticalAlignment} [verticalAlignment="baseline"] baseline | bottom | middle | top
         */
        drawText(
            x1: number,
            y1: number,
            height: number,
            rotation: number,
            value: string,
            horizontalAlignment?: HorizontalAlignment,
            verticalAlignment?: VerticalAlignment
        ): Drawing;

        /**
         * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ]
         * @param {boolean} closed - Closed polyline flag
         * @param {number} startWidth - Default start width
         * @param {number} endWidth - Default end width
         */
        drawPolyline(
            points: Array<Point2D>,
            closed?: boolean,
            startWidth?: number,
            endWidth?: number
        ): Drawing;

        /**
         * @param {array} points - Array of points like [ [x1, y1, z1], [x2, y2, z1]... ]
         */
        drawPolyline3d(points: Array<Point3D>): Drawing;

        /**
         * @param {number} trueColor - Integer representing the true color, can be passed as an hexadecimal value of the form 0xRRGGBB
         */
        setTrueColor(trueColor: number): Drawing;

        drawFace(
            x1: number,
            y1: number,
            z1: number,
            x2: number,
            y2: number,
            z2: number,
            x3: number,
            y3: number,
            z3: number,
            x4: number,
            y4: number,
            z4: number
        ): Drawing;

        /**
         * @see https://www.autodesk.com/techpubs/autocad/acadr14/dxf/header_section_al_u05_c.htm
         * @see https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
         *
         * @param {string} variable
         * @param {array} values Array of "two elements arrays". [  [value1_GroupCode, value1_value], [value2_GroupCode, value2_value]  ]
         */
        header(variable: string, values: Array<HeaderValue>): Drawing;

        /**
         *
         * @param {string} unit see Drawing.UNITS
         */
        setUnits(unit: Unit): Drawing;

        toDxfString(): string;

        /**
         * AutoCAD Color Index (ACI)
         * @see http://sub-atomic.com/~moses/acadcolors.html
         */
        static ACI: { [key in ACIKey]: number };

        static LINE_TYPES: LineType[];

        static LAYERS: Layer[];

        /**
         * @see https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
         */
        static UNITS: { [key in Unit]: number };
    }
}
