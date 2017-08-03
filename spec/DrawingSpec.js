const Drawing = require('../src/Drawing');
const LineType = require('../src/LineType');
const Layer = require('../src/Layer');

describe('Drawing', function() {
    const fs = require('fs');

    it('can be just blank', function()
    {
        var d = new Drawing();
        fs.writeFileSync('blank.dxf', d.toDxfString());
    });

    it('can add a line type', function()
    {
        var d = new Drawing();
        d.addLineType('MyDashed', '_ _ _ _ _ _', [0.250, -0.250]);
        d.addLineType('MyCont',   '___________', []);
        expect(d.lineTypes['MyCont']).toEqual(jasmine.any(LineType));
        fs.writeFileSync('add_line_type.dxf', d.toDxfString());
    });

    it('can add a layer', function()
    {
        var d = new Drawing();
        d.addLineType('MyDashed', '_ _ _ _ _ _', [0.250, -0.250]);
        d.addLineType('MyCont',   '___________', []);
        d.addLayer('MyLayer', Drawing.ACI.GREEN, 'MyDashed');
        expect(d.layers['MyLayer']).toEqual(jasmine.any(Layer));
        fs.writeFileSync('add_layer.dxf', d.toDxfString());
    });

    it('can draw a line', function()
    {
        var d = new Drawing();
        d.drawLine(0, 0, 100, 100);
        fs.writeFileSync('line_0_0_100_100.dxf', d.toDxfString());
    });

});