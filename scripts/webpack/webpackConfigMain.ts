import path from 'path'
import webpack from 'webpack'

import paths from '../utils/paths'
import { __DEV__ } from '../utils/env'

const rules: any[] = []
rules.push({
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/
})
const webpackConfigMain: webpack.Configuration = {
    mode: __DEV__ ? 'development' : 'production',
    target: 'electron-main',
    devtool: 'source-map',
    output: {
        path: path.resolve(paths.rootPath, 'app/dist'),
        filename: 'main.js'
    },
    entry: {
        main: path.resolve(paths.electronMainPath, 'index.ts')
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
export default webpackConfigMain
