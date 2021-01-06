const Layer = require('./Layer')
const Row = require('./Row')
const Drawing = require('./Drawing')
const LineType = require('./LineType');
const H = require('./Helpers')
const handleSeed = require('./handleSeed.js')

// http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-8CE7CC87-27BD-4490-89DA-C21F516415A9
function generateVportTable () {

  const output = [] // Row[]

  output.push(new Row('0', 'TABLE'))
  output.push(new Row('2', 'VPORT'))
  output.push(new Row('5', '40'))
  output.push(new Row('330', '0'))
  output.push(new Row('100', 'AcDbSymbolTable'))
  output.push(new Row('70', '1'))

  output.push(new Row('0', 'VPORT'))
  output.push(new Row('5', '60'))
  output.push(new Row('330', '40'))
  output.push(new Row('100', 'AcDbSymbolTableRecord'))
  output.push(new Row('100', 'AcDbViewportTableRecord'))
  output.push(new Row('2', '*Active'))
  output.push(new Row('70', '0'))
  output.push(new Row('10', '0.0'))
  output.push(new Row('20', '0.0'))
  output.push(new Row('11', '1.0'))
  output.push(new Row('21', '1.0'))
  output.push(new Row('12', '69.9'))
  output.push(new Row('22', '31.5'))
  output.push(new Row('13', '0.0'))
  output.push(new Row('23', '0.0'))
  output.push(new Row('14', '0.5'))
  output.push(new Row('24', '0.5'))
  output.push(new Row('15', '0.5'))
  output.push(new Row('25', '0.5'))
  output.push(new Row('16', '0.0'))
  output.push(new Row('26', '0.0'))
  output.push(new Row('36', '1.0'))
  output.push(new Row('17', '0.0'))
  output.push(new Row('27', '0.0'))
  output.push(new Row('37', '0.0'))
  output.push(new Row('40', '72.3'))
  output.push(new Row('41', '2.071922544951591'))
  output.push(new Row('42', '50.0'))
  output.push(new Row('43', '0.0'))
  output.push(new Row('44', '0.0'))
  output.push(new Row('50', '0.0'))
  output.push(new Row('51', '0.0'))
  output.push(new Row('71', '0'))
  output.push(new Row('72', '100'))
  output.push(new Row('73', '1'))
  output.push(new Row('74', '3'))
  output.push(new Row('75', '0'))
  output.push(new Row('76', '0'))
  output.push(new Row('77', '0'))
  output.push(new Row('78', '0'))
  output.push(new Row('281', '0'))
  output.push(new Row('65', '1'))
  output.push(new Row('110', '0.0'))
  output.push(new Row('120', '0.0'))
  output.push(new Row('130', '0.0'))
  output.push(new Row('111', '1,0'))
  output.push(new Row('121', '0.0'))
  output.push(new Row('131', '0.0'))
  output.push(new Row('112', '0.0'))
  output.push(new Row('122', '1.0'))
  output.push(new Row('132', '0.0'))
  output.push(new Row('79', '0'))
  output.push(new Row('146', '0.0'))
  output.push(new Row('348', '66'))
  output.push(new Row('60', '3'))
  output.push(new Row('61', '5'))
  output.push(new Row('292', '1'))
  output.push(new Row('282', '1'))
  output.push(new Row('141', '0.0'))
  output.push(new Row('142', '0.0'))
  output.push(new Row('63', '250'))
  output.push(new Row('361', 'A4'))
  output.push(new Row('0', 'ENDTAB'))

  return output
}
function generateLayerTable (_layers) {
  const output = [] // Row[]

  const layerNames = Object.keys(_layers)

  const layers = _layers

  const layersWithout0 = layerNames.filter(layerName => layerName !== '0')

  const layer0missing = layerNames.filter(layerName => layerName === '0').length === 0
  if (layer0missing) {
    layers['0'] = new Layer('0',7, 'CONTINUOUS') //ToDo:Connect to constants?
  }

  const sortedLayers = [
    '0',  // Ensure mandatory 0 is first layer
    ...layersWithout0,
  ]

  output.push(new Row('0', 'TABLE'))
  output.push(new Row('2', 'LAYER'))
  output.push(new Row('5', '3B'))
  output.push(new Row('330', '0'))
  output.push(new Row('100', 'AcDbSymbolTable'))
  output.push(new Row('70', '1'))

  sortedLayers.forEach(layerName => {
    const layer = _layers[layerName]
    const rows = layer.toDxfRows()
    output.push(...rows)
  })
  output.push(new Row('0', 'ENDTAB'))
  return output
}

