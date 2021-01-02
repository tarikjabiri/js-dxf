// const Row = require('./Row')

function generateStringFromRows (rows) {  // Row[]
  const outputAsStrings = []  // string[]
  rows.forEach(item => {
    outputAsStrings.push(item.type)
    outputAsStrings.push(item.value.toString())
  })
  const s = outputAsStrings.join('\n') + '\n'
  return s
}

module.exports = {
  generateStringFromRows
}
