import path from "path";
import webpack from "webpack";

export default {
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },
      {test: /\.json$/, loader: "json-loader"},
      {
        test: /\.{js,mjs}?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                esmodules: false,
                useBuiltIns: true,
                targets: {
                  browsers: [
                    '> 1%',
                    'last 2 versions',
                    'Firefox ESR',
                  ],
                },
              }],
            ],
          },
        },
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    })
  ],

  resolve: {
    // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
    extensions: ["*", ".mjs", ".js", ".json", ".gql", ".graphql"]
  },

  context: path.join(__dirname, "src"),
  entry: {
    appes5: ['./js/app']
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js"
  },
  externals: [/^vendor\/.+\.js$/]
};
