const defaultBlocks = require('./DefaultBlocks')
const defaultDictionary = require('./DefaultDictionary')
const generateDefaultTables = require('./DefaultTables')
const Row = require('./Row')
const UUID = require('uuid')

// http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-A85E8E67-27CD-4C59-BE61-4DC9FADBE74A
class HeaderAndDefaults {
  unit
  constructor () {
    this.unit = 4 // 4 = mm
    this.projectName = 'Project '
  }

  setUnit (value) {
    this.unit = value
  }

  generateOutput (layers, handSeed) {

    const output = [] // Row[]

    // Header Section ------------------------------------------------------------

    output.push(new Row('0', 'SECTION'))
    output.push(new Row('2', 'HEADER'))

    const defaultTableResult = generateDefaultTables(layers, handSeed)  // Needs to be generated before header
    const finalHandseedValue = defaultTableResult.handSeed  // Seed after all entities have been added
    const parametersToOutput = generateMinimalHeader(finalHandseedValue, this.projectName)

    parametersToOutput.forEach(parameter => {
      output.push(new Row('9', parameter.id))
      output.push(...parameter.rows)
    })

    output.push(new Row('0', 'ENDSEC'))

    // Default classes -----------------------------------------------------------

    output.push(new Row('0', 'SECTION'))
    output.push(new Row('2', 'CLASSES'))
    output.push(new Row('0', 'ENDSEC'))


    // Default Tables ------------------------------------------------------------
    output.push(...defaultTableResult.output)

    // Default Dictionary --------------------------------------------------------
    output.push(...createTypeValueRowsFromDxfData(defaultDictionary))

    // Default Blocks
    output.push(...createTypeValueRowsFromDxfData(defaultBlocks))

    return output
  }
}

class HeaderParameter {
  id
  rows = [] // : Row[]
  constructor (id, rows) {
    this.id = id
    this.rows = rows
  }
}

