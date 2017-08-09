module.exports = {
    // devtool: 'eval-source-map',
    devtool: 'inline-source-map',
    target: "electron",
    entry: {
      "app/server/main"   : "./src/main/server/main.js",
      "app/public/bundle" : "./src/renderer/container/index.js"
    },
    node: {
      __dirname: false,
    },
    output : {
      path : __dirname ,
      filename : "[name].js",
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    module : {
      loaders : [
        {
          test : /\.json$/,
          loader : "json-loader"
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['babel-preset-es2015' ,'react']
          }
        },
        {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        // loaders: ['css-loader?modules'],
        },
      ]
    },
    devServer: {
     contentBase: "./",
     historyApiFallback: true,
     inline: true
    }
}
