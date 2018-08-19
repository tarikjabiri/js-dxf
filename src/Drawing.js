const LineType = require('./LineType');
const Layer = require('./Layer');
const Line = require('./Line');
const Arc = require('./Arc');
const Circle = require('./Circle');
const Text = require('./Text');
const Polyline = require('./Polyline');
const Face = require('./Face');

class Drawing
{
    constructor()
    {
        this.layers = {};
        this.activeLayer = null;
        this.lineTypes = {};

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
    
    drawRect(x1, y1, x2, y2)
    {
        this.activeLayer.addShape(new Line(x1, y1, x2, y1));
        this.activeLayer.addShape(new Line(x1, y2, x2, y2));
        this.activeLayer.addShape(new Line(x1, y1, x1, y2));
        this.activeLayer.addShape(new Line(x2, y1, x2, y2));
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
     */
    drawText(x1, y1, height, rotation, value)
    {
        this.activeLayer.addShape(new Text(x1, y1, height, rotation, value));
        return this;
    }

    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ] 
     */
    drawPolyline(points)
    {
        this.activeLayer.addShape(new Polyline(points));
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

    _getDxfLtypeTable()
    {
        let s = '0\nTABLE\n'; //start table
        s += '2\nLTYPE\n';    //name table as LTYPE table

        for (let lineTypeName in this.lineTypes)
        {
            s += this.lineTypes[lineTypeName].toDxfString();
        }

        s += '0\nENDTAB\n'; //end table

        return s;
    }

    _getDxfLayerTable()
    {
        let s = '0\nTABLE\n'; //start table
        s += '2\nLAYER\n'; //name table as LAYER table

        for (let layerName in this.layers)
        {
            s += this.layers[layerName].toDxfString();
        }

        s += '0\nENDTAB\n';

        return s;
    }

    toDxfString()
    {
        let stringIO = {
            s: "",
            write(str) { this.s += str },
            toString() { return this.s }
        };

        this.writeDxf(stringIO);

        return stringIO.toString();
    }

    writeDxf(stream)
    {
        //start section
        stream.write('0\nSECTION\n');
        //name section as TABLES section
        stream.write('2\nTABLES\n');
  
        stream.write(this._getDxfLtypeTable());
        stream.write(this._getDxfLayerTable());
  
        //end section
        stream.write('0\nENDSEC\n');
  
  
        //ENTITES section
        stream.write('0\nSECTION\n');
        stream.write('2\nENTITIES\n');
  
        for (let layerName in this.layers)
        {
            let layer = this.layers[layerName];
            for (let i = 0; i < layer.shapes.length; ++i) {
                stream.write(layer.shapes[i].toDxfString());
            }
        }
  
        stream.write('0\nENDSEC\n');
  
        //close file
        stream.write('0\nEOF');
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
    {name: 'DOTTED',    description: '. . . ', elements: [0.0, -5.0]}
]

Drawing.LAYERS = 
[
    {name: '0',  colorNumber: Drawing.ACI.WHITE, lineTypeName: 'CONTINUOUS'}
]

module.exports = Drawing;