function generateMinimalHeader (finalHandseedValue, projectName) { // ToDo: Add unit
  const parameters = []
  parameters.push(new HeaderParameter('$ACADVER', [new Row('1', 'AC1027')])) // 2013
  parameters.push(new HeaderParameter('$ANGBASE', [new Row('50', '0')]))
  parameters.push(new HeaderParameter('$ANGDIR', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$ATTMODE', [new Row('70', '1')]))
  parameters.push(new HeaderParameter('$AUNITS', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$AUPREC', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$CECOLOR', [new Row('62', '256')])) // 0 = by block, 256 = by layer
  parameters.push(new HeaderParameter('$CELTSCALE', [new Row('40', '1')]))
  parameters.push(new HeaderParameter('$CELTYPE', [new Row('6', 'ByLayer')]))
  parameters.push(new HeaderParameter('$CELWEIGHT', [new Row('370', '-1')]))
  parameters.push(new HeaderParameter('$CEPSNTYPE', [new Row('380', '0')]))
  parameters.push(new HeaderParameter('$CHAMFERA', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$CHAMFERB', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$CHAMFERC', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$CHAMFERD', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$CLAYER', [new Row('8', '0')]))
  parameters.push(new HeaderParameter('$CMLJUST', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$CMLSCALE', [new Row('40', '1')]))
  parameters.push(new HeaderParameter('$CMLSTYLE', [new Row('2', 'Standard')]))
  parameters.push(new HeaderParameter('$CSHADOW', [new Row('280', '0')]))
  parameters.push(new HeaderParameter('$DIMADEC', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMALT', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMALTD', [new Row('70', '3')])) // metric
  parameters.push(new HeaderParameter('$DIMALTF', [new Row('40', '0.0394')]))  // 25.4 -> 0.0394
  parameters.push(new HeaderParameter('$DIMALTRND', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$DIMALTTD', [new Row('70', '3')]))  // metric
  parameters.push(new HeaderParameter('$DIMALTTZ', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMALTU', [new Row('70', '2')]))
  parameters.push(new HeaderParameter('$DIMALTZ', [new Row('70', '2')]))
  parameters.push(new HeaderParameter('$DIMAPOST', [new Row('1', '')]))
  parameters.push(new HeaderParameter('$DIMASO', [new Row('70', '1')]))
  parameters.push(new HeaderParameter('$DIMASSOC', [new Row('280', '2')]))
  parameters.push(new HeaderParameter('$DIMASZ', [new Row('40', '2.5')]))
  parameters.push(new HeaderParameter('$DIMATFIT', [new Row('70', '3')]))
  parameters.push(new HeaderParameter('$DIMAUNIT', [new Row('70', '3')]))  // 0 = degrees, 3 = Radians
  parameters.push(new HeaderParameter('$DIMAZIN', [new Row('70', '2')]))
  parameters.push(new HeaderParameter('$DIMBLK', [new Row('1', '')]))
  parameters.push(new HeaderParameter('$DIMBLK1', [new Row('1', '')]))
  parameters.push(new HeaderParameter('$DIMBLK2', [new Row('1', '')]))
  parameters.push(new HeaderParameter('$DIMCEN', [new Row('40', '0.1')]))
  parameters.push(new HeaderParameter('$DIMCLRD', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMCLRE', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMCLRT', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMDEC', [new Row('70', '2')]))
  parameters.push(new HeaderParameter('$DIMDLE', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$DIMDLI', [new Row('40', '0.38')]))
  parameters.push(new HeaderParameter('$DIMDSEP', [new Row('70', '46')]))
  parameters.push(new HeaderParameter('$DIMEXE', [new Row('40', '1.25')]))
  parameters.push(new HeaderParameter('$DIMEXO', [new Row('40', '0.625')]))
  parameters.push(new HeaderParameter('$DIMGAP', [new Row('40', '0.625')]))
  parameters.push(new HeaderParameter('$DIMJUST', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMLDRBLK', [new Row('1', '')]))
  parameters.push(new HeaderParameter('$DIMLFAC', [new Row('40', '1')]))
  parameters.push(new HeaderParameter('$DIMLIM', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMLUNIT', [new Row('70', '2')]))
  parameters.push(new HeaderParameter('$DIMLWD', [new Row('70', '-3')]))   // -3 = standard, -2 = by layer
  parameters.push(new HeaderParameter('$DIMLWE', [new Row('70', '-3')]))   // -3 = standard, -2 = by layer
  parameters.push(new HeaderParameter('$DIMPOST', [new Row('1', '')]))
  parameters.push(new HeaderParameter('$DIMRND', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$DIMSAH', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMSCALE', [new Row('40', '1')]))
  parameters.push(new HeaderParameter('$DIMSD1', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMSD2', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMSE1', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMSE2', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMSHO', [new Row('70', '1')]))
  parameters.push(new HeaderParameter('$DIMSOXD', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMSTYLE', [new Row('2', 'Standard')]))
  parameters.push(new HeaderParameter('$DIMTAD', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMTDEC', [new Row('70', '4')]))
  parameters.push(new HeaderParameter('$DIMTFAC', [new Row('40', '1')]))
  parameters.push(new HeaderParameter('$DIMTIH', [new Row('70', '1')]))
  parameters.push(new HeaderParameter('$DIMTIX', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMTM', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$DIMTMOVE', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMTOFL', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMTOH', [new Row('70', '1')]))
  parameters.push(new HeaderParameter('$DIMTOL', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMTOLJ', [new Row('70', '1')]))
  parameters.push(new HeaderParameter('$DIMTP', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$DIMTSZ', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$DIMTVP', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$DIMTXSTY', [new Row('7', 'Standard')]))
  parameters.push(new HeaderParameter('$DIMTXT', [new Row('40', '2.5')]))
  parameters.push(new HeaderParameter('$DIMTZIN', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMUPT', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$DIMZIN', [new Row('70', '8')]))
  parameters.push(new HeaderParameter('$DISPSILH', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$ELEVATION', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$ENDCAPS', [new Row('280', '0')]))
  parameters.push(new HeaderParameter('$EXTMAX', [new Row('10', '1.0E+6'), new Row('20', '1.0E+6'), new Row('30', '1.0E+6')]))
  parameters.push(new HeaderParameter('$EXTMIN', [new Row('10', '0'), new Row('20', '0'), new Row('30', '0')]))
  parameters.push(new HeaderParameter('$EXTNAMES', [new Row('290', '1')]))
  parameters.push(new HeaderParameter('$FILLETRAD', [new Row('40', '0.5')]))
  parameters.push(new HeaderParameter('$FILLMODE', [new Row('70', '1')]))
  const drawingGuid = '{' + UUID.v1() + '}'
  parameters.push(new HeaderParameter('$FINGERPRINTGUID', [new Row('2', drawingGuid)]))
  parameters.push(new HeaderParameter('$HALOGAP', [new Row('280', '0')]))
  parameters.push(new HeaderParameter('$HIDETEXT', [new Row('280', '1')])) // diff towards spec, 290 cause error in autodesk
  parameters.push(new HeaderParameter('$HYPERLINKBASE', [new Row('1', '')]))
  parameters.push(new HeaderParameter('$INDEXCTL', [new Row('280', '0')]))
  parameters.push(new HeaderParameter('$INSBASE', [new Row('10', '0'), new Row('20', '0'), new Row('30', '0')]))
  parameters.push(new HeaderParameter('$INSUNITS', [new Row('70', '4')]))  // 4 = mm, 1 = inches
  parameters.push(new HeaderParameter('$INTERFERECOLOR', [new Row('62', '1')]))
  parameters.push(new HeaderParameter('$INTERSECTIONCOLOR', [new Row('70', '257')]))
  parameters.push(new HeaderParameter('$INTERSECTIONDISPLAY', [new Row('280', '0')])) // diff towards spec, 290 cause error in autodesk
  parameters.push(new HeaderParameter('$JOINSTYLE', [new Row('280', '0')]))
  parameters.push(new HeaderParameter('$LIMCHECK', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$LIMMAX', [new Row('10', '420'), new Row('20', '297')]))  // A3 = 420 x 297
  parameters.push(new HeaderParameter('$LIMMIN', [new Row('10', '0'), new Row('20', '0')]))
  parameters.push(new HeaderParameter('$LTSCALE', [new Row('40', '1')]))
  parameters.push(new HeaderParameter('$LUNITS', [new Row('70', '2')]))
  parameters.push(new HeaderParameter('$LUPREC', [new Row('70', '4')]))
  parameters.push(new HeaderParameter('$LWDISPLAY', [new Row('290', '0')]))
  parameters.push(new HeaderParameter('$MAXACTVP', [new Row('70', '32')]))
  parameters.push(new HeaderParameter('$MEASUREMENT', [new Row('70', '1')]))
  parameters.push(new HeaderParameter('$MENU', [new Row('1', '.')]))
  parameters.push(new HeaderParameter('$MIRRTEXT', [new Row('70', '1')]))
  parameters.push(new HeaderParameter('$OBSCOLOR', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$OBSLTYPE', [new Row('280', '0')]))
  parameters.push(new HeaderParameter('$ORTHOMODE', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$PDMODE', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$PDSIZE', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$PELEVATION', [new Row('40', '0')]))
  parameters.push(new HeaderParameter('$PEXTMAX', [new Row('10', '0'), new Row('20', '0'), new Row('30', '0')]))
  parameters.push(new HeaderParameter('$PEXTMIN', [new Row('10', '0'), new Row('20', '0'), new Row('30', '0')]))
  parameters.push(new HeaderParameter('$PINSBASE', [new Row('10', '0'), new Row('20', '0'), new Row('30', '0')]))
  parameters.push(new HeaderParameter('$PLIMCHECK', [new Row('70', '0')]))
  parameters.push(new HeaderParameter('$PLIMMAX', [new Row('10', '1000'), new Row('20', '1000')]))
  parameters.push(new HeaderParameter('$PLIMMIN', [new Row('10', '-1000'), new Row('20', '-1000')]))
  parameters.push(new HeaderParameter('$PLINEGEN', [new Row('70', 0)]))
  parameters.push(new HeaderParameter('$PLINEWID', [new Row('40', 0)]))

  parameters.push(new HeaderParameter('$PROXYGRAPHICS', [new Row('70', '1')]))
  parameters.push(new HeaderParameter('$PSLTSCALE', [new Row('70', '1')]))
  parameters.push(new HeaderParameter('$PSTYLEMODE', [new Row('290', '1')])) // 1 = Uses color-dependent plot style tables in the current drawing
  parameters.push(new HeaderParameter('$PSVPSCALE', [new Row('40', 0)]))
  parameters.push(new HeaderParameter('$PUCSBASE', [new Row('2', '')]))
  parameters.push(new HeaderParameter('$PUCSNAME', [new Row('2', '')]))
  parameters.push(new HeaderParameter('$PUCSORG', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$PUCSORGBACK', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$PUCSORGBOTTOM', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$PUCSORGFRONT', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$PUCSORGLEFT', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$PUCSORGRIGHT', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$PUCSORGTOP', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$PUCSORTHOREF', [new Row('2', '')]))
  parameters.push(new HeaderParameter('$PUCSORTHOVIEW', [new Row('70', 0)]))
  parameters.push(new HeaderParameter('$PUCSXDIR', [new Row('10', 1), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$PUCSYDIR', [new Row('10', 0), new Row('20', 1), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$QTEXTMODE', [new Row('70', 0)]))
  parameters.push(new HeaderParameter('$REGENMODE', [new Row('70', 1)]))
  parameters.push(new HeaderParameter('$SHADEDGE', [new Row('70', 3)]))
  parameters.push(new HeaderParameter('$SHADEDIF', [new Row('70', 70)]))
  parameters.push(new HeaderParameter('$SHADOWPLANELOCATION', [new Row('40', 0)]))
  parameters.push(new HeaderParameter('$SKETCHINC', [new Row('40', 0.1)]))
  parameters.push(new HeaderParameter('$SKPOLY', [new Row('70', 0)]))
  parameters.push(new HeaderParameter('$SORTENTS', [new Row('280', 127)]))
  parameters.push(new HeaderParameter('$SPLINESEGS', [new Row('70', 8)]))
  parameters.push(new HeaderParameter('$SPLINETYPE', [new Row('70', 6)]))
  parameters.push(new HeaderParameter('$SURFTAB1', [new Row('70', 6)]))
  parameters.push(new HeaderParameter('$SURFTAB2', [new Row('70', 6)]))
  parameters.push(new HeaderParameter('$SURFTYPE', [new Row('70', 6)]))
  parameters.push(new HeaderParameter('$SURFU', [new Row('70', 6)]))
  parameters.push(new HeaderParameter('$SURFV', [new Row('70', 6)]))
  const creationDate = generateJulianDate()
  parameters.push(new HeaderParameter('$TDCREATE', [new Row('40', creationDate)]))
  parameters.push(new HeaderParameter('$TDINDWG', [new Row('40', 0)]))
  parameters.push(new HeaderParameter('$TDUCREATE', [new Row('40', creationDate)]))
  parameters.push(new HeaderParameter('$TDUPDATE', [new Row('40', creationDate)]))
  parameters.push(new HeaderParameter('$TDUSRTIMER', [new Row('40', 0)]))
  parameters.push(new HeaderParameter('$TDUUPDATE', [new Row('40', creationDate)]))
  parameters.push(new HeaderParameter('$TEXTSIZE', [new Row('40', 0.2)]))
  parameters.push(new HeaderParameter('$TEXTSTYLE', [new Row('7', 'Standard')]))
  parameters.push(new HeaderParameter('$THICKNESS', [new Row('40', 0)]))
  parameters.push(new HeaderParameter('$TILEMODE', [new Row('70', 1)]))
  parameters.push(new HeaderParameter('$TRACEWID', [new Row('40', 0.05)]))
  parameters.push(new HeaderParameter('$TREEDEPTH', [new Row('70', 3020)]))
  parameters.push(new HeaderParameter('$UCSBASE', [new Row('2', '')]))
  parameters.push(new HeaderParameter('$UCSNAME', [new Row('2', '')]))
  parameters.push(new HeaderParameter('$UCSORG', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$UCSORGBACK', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$UCSORGBOTTOM', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$UCSORGFRONT', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$UCSORGLEFT', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$UCSORGRIGHT', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$UCSORGTOP', [new Row('10', 0), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$UCSORTHOREF', [new Row('2', '')]))
  parameters.push(new HeaderParameter('$UCSORTHOVIEW', [new Row('70', 0)]))
  parameters.push(new HeaderParameter('$UCSXDIR', [new Row('10', 1), new Row('20', 0), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$UCSYDIR', [new Row('10', 0), new Row('20', 1), new Row('30', 0)]))
  parameters.push(new HeaderParameter('$UNITMODE', [new Row('70', 0)]))
  parameters.push(new HeaderParameter('$USRTIMER', [new Row('70', 0)])) // 0 = Off
  parameters.push(new HeaderParameter('$VERSIONGUID', [new Row('2', drawingGuid)]))
  parameters.push(new HeaderParameter('$VISRETAIN', [new Row('70', 1)]))
  parameters.push(new HeaderParameter('$WORLDVIEW', [new Row('70', 1)]))
  parameters.push(new HeaderParameter('$XCLIPFRAME', [new Row('280', 2)])) // diff towards spec. 290 gives error
  parameters.push(new HeaderParameter('$XEDIT', [new Row('290', 1)]))


  parameters.push(new HeaderParameter('$HANDSEED', [new Row('5', finalHandseedValue)]))
  parameters.push(new HeaderParameter('$PROJECTNAME', [new Row('1', projectName)])) // Project name

  return parameters
}

function createTypeValueRowsFromDxfData (rows) {
  const output = [] // Row[]
  for (let i = 0; i < rows.length; i = i + 2) {
    output.push(new Row(rows[i], rows[i + 1]))
  }
  return output
}

// http://help.autodesk.com/view/OARX/2018/ENU/?guid=GUID-6942BAF3-095F-4217-9F61-6931975D3A64
function generateJulianDate () {
  return new Date().getTime() / 86400000 + 2440587.5
}

module.exports = HeaderAndDefaults
