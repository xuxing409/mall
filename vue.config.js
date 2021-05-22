module.exports = {
  // chainWebpack:(config)=>{
  //   config.resolve.alias
  //       //set第一个参数：设置的别名，第二个参数：设置的路径
  //       .set('@',resolve('./src'))
  //       .set('assets',resolve('@/assets'))
  //       .set('components',resolve('@/components'))
  //       .set('network',resolve('@/network'))
  //       .set('views',resolve('@/views'))
  // }
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  publicPath: './'
}