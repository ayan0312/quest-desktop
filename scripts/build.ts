process.env.NODE_ENV = 'production'

import chalk from 'chalk'
import webpack from 'webpack'

import { greeting, logStats } from './utils/log'

import webpackConfigMain from './webpack/webpackConfigMain'
import webpackConfigRenderer from './webpack/webpackConfigRenderer'

async function build() {
    const errorLog = `${chalk.bgRed.white(' ERROR ')}  `
    greeting()

    pack('Main', webpackConfigMain).catch(err => {
        console.log(`\n  ${errorLog}failed to build main process`)
        console.error(`\n${err}\n`)
        process.exit(1)
    })

    pack('Renderer', webpackConfigRenderer).catch(err => {
        console.log(`\n  ${errorLog}failed to build renderer process`)
        console.error(`\n${err}\n`)
        process.exit(1)
    })
}

function pack(type: string, config: webpack.Configuration) {
    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (err) reject(err.stack || err)
            else if (stats.hasErrors()) {
                let err = ''

                stats
                    .toString({
                        chunks: false,
                        colors: true
                    })
                    .split(/\r?\n/)
                    .forEach(line => {
                        err += `    ${line}\n`
                    })

                reject(err)
            } else {
                logStats(type, stats)
                resolve()
            }
        })
    })
}

build()
