const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const browsersList = [
  "edge >= 16",
  "safari >= 10",
  "firefox >= 57",
  "ios >= 10",
  "chrome >= 50"
]

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: true
    });
  });
}
//if u dont need clear cache set random to 0
//const random = Math.round(0 - 0.5 + Math.random() * (100 + 1))

const random = 0;


const htmlPlugins = generateHtmlPlugins('./src/html/views');


function getConfig(env) {
  const mode = env.mode || 'development'
  const isDev = mode === 'development'

  return  {
    target: ['web'],
    entry: {
      app: path.resolve(path.resolve(__dirname, './src/'), 'js', 'app.js'),
    },
    output: {
      filename: 'js/[name].js?v='+ random,
      chunkFilename: 'js/[name].[chunkhash].js', // Применить хэш к чанкам
      path: path.resolve(__dirname, './dist/'),
    },
    devtool: isDev ? 'source-map': undefined,
    mode: 'production',
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
            enforce: true
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          extractComments: true
        }),
        new CssMinimizerPlugin(),
      ],
      minimize: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: [
            path.resolve(__dirname, "node_modules/swiper"),
            path.resolve(__dirname, "src/"),
          ],
          use: [{
            loader: 'babel-loader',
          }]
        },
        {
          test: /.s?css$/,
          include: path.resolve(__dirname, 'src/scss'),
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {}
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [
                    [
                      'autoprefixer',
                      {
                        overrideBrowserslist: browsersList
                      }
                    ]
                  ]
                }
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ]
        },
        {
          test: /\.html$/,
          include: path.resolve(__dirname, 'src/html/includes'),
          use: ['raw-loader']
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: "asset",
        },
        {
          test: /\.svg$/,
          use: [
            'svg-sprite-loader',
            'svgo-loader'
          ]
        }
      ]
    },
    resolve: {
      alias: {
        $: path.resolve('node_modules', 'jquery/src/jquery'),
        jquery: path.resolve('node_modules', 'jquery/src/jquery'),
      }
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
      new MiniCssExtractPlugin({
        filename: './css/style.bundle.css'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/fonts',
            to: './fonts'
          },
          {
            from: './src/favicon',
            to: './favicon'
          },
          {
            from: './src/img',
            to: './img'
          },
        ]
      }),
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        inputmask: 'inputmask'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ].concat(htmlPlugins),
    devServer: {
      static: {
        directory: path.join(__dirname, 'src'),
      },
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      compress: true,
      port: 8080,
      historyApiFallback: true,
      hot: true
    }
  }
}

const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = (env, argv) => {
  if (env.mode === 'production') {
    getConfig(env).plugins.push(new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['js/'], // Указываем путь к папке js
    }));
  } else {
    getConfig(env).plugins.push(new LiveReloadPlugin({
      appendScriptTag: true,
    }))
  }
  return getConfig(env);
};
