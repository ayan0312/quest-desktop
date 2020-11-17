import { EventEmitter } from 'events'
import { Quest } from 'src/node/QuestSystem/Quest'

export class QuestStorage<T extends Quest = Quest> {
    private storage: Map<string, T> = new Map()
    /**
     * [1-9]
     */
    public getCount() {
        return this.storage.size
    }

    public add(item: T): void {
        if (!this.storage.get(item.id)) {
            this.storage.set(item.id, item)
        }
    }

    public addAll(items: T[]): void {
        items.forEach(item => {
            this.add(item)
        })
    }

    public get(id: string): T | null {
        let item = this.storage.get(id)
        if (!item) return null
        return item
    }

    public findAll(name: string): T[] | [] {
        let items: T[] = []
        for (let arr of this.storage) {
            if (arr[1].name === name) {
                items.push(arr[1])
            }
        }
        return items
    }

    public each(callback?: (item: T) => void) {
        for (let arr of this.storage) {
            callback(arr[1])
        }
    }

    public delete(id: string): T {
        let quest = this.storage.get(id)
        this.storage.delete(id)
        return quest
    }
}
