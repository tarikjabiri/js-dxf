const Drawing = require('./../src/Drawing')
const fs = require('fs')

let d = new Drawing()

let y = 10
let x = 50
let textHeight = 5
for(let ltype of Drawing.LINE_TYPES)
{
    let layerName = 'layer_' + y
    d.addLayer(layerName, Drawing.ACI.GREEN, ltype.name)
    d.setActiveLayer(layerName)
    d.drawLine(-x, y, x, y)

    d.setActiveLayer('0')
    d.drawText(x + 2, y - textHeight/2, textHeight, 0, ltype.name)

    y += 10

} 

fs.writeFileSync(__filename + '.dxf', d.toDxfString())