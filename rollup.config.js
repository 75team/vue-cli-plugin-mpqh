import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import builtinModules from 'builtin-modules'
import json from '@rollup/plugin-json'

export default {
  input: 'generator/main.js',
  output: {
    file: 'generator/index.js',
    format: 'cjs'
  },
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    json()
  ],
  external: builtinModules
}
