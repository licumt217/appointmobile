/**
 * Created by liqiang on 2017/5/30.
 */
// https://github.com/shelljs/shelljs
//打包文件 命令 npm run build
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora') //Elegant terminal spinner  终端
var webpack = require('webpack')
var webpackConfig = require('./webpack.prep.config')

console.log(
    '  Tip:\n' +
    '  Built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for preping...')
spinner.start()

var assetsPath = path.join(config.prep.assetsRoot, config.prep.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
})
