process.env.NODE_ENV = 'development'

import path from 'path'
import chalk from 'chalk'
import webpack from 'webpack'
import electron from 'electron'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'

import WebpackDevServer from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpackHotMiddleware from 'webpack-hot-middleware'

import paths from './utils/paths'
import { logStats, greeting } from './utils/log'

import webpackConfigMain from './webpack/webpackConfigMain'
import webpackConfigRenderer from './webpack/webpackConfigRenderer'

let manualRestart: boolean = false
let hotMiddleware: webpackHotMiddleware.EventStream
let electronProcess: ChildProcessWithoutNullStreams | null = null

function startRenderer() {
    return new Promise(resolve => {
        if (webpackConfigRenderer.plugins === undefined) {
            webpackConfigRenderer.plugins = []
        }

        webpackConfigRenderer.plugins.push(
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(paths.electronBrowserPath, 'index.html'),
                minify: {
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true
                },
                nodeModules: path.resolve(paths.rootPath, './node_modules')
            })
        )

        const compiler: webpack.Compiler = webpack(webpackConfigRenderer)
        hotMiddleware = webpackHotMiddleware(compiler, {
            log: false,
            heartbeat: 2500
        })

        compiler.hooks.done.tap('done', (stats: webpack.Stats) => {
            logStats('Renderer', stats)
        })

        const server: WebpackDevServer = new WebpackDevServer(compiler, {
            contentBase: path.resolve(paths.rootPath, 'app/dist'),
            quiet: true,
            before(app: any, ctx: any) {
                app.use(hotMiddleware)
                ctx.middleware.waitUntilValid(() => {
                    resolve()
                })
            }
        })

        server.listen(1212)
    })
}

export function startMain() {
    return new Promise(resolve => {
        const compiler: webpack.Compiler = webpack(webpackConfigMain)

        compiler.hooks.watchRun.tapAsync(
            'watch-run',
            (compilation: webpack.Compiler, done: any) => {
                logStats('Main', chalk.white.bold('compiling...'))
                done()
            }
        )

        compiler.watch({}, (err: any, stats: any) => {
            if (err) {
                console.log(err)
                return
            }

            logStats('Main', stats)

            if (electronProcess && electronProcess.kill) {
                manualRestart = true
                process.kill(electronProcess.pid)
                electronProcess = null
                startElectron()

                setTimeout(() => {
                    manualRestart = false
                }, 5000)
            }

            resolve()
        })
    })
}

export function startElectron() {
    const args = [
        '--inspect=5858',
        path.resolve(paths.rootPath, 'app/dist/main.js')
    ]

    electronProcess = spawn(String(electron), args)

    electronProcess.stdout.on('data', data => {
        electronLog(data, 'blue')
    })
    electronProcess.stderr.on('data', data => {
        electronLog(data, 'red')
    })

    electronProcess.on('close', () => {
        if (!manualRestart) process.exit()
    })
}

function electronLog(data: any, color: string) {
    let log: string = ''
    const currentData = data.toString().split(/\r?\n/)
    currentData.forEach((line: string) => {
        log += `  ${line}\n`
    })
    if (/[0-9A-z]+/.test(log)) {
        if (color === 'red' || color === 'blue') {
            console.log(
                `${chalk[color].bold(
                    '┏ Electron -------------------'
                )}\n\n${log}${chalk[color].bold(
                    '┗ ----------------------------'
                )}\n`
            )
        }
    }
}

function devRunner() {
    greeting()

    Promise.all([startRenderer(), startMain()])
        .then(() => {
            startElectron()
        })
        .catch(err => {
            console.error(err)
        })
}

devRunner()
