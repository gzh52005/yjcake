// react-app-rewired@1.x写法
// const { injectBabelPlugin } = require('react-app-rewired');
// module.exports = function override(config, env) {
//     // config：webpack配置

//     // 添加别名
//     // config.resolve.alias['@'] = path.join(__dirname,'./src/')
//     Object.assign(config.resolve.alias,{
//         '@':path.join(__dirname,'./src/'),
//         '~':path.join(__dirname,'./src/views')
//     });

//     // 添加babel插件
//     // config.module.rules[0].use[0].options.plugins.push( ['@babel/plugin-proposal-decorators',{legacy: true}]) // 麻烦，不推荐
//     config = injectBabelPlugin([
//         "@babel/plugin-proposal-decorators", { "legacy": true }
//     ], config);
//     return config;
// }

// react-app-rewired@2.x写法
const {override,addBabelPlugin,addBabelPlugins, addDecoratorsLegacy,disableEsLint,useBabelRc,fixBabelImports} = require('customize-cra');

module.exports = override(
    addDecoratorsLegacy(),
    // addBabelPlugin("@babel/plugin-proposal-decorators", { "legacy": true }),
    // addBabelPlugins(),
    // disableEsLint(),
    //useBabelRc(),
    fixBabelImports('import',{ libraryName: "antd", style: "css" }),
    // fixBabelImports('import',{ libraryName: "antd", style: "css" },'antdm')
)