/**
 * @class Util
 */
class Util {
  /**
     * 支持 win cmd
     * 在 win 下使用 npm.cmd 替换 npm
     * @param {String} cmd
     */
  resolveCmd (cmd) {
    return /^win/.test(process.platform) ? `${cmd}.cmd` : `${cmd}`
  }
  /**
     * 获取 npm 包元信息
     * @param {String} pkgName
     */
  async getPkgMetadata (pkgName) {
    const { execFile } = require('child_process')
    const util = require('util')
    const exec = util.promisify(execFile)
    const cmd = this.resolveCmd('npm')
    const { stdout } = await exec(cmd, ['show', '--json', pkgName])

    return JSON.parse(stdout)
  }
  /**
     * 获取 npm 包版本号
     * @param {String} pkgName
     */
  async getPkgVersion (pkgName, tag = 'latest') {
    const metadata = await this.getPkgMetadata(pkgName)
    const distTags = Reflect.get(metadata || { 'dist-tags': {}}, 'dist-tags')

    return Reflect.get(distTags, tag)
  }
  /**
     * void function
     */
  voidFunc () {}
}

module.exports = new Util()
