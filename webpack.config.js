const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './assets/src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [

            /**
             * CSS
             */
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader"
                }),
            },

            /**
             * SCSS
             */
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        "css-loader",
                        {
                            // Loader for webpack to process CSS with PostCSS
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        "sass-loader",
                        {
                            loader: "sass-resources-loader",
                            options: {
                                resources: [
                                    path.resolve(__dirname, "./assets/src/scss/mixins.scss"),
                                    path.resolve(__dirname, "./assets/src/scss/variables.scss"),
                                ]
                            }
                        }
                    ]
                })
            },

            /**
             * JS
             */
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },

            /*
            * Fonts
            */

            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: /(components)/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    outputPath: './fonts/',
                }
            },


            /*
            * Images
            */
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'file-loader',
                exclude: /(webfonts|iconfonts|fonts)/,
                options: {
                    name(file) {
                        file = file.replace(/\\/g, "/")
                        let basePath = path.resolve(__dirname, "").replace(/\\/g, "/");
                        let result = file;
                        result = result.replace(basePath + "/assets/images", "/images");
                        result = result.replace(basePath + "/node_modules", "/node_modules");
                        // result = result.replace("/img", "");
                        return result;
                    },
                    // name: '[path][name].[ext]?[hash]',
                    outputPath: './'
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/frontend'),
            'Components': path.resolve(__dirname, 'src/frontend/components')
        },
        extensions: ['*', '.js', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin("../dist/app.css"),
        new webpack.ProvidePlugin( {
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        } )
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        }),

    ])
}
