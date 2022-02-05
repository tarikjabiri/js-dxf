const Drawing = require('./../src/Drawing')
const Circle = require('./../src/Circle')
const fs = require('fs')


const circle = new Circle(100, 0, 200)
const bb = circle.computeBoundingBox()
const bbHeight = bb.max.y - bb.min.y

const d = new Drawing();
d.activeLayer.addShape(circle)

const activeViewPort = d.tables.VPORT.elements.find(vp => vp.name == '*ACTIVE')
activeViewPort.height = bbHeight
activeViewPort.centerPoint = {x:-150, y:0}

fs.writeFileSync(__filename + '.dxf', d.toDxfString())