function generateUcsTable () {
  const output = []

  output.push(new Row('0', 'TABLE'))
  output.push(new Row('2', 'UCS'))
  output.push(new Row('5', '3F'))
  output.push(new Row('330', '0'))
  output.push(new Row('100', 'AcDbSymbolTable'))
  output.push(new Row('70', '0'))
  output.push(new Row('0', 'ENDTAB'))

  return output
}
function generateViewTable () {
  const output = []

  output.push(new Row('0', 'TABLE'))
  output.push(new Row('2', 'VIEW'))
  output.push(new Row('5', '3E'))
  output.push(new Row('330', '0'))
  output.push(new Row('100', 'AcDbSymbolTable'))
  output.push(new Row('70', '0'))

  output.push(new Row('0', 'ENDTAB'))

  return output
}

function generateStyleTable () {

  const output = []

  output.push(new Row('0', 'TABLE'))
  output.push(new Row('2', 'STYLE'))
  output.push(new Row('5', '3C'))
  output.push(new Row('330', '0'))
  output.push(new Row('100', 'AcDbSymbolTable'))
  output.push(new Row('70', '12'))

  output.push(new Row('0', 'STYLE'))
  output.push(new Row('5', '49'))
  output.push(new Row('330', '3C'))
  output.push(new Row('100', 'AcDbSymbolTableRecord'))
  output.push(new Row('100', 'AcDbTextStyleTableRecord'))
  output.push(new Row('2', 'Standard'))
  output.push(new Row('70', '0'))
  output.push(new Row('40', '0.0'))
  output.push(new Row('41', '1.0'))
  output.push(new Row('50', '0.0'))
  output.push(new Row('71', '0'))
  output.push(new Row('42', '0.2'))
  output.push(new Row('3', 'txt'))
  output.push(new Row('4', ''))
  output.push(new Row('0', 'ENDTAB'))

  return output
}
function generateBlockRecordTable () {

  const output = []

  output.push(new Row('0', 'TABLE'))
  output.push(new Row('2', 'BLOCK_RECORD'))
  output.push(new Row('5', '3A'))
  output.push(new Row('330', '0'))
  output.push(new Row('100', 'AcDbSymbolTable'))
  output.push(new Row('70', '0'))

  output.push(new Row('0', 'BLOCK_RECORD'))
  output.push(new Row('5', '56'))
  output.push(new Row('330', '3A'))
  output.push(new Row('100', 'AcDbSymbolTableRecord'))
  output.push(new Row('100', 'AcDbBlockTableRecord'))
  output.push(new Row('2', '*Model_Space'))
  output.push(new Row('340', '59'))
  output.push(new Row('70', '0'))
  output.push(new Row('280', '1'))
  output.push(new Row('281', '0'))

  output.push(new Row('0', 'BLOCK_RECORD'))
  output.push(new Row('5', '52'))
  output.push(new Row('330', '3A'))
  output.push(new Row('100', 'AcDbSymbolTableRecord'))
  output.push(new Row('100', 'AcDbBlockTableRecord'))
  output.push(new Row('2', '*Paper_Space'))
  output.push(new Row('340', '55'))
  output.push(new Row('70', '0'))
  output.push(new Row('280', '1'))
  output.push(new Row('281', '0'))

  output.push(new Row('0', 'ENDTAB'))

  return output
}

