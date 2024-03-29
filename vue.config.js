const {defineConfig} = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/self-billing-website/'
    : '/',
  transpileDependencies: true,
  lintOnSave: false,


  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')
    const dir2 = path.resolve(__dirname, 'src/assets/icons/original')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() //包含 icons 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()

    config.module
      .rule('svgo')
      .test(/\.svg$/)
      .exclude.add(dir2).end()
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({
        ...options, plugins: [{name: 'removeAttrs', params: {attrs: '(fill|stroke)'}}]
      })).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) //其他 svg loader 排除 icons 目录
  }
})
