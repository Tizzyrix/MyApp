const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = (ext) => isDev? `[name].${ext}` : `[name].[contenthash].${ext}`;
const optimization = () => {
    const configObj = {
        splitChunks: {
            chunks: 'all',
        }
    }
    if (isProd) {
        configObj.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin(),
        ];
    }
    return configObj;
};
const plugins = () => {
    const basePlugins = [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./styles/${filename('css')}`,
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'app/assets') },
        //     ],
        // }),
    ];
    if (isProd) {
        basePlugins.push(
            new ImageMinimizerPlugin({
                minimizerOptions: {
                  plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    [
                      'svgo',
                      {
                        plugins: [
                          {
                            removeViewBox: false,
                          },
                        ],
                      },
                    ],
                  ],
                },
              }),
        );
    }
    return basePlugins;
};

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: ["@babel/polyfill", "./index.jsx"],
    output: {
        path: path.resolve(__dirname, 'app'),
        filename: `./js/${filename('js')}`,
        publicPath: '',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.wasm'],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'app'),
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            },
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                          sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                          sourceMap: true,
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: `./img/${filename('[ext]')}`,
                    },
                  },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-react' ,'@babel/preset-env']
                  }
                }
            },
        ],
    },
    optimization: optimization(),
};
