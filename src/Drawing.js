const LineType = require('./LineType');
const Layer = require('./Layer');
const Line = require('./Line');
const Arc = require('./Arc');
const Circle = require('./Circle');
const Text = require('./Text');
const Polyline = require('./Polyline');

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

    drawLine(p1, p2)
    {
        this.activeLayer.addShape(new Line(p1, p2));
        return this;
    }

    /**
     * @param {array} point - Center point  [x, y, z]
     * @param {number} r - radius
     * @param {number} startAngle - degree 
     * @param {number} endAngle - degree 
     */
    drawArc(point, r, startAngle, endAngle)
    {
        this.activeLayer.addShape(new Arc(point, r, startAngle, endAngle));
        return this;
    }

    /**
     * @param {array} point - Center point  [x, y, z]
     * @param {number} r - radius
     */
    drawCircle(point, r)
    {
        this.activeLayer.addShape(new Circle(point, r));
        return this;
    }

    /**
     * @param {array} point - [x1, x2, x3]
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     */
    drawText(point, height, rotation, value)
    {
        this.activeLayer.addShape(new Text(point, height, rotation, value));
        return this;
    }

    /**
     * @param {array} points - Array of points like [ [x1, y1, z1], [x2, y2, z2]... ]
     */
    drawPolyline(points)
    {
        this.activeLayer.addShape(new Polyline(points));
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
        let s = '';

        //start section
        s += '0\nSECTION\n';
        //name section as TABLES section
        s += '2\nTABLES\n';

        s += this._getDxfLtypeTable();
        s += this._getDxfLayerTable();

        //end section
        s += '0\nENDSEC\n';


        //ENTITES section
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

        return s;
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