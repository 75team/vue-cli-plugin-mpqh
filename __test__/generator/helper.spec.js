const { resolveFile, render } = require('../../generator/helper')
const ejs = require('ejs')

test('generator:helper resolveFile', async () => {
  const _files = await resolveFile('./generator/template')
  // console.log(_files)
  expect(_files).toContain('README.md',
    '_gitignore',
    'app.js',
    'app.json',
    'package-lock.json',
    'package.json',
    'yarn-error.log',
    'yarn.lock',
    'public/favicon.ico',
    'public/index.html',
    'pages/home/index.css',
    'pages/home/index.html',
    'pages/home/index.js',
    'pages/home/index.json',
    'pages/wordbook/index.css',
    'pages/wordbook/index.html',
    'pages/wordbook/index.js',
    'pages/wordbook/index.json',
    'public/images/mp-360.ico',
    'pages/demo/index.css',
    'pages/demo/index.html',
    'pages/demo/index.js',
    'pages/demo/index.json'
  )
})

// test('generator:helper readFile', async () => {
//   const _files = await resolveFile('./generator/template')
//   const content = await readFile(`./generator/template/${_files[0]}`)

//   console.log(content)
//   expect(content).toBe(``)
// })

test('generator:helper render', async () => {
  const files = await render('./template', {
    rootOptions: {
      plugins: []
    },
    doesCompile: false,
    plugins: []
  })({}, ejs.render)

  expect(files['.gitignore']).toEqual(`node_modules/
**/*.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
dist/
`)
})
