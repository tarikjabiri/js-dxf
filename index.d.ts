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
    export type Point3D = [number, number];

    // [GroupCode, value]
    export type HeaderValue = [number, number];

    export interface RenderableToDxf {
        toDxfString(): string;
    }

    export class Arc implements RenderableToDxf {
        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         * @param {number} startAngle - degree
         * @param {number} endAngle - degree
         */
        constructor(
            public x1: number,
            public y1: number,
            public r: number,
            public startAngle: number,
            public endAngle: number,
        );
    }

    export class Circle implements RenderableToDxf {
        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         */
        constructor(x1: number, y1: number, r: number);
    }

    export class Face implements RenderableToDxf {
        constructor(
            public x1: number,
            public y1: number,
            public z1: number,
            public x2: number,
            public y2: number,
            public z2: number,
            public x3: number,
            public y3: number,
            public z3: number,
            public x4: number,
            public y4: number,
            public z4: number,
        );
    }

    export class Layer implements RenderableToDxf {
        constructor(public name: string, public colorNumber: number, public lineTypeName: string);

        shapes: RenderableToDxf[];
        trueColor: number;

        setTrueColor(color: number);
        addShape(shape: RenderableToDxf);
        getShapes(): Array<RenderableToDxf>;
        shapesToDxf(): string;
    }

    export class Line implements RenderableToDxf {
        constructor(public x1: number, public y1: number, public x2: number, public y2: number);
    }

    export class LineType implements RenderableToDxf {
        /**
         * @param {string} name
         * @param {string} description
         * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
         */
        constructor(public name: string, public description: string, public elements: Array<number>);

        toDxfString(): string;
        getElementsSum(): number;
    }

    export class Point implements RenderableToDxf {
        constructor(public x: number, public y: number);
    }

    export class Polyline implements RenderableToDxf {
        constructor(public points: Array<Point2D>);
    }

    export class Polyline3D implements RenderableToDxf {
        constructor(public points: Array<Point3D>);
    }

    export class Text implements RenderableToDxf {
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
            public x1: number,
            public y1: number,
            public height: number,
            public rotation: number,
            public value: string,
            public horizontalAlignment: HorizontalAlignment = "left",
            public verticalAlignment: VerticalAlignment = "baseline",
        );
    }

    export default class Drawing implements RenderableToDxf {
        constructor();

        layers: { [string]: Layer };
        activeLayer: Layer | null;
        lineTypes: { [string]: LineType };
        headers: { [string]: Array<HeaderValue> };

        /**
         * @param {string} name
         * @param {string} description
         * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
         */
        addLineType(name: string, description: string, elements: Array<number>): Drawing;

        addLayer(name: string, colorNumber: number, lineTypeName: string): Drawing;
        setActiveLayer(name: string): Drawing;
        drawLine(x1: number, y1: number, x2: number, y2: number): Drawing;
        drawPoint(x: number, y: number): Drawing;
        drawRect(x1: number, y1: number, x2: number, y2: number): Drawing;

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         * @param {number} startAngle - degree
         * @param {number} endAngle - degree
         */
        drawArc(x1: number, y1: number, r: number, startAngle: number, endAngle: number): Drawing;

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         */
        drawCircle(x1: number, y1: number, r: number): Drawing;

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
            horizontalAlignment: HorizontalAlignment = "left",
            verticalAlignment: VerticalAlignment = "baseline",
        ): Drawing;

        /**
         * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ]
         */
        drawPolyline(points: Array<Point2D>): Drawing;

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
            z4: number,
        ): Drawing;
        _getDxfLtypeTable(): string;
        _getDxfLayerTable(): string;

        /**
         * @see https://www.autodesk.com/techpubs/autocad/acadr14/dxf/header_section_al_u05_c.htm
         * @see https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
         *
         * @param {string} variable
         * @param {array} values Array of "two elements arrays". [  [value1_GroupCode, value1_value], [value2_GroupCode, value2_value]  ]
         */
        header(variable: string, values: Array<HeaderValue>): Drawing;
        _getHeader(variable: string, values: Array<HeaderValue>): string;

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
        static ACI = {
            LAYER: 0,
            RED: 1,
            YELLOW: 2,
            GREEN: 3,
            CYAN: 4,
            BLUE: 5,
            MAGENTA: 6,
            WHITE: 7,
        };

        static LINE_TYPES: LineType[] = [
            { name: "CONTINUOUS", description: "______", elements: [] },
            { name: "DASHED", description: "_ _ _ ", elements: [5.0, -5.0] },
            { name: "DOTTED", description: ". . . ", elements: [0.0, -5.0] },
        ];

        static LAYERS: Layer[] = [{ name: "0", colorNumber: Drawing.ACI.WHITE, lineTypeName: "CONTINUOUS" }];

        /**
         * @see https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
         */
        static UNITS: { [Unit]: number } = {
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
    }
}
