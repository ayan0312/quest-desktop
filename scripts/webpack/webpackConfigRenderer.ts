import path from 'path'
import webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'

import paths from '../utils/paths'
import { __DEV__ } from '../utils/env'

const rules: any[] = []

rules.push({
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/
})

rules.push({
    test: /\.svg$/,
    loader: 'svg-inline-loader'
})

rules.push({
    test: /\.(ico|jpg|jpeg|png|gif)(\?.*)?$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: __DEV__ ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]'
            }
        }
    ]
})

rules.push({
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 10000
        }
    }
})
const plugins: any[] = []
if (!__DEV__) {
    plugins.push(
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(paths.electronBrowserPath, 'index.html'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true
            },
            nodeModules: false
        }),
        new webpack.HashedModuleIdsPlugin()
    )
}
const webpackConfigRenderer: webpack.Configuration = {
    plugins,
    mode: __DEV__ ? 'development' : 'production',
    target: 'electron-renderer',
    devtool: __DEV__ ? 'inline-source-map' : 'source-map',
    entry: {
        building: path.resolve(paths.electronBrowserPath, 'index.tsx')
    },
    output: {
        path: path.resolve(paths.rootPath, 'app/dist'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            src: paths.srcPath
        },
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules
    },
    node: {
        global: false,
        __filename: false,
        __dirname: false
    }
}
export default webpackConfigRenderer
