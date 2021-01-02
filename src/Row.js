// Helper structure
class Row {
  type
  value

  constructor (type, value) {
    this.type = type
    this.value = value
  }

  toString()
  {
    return `${this.type}\n${this.value}\n`
  }
}

module.exports = Row
