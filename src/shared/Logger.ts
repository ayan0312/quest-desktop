import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import util from 'util'

import { formatDate } from 'src/shared/TimeTools'

export interface LoggerLevel {
    success: LoggerLevelColor
    info: LoggerLevelColor
    warn: LoggerLevelColor
    error: LoggerLevelColor
}

export interface LoggerLevelOrder {
    success: number
    info: number
    warn: number
    error: number
}

export type LoggerLevelColor =
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white'
    | 'gray'
    | 'grey'

export class Logger {
    private _path: string
    private _level: LoggerLevel
    private _outputLevel: keyof LoggerLevel

    private _levelOrder: LoggerLevelOrder = {
        success: 1,
        info: 2,
        warn: 3,
        error: 4
    }

    constructor(
        path: string,
        outputLevel: keyof LoggerLevel = 'warn',
        levelOrder?: LoggerLevelOrder
    ) {
        this._level = {
            success: 'green',
            info: 'white',
            warn: 'yellow',
            error: 'red'
        }
        this._path = path
        this._outputLevel = outputLevel
        if (levelOrder) {
            this._levelOrder = levelOrder
        }
    }

    private _log(type: keyof LoggerLevel, msg: string | Error): void {
        const level: LoggerLevelColor = this._level[type]
        let log = chalk[level](`[yukino ${type.toUpperCase()}]: `)
        log += msg
        console.log(log)
        process.nextTick(() => {
            this._writeLog(type, msg)
        })
    }

    private _writeLog(type: keyof LoggerLevel, msg: string | Error): void {
        if (!this._checkOutputLevel(type)) return

        try {
            const yukinoLogStream: fs.WriteStream = fs.createWriteStream(
                path.join(this._path, './yukino.log'),
                {
                    flags: 'a',
                    encoding: 'utf8'
                }
            )

            let logInfoHead: string = `${formatDate(
                'y-M-d,H:m:s',
                new Date()
            )} [yukino ${type.toUpperCase()}] ${msg}`
            let logger: Console | null = new console.Console(yukinoLogStream)
            if (typeof msg === 'object' && type === 'error') {
                logInfoHead += `\n------Error Stack Begin------\n${util.format(
                    msg.stack
                )}\n-------Error Stack End-------`
            }
            logger.log(logInfoHead)
            yukinoLogStream.destroy()
            logger = null
        } catch (e) {
            console.error(e)
        }
    }

    private _checkOutputLevel(type: keyof LoggerLevel): boolean {
        if (this._levelOrder[this._outputLevel] > this._levelOrder[type]) {
            return false
        }
        return true
    }

    public success(msg: string | Error): void {
        this._log('success', msg)
    }

    public info(msg: string | Error): void {
        this._log('info', msg)
    }

    public warn(msg: string | Error): void {
        this._log('warn', msg)
    }

    public error(msg: string | Error): void {
        this._log('error', msg)
    }
}

export const logger = new Logger('D:\\Workspace\\Log')
