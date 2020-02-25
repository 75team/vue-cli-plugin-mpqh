const globby = require('globby')
const fs = require('fs')
const path = require('path')
const { isBinaryFileSync } = require('isbinaryfile')

async function resolveFile(source) {
  const _files = await globby(['**/*'], { cwd: source })

  return _files
}

async function renderFile(sourcePath, data, ejsOption, render) {
  if (isBinaryFileSync(sourcePath)) {
    return fs.readFileSync(sourcePath)
  }
  return render(
    fs.readFileSync(sourcePath, 'utf-8').toString(),
    data,
    ejsOption
  )
}

function deleteObjProp(obj) {
  for (const key in obj) {
    delete obj[key]
  }
}

exports.render = (templatePath, data = {}, ejsOption = {}) => async (
  files,
  render
) => {
  templatePath = path.resolve(__dirname, templatePath)
  const _files = await resolveFile(templatePath)
  deleteObjProp(files)

  for (const rawPath of _files) {
    const targetPath = rawPath
      .split('/')
      .map(filename => {
        if (filename.charAt(0) === '_' && filename.charAt(1) !== '_') {
          return `.${filename.slice(1)}`
        }
        if (filename.charAt(0) === '_' && filename.charAt(1) === '_') {
          return `${filename.slice(1)}`
        }
        return filename
      })
      .join('/')
    const sourcePath = path.resolve(templatePath, rawPath)
    const content = await renderFile(sourcePath, data, ejsOption, render)

    files[targetPath] = content
  }

  return files
}
