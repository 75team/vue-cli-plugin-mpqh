const { render } = require('./helper')
const { SEAPP_BUILDER } = require('./constants')
const util = require('./util')

module.exports = async (api, options) => {
  const { generator } = api
  api.render(
    render(
      './template',
      {
        rootOptions: {
          plugins: []
        },
        doesCompile: false,
        plugins: []
      },
      {}
    )
  )

  // reset pkg
  generator.pkg = Object.assign({}, generator.originalPkg)

  const builderVersion = await util.getPkgVersion(SEAPP_BUILDER)

  api.extendPackage({
    scripts: {
      serve: 'builder watch',
      build: 'builder build'
    },
    devDependencies: {
      '@qihoo/seapp-builder': builderVersion
    }
  })
}
