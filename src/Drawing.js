const Layer = require('./Layer');
const LineType = require('./LineType')
const Line = require('./Line');
const Arc = require('./Arc');
const Circle = require('./Circle');
const Text = require('./Text');
const Polyline = require('./Polyline');
const Polyline3d = require('./Polyline3d');
const Face = require('./Face');
const Point = require('./Point');
const HEADER = require('./Header')
const H = require('./Helpers')
const Row = require('./Row')
const handleSeed = require('./handleSeed.js');
const Ellipse = require('./Ellipse');
class Drawing
{
    constructor()
    {
        this.layers = {}  // ToDo: replace with Map() : <string, Layer> for Typescript
        this.activeLayer = null;
        this.lineTypes = {};
        //this.handSeed = 0x11F
        this.unit = Drawing.UNITS.Millimeters

        for (let i = 0; i < Drawing.LINE_TYPES.length; ++i)
        {
            this.addLineType(Drawing.LINE_TYPES[i].name,
                             Drawing.LINE_TYPES[i].description,
                             Drawing.LINE_TYPES[i].elements);
        }

        for (let i = 0; i < Drawing.LAYERS.length; ++i)
        {
            this.addLayer(Drawing.LAYERS[i].name,
                          Drawing.LAYERS[i].colorNumber,
                          Drawing.LAYERS[i].lineTypeName);
        }

        this.setActiveLayer('0');
    }


    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
     */
    addLineType(name, description, elements)
    {
        this.lineTypes[name] = new LineType(name, description, elements);
        return this;
    }

    addLayer(name, colorNumber, lineTypeName)
    {
        this.layers[name] = new Layer(name, colorNumber, lineTypeName);
        return this;
    }

    setActiveLayer(name)
    {
        this.activeLayer = this.layers[name];
        return this;
    }

    drawLine(x1, y1, x2, y2)
    {
        this.activeLayer.addShape(new Line(x1, y1, x2, y2));
        return this;
    }

    drawPoint(x, y)
    {
        this.activeLayer.addShape(new Point(x, y));
        return this;
    }

    drawRect(x1, y1, x2, y2)
    {
        // The rectangle is a polyline entity in AutoCAD so we have to do it like this
        // The Rectangle class deleted because there is no entity called rectangle in the dxf reference
        const corners = [
            [x1, y1],
            [x1, y2],
            [x2, y2],
            [x2, y1]
        ];

        this.activeLayer.addShape(new Polyline(corners, 1));
        
        // this.activeLayer.addShape(new Line(x1, y1, x2, y1));
        // this.activeLayer.addShape(new Line(x1, y2, x2, y2));
        // this.activeLayer.addShape(new Line(x1, y1, x1, y2));
        // this.activeLayer.addShape(new Line(x2, y1, x2, y2));
        return this;
    }

    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     * @param {number} startAngle - degree
     * @param {number} endAngle - degree
     */
    drawArc(x1, y1, r, startAngle, endAngle)
    {
        this.activeLayer.addShape(new Arc(x1, y1, r, startAngle, endAngle));
        return this;
    }

    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     */
    drawCircle(x1, y1, r)
    {
        this.activeLayer.addShape(new Circle(x1, y1, r));
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
    drawText(x1, y1, height, rotation, value, horizontalAlignment = 'left', verticalAlignment = 'baseline')
    {
        this.activeLayer.addShape(new Text(x1, y1, height, rotation, value, horizontalAlignment, verticalAlignment));
        return this;
    }

    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ]
     * @param {boolean} closed - Closed polyline flag
     * @param {number} startWidth - Default start width
     * @param {number} endWidth - Default end width
     */
    drawPolyline(points, closed = false, startWidth = 0, endWidth = 0)
    {
        const flag = closed ? 1 : 0;
        this.activeLayer.addShape(new Polyline(points, flag, startWidth, endWidth));
        return this;
    }

    /**
     * @param {array} points - Array of points like [ [x1, y1, z1], [x2, y2, z1]... ]
     */
    drawPolyline3d(points)
    {
        points.forEach(point => {
            if (point.length !== 3){
                throw "Require 3D coordinate"
            }
        });
        this.activeLayer.addShape(new Polyline3d(points));
        return this;
    }

    /**
     * @param {number} x_center X coordinate of Center point
     * @param {number} y_center Y coordinate of Center point
     * @param {number} x_major_axis X coordinate of Endpoint of major axis, relative to the center
     * @param {number} y_major_axis Y coordinate of Endpoint of major axis, relative to the center
     * @param {number} ratio_minor_axis Ratio of minor axis to major axis
     * @param {number} start_parameter Start parameter (this value is 0.0 for a full ellipse)
     * @param {number} end_parameter End parameter (this value is 2pi = 6.2831853071795862 for a full ellipse)
     */
    drawEllipse(x_center, y_center, x_major_axis, y_major_axis, ratio_minor_axis, start_parameter = 0.0, end_parameter = 6.2831853071795862)
    {
        this.activeLayer.addShape(new Ellipse(x_center, y_center, x_major_axis, y_major_axis, ratio_minor_axis, start_parameter, end_parameter));
        return this;
    }

