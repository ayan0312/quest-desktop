import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import shortid from 'shortid'
import path from 'path'
import fs from 'fs-extra'
import { remote, app } from 'electron'
import {
    QuestControllerTypeCodes,
    QuestControllerOption
} from '../QuestSystem/QuestController'

const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('desktop')

if (process.type !== 'renderer') {
    if (!fs.pathExistsSync(STORE_PATH)) {
        fs.mkdirpSync(STORE_PATH)
    }
}

export function createId() {
    return shortid.generate()
}

export type controllers<
    T extends QuestControllerOption = QuestControllerOption
> = Record<QuestControllerTypeCodes, T>

export class DB {
    private db: Datastore.LowdbSync<Datastore.AdapterSync>
    constructor() {
        const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))

        this.db = Datastore(adapter)
    }

    public read() {
        return this.db.read()
    }

    public push(key: string, data: any): any {
        return (
            this.read()
                .get(key)
                //@ts-ignore
                .push(data)
                .write()
        )
    }

    public delete(key: string, id: string): any {
        return (
            this.read()
                .get(key)
                //@ts-ignore
                .remove({
                    id
                })
                .write()
        )
    }

    public find(key: string, query: Record<string, any>): any {
        return (
            this.read()
                .get(key)
                //@ts-ignore
                .find(query)
                .value()
        )
    }

    public update(key: string, query: Record<string, any>, data: any): any {
        return (
            this.read()
                .get(key)
                //@ts-ignore
                .find(query)
                .assign(data)
                .write()
        )
    }

    public get(key = '') {
        return this.read()
            .get(key)
            .value()
    }

    public set(key: string, value: any) {
        return this.read()
            .set(key, value)
            .write()
    }

    public has(key: string) {
        return this.read()
            .has(key)
            .value()
    }
}

export default new DB()
