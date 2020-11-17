import { EventEmitter } from 'events'
import { QuestStorage } from 'src/node/QuestSystem/QuestStorage'
import { Quest, QuestOptions } from 'src/node/QuestSystem/Quest'
import {
    QuestProgress,
    QuestProgressOptions
} from 'src/node/QuestSystem/QuestProgress'
import { QuestData, QuestProgressData } from './QuestDB'
import { extend } from 'src/shared/Utilities'

export const enum QuestControllerTypeCodes {
    BASE,
    DATE,
    MAINLINE,
    SIDELINE,
    ACTIVITY,
    DAILY,
    WEEKLY,
    MONTHLY
}

export class QuestController<
    T extends Quest = Quest,
    P extends QuestOptions = QuestOptions
> extends EventEmitter {
    public readonly type: QuestControllerTypeCodes

    public readonly QuestConstructor: typeof Quest

    protected readonly processingStorage: QuestStorage<T>
    protected readonly completedStorage: QuestStorage<T>
    protected readonly failedStorage: QuestStorage<T>

    protected progress: QuestProgress

    constructor() {
        super()
        this.type = QuestControllerTypeCodes.BASE
        this.QuestConstructor = Quest
        this.processingStorage = new QuestStorage<T>()
        this.completedStorage = new QuestStorage<T>()
        this.failedStorage = new QuestStorage<T>()
    }

    public init(processingQuests: P[], constructor: { new (o: P): T }) {
        processingQuests.forEach(questData => {
            if (questData.type === this.type) {
                let quest: T = new constructor(questData)
                this.processingStorage.add(quest)
            }
        })
    }

    public setProgress(option: Omit<QuestProgressOptions, 'type'>) {
        this.progress = new QuestProgress(
            extend(option, {
                type: this.type
            })
        )
    }

    public addQuest(quest: T): void {
        quest.start()
        this.processingStorage.add(quest)
        this.emit('questProcessing', quest)
        this.emit('questChange')
    }

    public deleteQuest(id: string): void {
        let quest = this.processingStorage.delete(id)

        if (!quest) return

        this.emit('questDeleted', quest)
        this.emit('questChange')
    }

    public completeQuest(id: string): void {
        let quest = this.processingStorage.get(id)

        if (!quest) return

        quest.complete()
        this.completedStorage.add(quest)
        this.processingStorage.delete(id)
        this.emit('questCompleted', quest)
        this.emit('questChange')
    }

    public failQuest(id: string): void {
        let quest = this.processingStorage.get(id)

        if (!quest) return

        quest.fail()
        this.failedStorage.add(quest)
        this.processingStorage.delete(id)
        this.emit('questFailed', quest)
        this.emit('questChange')
    }

    public printQuests(): QuestData[] {
        let quests: QuestData[] = []
        this.processingStorage.each((item: T) => {
            quests.push(item.print())
        })
        return quests
    }

    public addProgressValue(value: number): void {
        this.progress.addValue(value)
    }

    public printProgressData(): QuestProgressData {
        return this.progress.print()
    }

    public getProcessingQuestCount(): number {
        return this.processingStorage.getCount()
    }

    public getCompletedQuestCount(): number {
        return this.completedStorage.getCount()
    }

    public getFailedQuestCount(): number {
        return this.failedStorage.getCount()
    }

    public getTotalQuestCount(): number {
        return (
            this.getProcessingQuestCount() +
            this.getCompletedQuestCount() +
            this.getFailedQuestCount()
        )
    }
}
