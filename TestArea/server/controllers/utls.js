const path = require('path')
const { v4: uuidv4 } = require('uuid')

function getExtension (path) {
  const basename = path.split(/[\\/]/).pop()
  const pos = basename.lastIndexOf('.')

  if (basename === '' || pos < 1)
    return ''

  return basename.slice(pos + 1)
}

const getImgs = (req, FileName = null) => {
  let fileName = null

  if (req.files) {
    const { img=null } = req.files
    if (img) {
      if ((FileName) && (img === FileName)) return FileName

      const ex = getExtension(img.name)

      fileName = [uuidv4(), ex ? '.' + ex : ''].join('')
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
    }
  }

  return fileName
}

module.exports = {
getImgs}
