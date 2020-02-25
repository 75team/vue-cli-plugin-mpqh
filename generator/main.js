const { render } = require('./helper')

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
  api.extendPackage(require('./template/package.json'))
}
