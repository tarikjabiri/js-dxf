const fs = require('fs')
const join = require('path').join

const DxfReader = require('dxf').Helper
const DxfWriter = require('../../src/Drawing.js')

const inputDxf = new DxfReader(fs.readFileSync('../data/octicons-cloud-download.dxf', 'utf-8'))
const entities = inputDxf.parsed.entities

const outputDxf = new DxfWriter()

function findBoundingBox(vertices) {
    let xx = [], yy = []
    for(let vertex of vertices)
    {
        xx.push(vertex[0])
        yy.push(vertex[1])
    }
    return [Math.min(...xx), Math.max(...yy), Math.max(...xx), Math.min(...yy)]
}


//redraw original cloud
for(let entity of entities) {
    entity.array_vertices = [];
    for(let vertex of entity.vertices)
    {
        entity.array_vertices.push([vertex.x, vertex.y]);
    }

    outputDxf.drawPolyline(entity.array_vertices);
}

//draw green dashed bounding box around the original
let boundingBox = findBoundingBox([...entities[0].array_vertices, ...entities[1].array_vertices]);
outputDxf.addLayer('l_green', DxfWriter.ACI.GREEN, 'DASHED')
outputDxf.setActiveLayer('l_green')
outputDxf.drawRect(...boundingBox)

//draw a copy and move it to right
outputDxf.setActiveLayer('0')
let width = boundingBox[2] - boundingBox[0]
for(let entity of entities) {
    let movedVertices = [];
    for(let vertex of entity.array_vertices)
    {
        movedVertices.push([vertex[0] + width, vertex[1]])
    }
    outputDxf.drawPolyline(movedVertices);
}

fs.writeFileSync(__filename + '.dxf', outputDxf.toDxfString());