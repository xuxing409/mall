const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  chainWebpack:(config)=>{
    config.resolve.alias
        //set第一个参数：设置的别名，第二个参数：设置的路径
        .set('@',resolve('src'))
        .set('assets',resolve('src/assets'))
        .set('components',resolve('src/components'))
        .set('network',resolve('src/network'))
        .set('views',resolve('src/views'))
        // // 配置svg默认规则排除icons目录中svg文件处理   
        // config.module      
        // 　　.rule("svg")      
        // 　　.exclude.add(resolve("src/assets/img/common"))      
        // 　　.end();
        //   // 新增icons规则，设置svg-sprite-loader处理icons目录中svg文件    
        //   config.module      
        // 　　.rule("icons")    
        //   　　.test(/\.svg$/)    
        //   　　.include.add(resolve("src/assets/img/common"))  
        //     　.end()      
        // 　　　.use("svg-sprite-loader")    
        //   　　.loader("svg-sprite-loader")     
        //   　　.options({ symbolId: "icon-[name]" })     
        //   　　.end();  
  },
  
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       'assets': '@/assets',
  //       'common': '@/common',
  //       'components': '@/components',
  //       'network': '@/network',
  //       'views': '@/views',
  //     }
  //   }
  // },
  publicPath: './'
}