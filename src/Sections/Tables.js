const TagsManager = require("../Core/TagsManager");
const LineType = require("../Records/LineType");
const Layer = require("../Records/Layer");
const Style = require("../Records/Style");
const ViewPort = require("../Records/ViewPort");
const View = require("../Records/View");
const Table = require("../Core/Table");

class Tables extends TagsManager {
    _vport;
    _linetypes;
    _layers;
    _styles;
    _view;

    constructor() {
        super();
        this._vport = new Table('VPORT');
        this._linetypes = new Table('LTYPE');
        this._layers = new Table('LAYER');
        this._styles = new Table('STYLE');
        this._view = new Table('VIEW');


    }

    stringify() {
        let txt = '';
        txt += this._vport.stringify();
        txt += this._linetypes.stringify();
        txt += this._layers.stringify();
        txt += this._styles.stringify();
        txt += this._view.stringify();
        txt += super.stringify();
        return txt;
    }

    addLayer(name, color, lineType) {
        this._layers.addRecord(new Layer(name, color, lineType));
    }

    addLineType(name, descriptive, elements) {
        this._linetypes.addRecord(new LineType(name,  descriptive, elements));
    }

    addStyle() {
        this._styles.addRecord(new Style());
    }

    addViewPort() {
        this._vport.addRecord(new ViewPort());
    }

    addView() {
        this._view.addRecord(new View());
    }
}

module.exports = Tables;
