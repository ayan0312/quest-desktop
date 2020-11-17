import db, { DB } from 'src/node/Database'
import { QuestControllerTypeCodes } from './QuestController'
import { QuestProgressOptions } from './QuestProgress'
import { QuestOptions } from './Quest'
import { QuestRewardOptions } from './QuestReward'
import {
    DailyQuestOptions,
    WeeklyQuestOptions,
    MonthlyQuestOptions
} from './DateQuest'

export type Id = string

export type QuestRewardData = Required<QuestRewardOptions>
export type RewardGroup = {
    rewardGroup: QuestRewardData[]
}

export type QuestData<T extends QuestOptions = QuestOptions> = Required<T> &
    RewardGroup
export type DailyQuestData = QuestData<DailyQuestOptions>
export type WeeklyQuestData = QuestData<WeeklyQuestOptions>
export type MonthlyQuestData = QuestData<MonthlyQuestOptions>

export interface QuestProgressData extends Required<QuestProgressOptions> {
    currentStage: number
    currentStageValue: number
}

export class QuestDB {
    private db: DB

    constructor() {
        this.db = db
        this.initalize()
    }

    public initalize() {
        if (!this.db.has('dailySettings')) {
            this.db.set('dailySettings', {})
            this.db.set('dailyProcessingQuests', [])
            this.db.set('dailyCompletedQuests', [])
            this.db.set('dailyFailedQuests', [])
            this.db.set('dailyQuestTemplates', [])
        }

        if (!this.db.has('weeklySettings')) {
            this.db.set('weeklySettings', {})
            this.db.set('weeklyProcessingQuests', [])
            this.db.set('weeklyCompletedQuests', [])
            this.db.set('weeklyFailedQuests', [])
            this.db.set('weeklyQuestTemplates', [])
        }

        if (!this.db.has('monthlySettings')) {
            this.db.set('monthlySettings', {})
            this.db.set('monthlyProcessingQuests', [])
            this.db.set('monthlyCompletedQuests', [])
            this.db.set('monthlyFailedQuests', [])
            this.db.set('monthlyQuestTemplates', [])
        }

        if (!this.db.has('progresses')) this.db.set('progresses', [])
    }

    public getDailyQuestTemplates(): Omit<DailyQuestData, 'id'>[] {
        return this.db.get('dailyQuestTemplates')
    }

    public getDailyProcessingQuests(): DailyQuestData[] {
        return this.db.get('processingQuests')
    }

    public addDailyQuestTemplates<P extends Omit<DailyQuestOptions, 'id'>>(
        option: P
    ) {
        this.db.push('dailyQuestTemplates', option)
    }

    public addDailyProcessingQuest(value: DailyQuestData) {
        this.db.push('dailyProcessingQuests', value)
    }

    public addDailyCompletedQuest(value: DailyQuestData) {
        this.db.delete('dailyProcessingQuests', value.id)
        this.db.push('dailyCompletedQuests', value)
    }

    public addDailyFailedQuest(value: DailyQuestData) {
        this.db.delete('dailyProcessingQuests', value.id)
        this.db.push('dailyFailedQuests', value)
    }

    public hasProgress(type: QuestControllerTypeCodes) {
        let data = this.db.find('progresses', {
            type
        })

        if (data) return true

        return false
    }

    public getProgress(type: QuestControllerTypeCodes): QuestProgressData {
        return this.db.find('progresses', {
            type
        })
    }

    public addProgress(value: QuestProgressData) {
        if (this.hasProgress(value.type)) {
            this.updateProgress(value)
        } else this.db.push('progresses', value)
    }

    public updateProgress(value: QuestProgressData) {
        this.db.update(
            'progresses',
            {
                type: value.type
            },
            value
        )
    }
}

export default new QuestDB()