    /**
     *
     * @param {number} trueColor - Integer representing the true color, can be passed as an hexadecimal value of the form 0xRRGGBB
     */
    setTrueColor(trueColor)
    {
        this.activeLayer.setTrueColor(trueColor);
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
    drawFace(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
    {
        this.activeLayer.addShape(new Face(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4));
        return this;
    }


    _getDxfLtypeTableRows()
    {
        const output = []
        output.push(new Row('0', 'TABLE'))
        output.push(new Row('2', 'LTYPE'))
        output.push(new Row('5', handleSeed()))
        output.push(new Row('330', '0'))
        output.push(new Row('100', 'AcDbSymbolTable'))
        output.push(new Row('70', '48'))
        // let s = '0\nTABLE\n'; //start table
        // s += '2\nLTYPE\n';    //name table as LTYPE table
        for (let lineTypeName in this.lineTypes)
        {
            //s += this.lineTypes[lineTypeName].toDxfString();
            output.push(...this.lineTypes[lineTypeName].toDxfRows())
        }

        // s += '0\nENDTAB\n'; //end table

        // return s;
        output.push(new Row('0', 'ENDTAB'))
        return output
    }

    /**
     * @deprecated
     */
    _getDxfLayerTable()
    {
        // let s = '0\nTABLE\n'; //start table
        // s += '2\nLAYER\n'; //name table as LAYER table

        // for (let layerName in this.layers)
        // {
        //     s += this.layers[layerName].toDxfString();
        // }

        // s += '0\nENDTAB\n';

        // return s;
    }

    /**
     * Auto generated
     * @deprecated
     */
    header(variable, values) {
        // this.headers[variable] = values;
        // return this;
    }

    /**
     *
     * @deprecated
     */
    _getHeader(variable, values){
        // let s = '9\n$'+ variable +'\n';

        // for (let value of values) {
        //     s += `${value[0]}\n${value[1]}\n`;
        // }

        // return s;
    }

    /**
     *
     * @param {string} unit see Drawing.UNITS
     */
    setUnits(unit) {
        this.unit = Drawing.UNITS[unit]
    }

    toDxfString()
    {
        // ToDo: Consider converting all Entity output to Row items

        //ENTITES section
        let s =''
        s += '0\nSECTION\n';
        s += '2\nENTITIES\n';

        for (let layerName in this.layers)
        {
            let layer = this.layers[layerName];
            s += layer.shapesToDxf();
            // let shapes = layer.getShapes();
        }

        s += '0\nENDSEC\n';


        //close file
        s += '0\nEOF';

        const headerOutputAsRowItems = HEADER.generateHeaderAndDefaults(this.layers, this.unit, this._getDxfLtypeTableRows())
        const headerString = H.generateStringFromRows(headerOutputAsRowItems)

        return headerString + s
    }

}

//AutoCAD Color Index (ACI)
//http://sub-atomic.com/~moses/acadcolors.html
Drawing.ACI =
{
    LAYER : 0,
    RED : 1,
    YELLOW : 2,
    GREEN : 3,
    CYAN : 4,
    BLUE : 5,
    MAGENTA : 6,
    WHITE : 7
}

Drawing.LINE_TYPES =
[
    {name: 'CONTINUOUS', description: '______', elements: []},
    {name: 'DASHED',    description: '_ _ _ ', elements: [5.0, -5.0]},
    {name: 'DOTTED',    description: '. . . ', elements: [0.0, -5.0]},
    {name: 'BORDER',    description: '__ __ . __ __ . __ __', elements: [5.0, -2.5, 5.0, -2.5, 0, -2.5]},
    {name: 'CENTER',    description: '____ _ ____ _ ____', elements: [5.0, -2.5, 2.5, -2.5]}
]

Drawing.LAYERS =
[
    {name: '0',  colorNumber: Drawing.ACI.WHITE, lineTypeName: 'CONTINUOUS'}
]

//https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
Drawing.UNITS = {
    'Unitless':0,
    'Inches':1,
    'Feet':2,
    'Miles':3,
    'Millimeters':4,
    'Centimeters':5,
    'Meters':6,
    'Kilometers':7,
    'Microinches':8,
    'Mils':9,
    'Yards':10,
    'Angstroms':11,
    'Nanometers':12,
    'Microns':13,
    'Decimeters':14,
    'Decameters':15,
    'Hectometers':16,
    'Gigameters':17,
    'Astronomical units':18,
    'Light years':19,
    'Parsecs':20
}

module.exports = Drawing;