function generateLtypeTable () {


  const output = []

  output.push(new Row('0', 'TABLE'))
  output.push(new Row('2', 'LTYPE'))
  output.push(new Row('5', handleSeed()))
  output.push(new Row('330', '0'))
  output.push(new Row('100', 'AcDbSymbolTable'))
  output.push(new Row('70', '48'))
  
  // By Block
  output.push(new Row('0', 'LTYPE'))
  output.push(new Row('5', handleSeed()))
  output.push(new Row('330', '3D'))
  output.push(new Row('100', 'AcDbSymbolTableRecord'))
  output.push(new Row('100', 'AcDbLinetypeTableRecord'))
  output.push(new Row('2', 'ByBlock'))
  output.push(new Row('70', '0'))
  output.push(new Row('3', ''))
  output.push(new Row('72', '65'))
  output.push(new Row('73', '0'))
  output.push(new Row('40', '0'))
  
   // By Layer
  output.push(new Row('0', 'LTYPE'))
  output.push(new Row('5', handleSeed()))
  output.push(new Row('330', '3D'))
  output.push(new Row('100', 'AcDbSymbolTableRecord'))
  output.push(new Row('100', 'AcDbLinetypeTableRecord'))
  output.push(new Row('2', 'ByLayer'))
  output.push(new Row('70', '0'))
  output.push(new Row('3', ''))
  output.push(new Row('72', '65'))
  output.push(new Row('73', '0'))
  output.push(new Row('40', '0'))
  

  // Continous lines
  output.push(new Row('0', 'LTYPE'))
  output.push(new Row('5', handleSeed()))
  output.push(new Row('330', '3D'))
  output.push(new Row('100', 'AcDbSymbolTableRecord'))
  output.push(new Row('100', 'AcDbLinetypeTableRecord'))
  output.push(new Row('2', 'Continuous'))
  output.push(new Row('70', '0'))
  output.push(new Row('3', 'Solid line'))
  output.push(new Row('72', '65'))
  output.push(new Row('73', '0'))
  output.push(new Row('40', '0'))
  

  /*

0
LTYPE
72
65
70
64
2
DASHED
3
_ _ _ 

73
2
40
10
49
5
49
-5
*/
  // Dashed lines
  output.push(new Row('0', 'LTYPE'))
  output.push(new Row('5', handleSeed()))
  output.push(new Row('330', '3D'))
  output.push(new Row('100', 'AcDbSymbolTableRecord'))
  output.push(new Row('100', 'AcDbLinetypeTableRecord'))
  output.push(new Row('2', 'Dashed'))
  output.push(new Row('70', '0'))
  output.push(new Row('3', '_ _ _ '))
  output.push(new Row('73', '2'))
  output.push(new Row('40', '10'))
  output.push(new Row('49', '5'))
  output.push(new Row('49', '-5'))
  

  output.push(new Row('0', 'ENDTAB'))

  return {
    rows: output,
    
  }
}

function generateDimStyleTable () {

  const rows = []
  rows.push(new Row('0', 'TABLE'))
  rows.push(new Row('2', 'DIMSTYLE'))
  rows.push(new Row('5', handleSeed()))       // ToDO: Add handseed
  rows.push(new Row('330', '0'))
  rows.push(new Row('100', 'AcDbSymbolTable'))
  rows.push(new Row('70', '2'))
  rows.push(new Row('100', 'AcDbDimStyleTable'))
  

  rows.push(new Row('0', 'DIMSTYLE'))
  rows.push(new Row('105', '5E'))
  rows.push(new Row('330', '42'))
  rows.push(new Row('100', 'AcDbSymbolTableRecord'))
  rows.push(new Row('100', 'AcDbDimStyleTableRecord'))
  rows.push(new Row('2', 'Standard'))
  rows.push(new Row('70', '0'))
  rows.push(new Row('178', '0'))
  rows.push(new Row('340', '49'))
  rows.push(new Row('0', 'ENDTAB'))
  return {
    rows,
    
  }
}

function generateAppIdTable () {

  const appName = 'Online Exporter'     // ToDo: Rename

  const output = []

  output.push(new Row('0', 'TABLE'))
  output.push(new Row('2', 'APPID'))
  output.push(new Row('5', handleSeed()))
  output.push(new Row('330', '0'))
  output.push(new Row('100', 'AcDbSymbolTable'))
  output.push(new Row('70', '0'))
  

  output.push(new Row('0', 'APPID'))
  output.push(new Row('5', handleSeed()))
  output.push(new Row('330', '41'))
  output.push(new Row('100', 'AcDbSymbolTableRecord'))
  output.push(new Row('100', 'AcDbRegAppTableRecord'))
  output.push(new Row('2', 'ACAD'))
  output.push(new Row('70', 0))
  

  output.push(new Row('0', 'APPID'))
  output.push(new Row('5', handleSeed()))
  output.push(new Row('330', '41'))
  output.push(new Row('100', 'AcDbSymbolTableRecord'))
  output.push(new Row('100', 'AcDbRegAppTableRecord'))
  output.push(new Row('2', appName))
  output.push(new Row('70', 0))
  

  output.push(new Row('0', 'ENDTAB'))

  return {
    rows: output,
  }
}

function generateDefaultTables (layers, lineTypeTableRows) {
  const output = [] // Row[]
  output.push(new Row('0', 'SECTION'))
  output.push(new Row('2', 'TABLES'))
  
  output.push(...lineTypeTableRows)
  output.push(...generateVportTable())

  const layersTable = generateLayerTable(layers)
  output.push(...layersTable)

  output.push(...generateStyleTable())
  output.push(...generateBlockRecordTable())
  output.push(...generateViewTable())
  output.push(...generateUcsTable())
  const appIdTable = generateAppIdTable()
  output.push(...appIdTable.rows)
  const dimStyleTable = generateDimStyleTable()
  output.push(...dimStyleTable.rows)
  output.push(new Row('0', 'ENDSEC'))

  return {
    
    output
  }
}

module.exports = generateDefaultTables
