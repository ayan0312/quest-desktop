import { EventEmitter } from 'events'
import {
    QuestRewardOptions,
    QuestReward
} from 'src/node/QuestSystem/QuestReward'
import { QuestControllerTypeCodes } from 'src/node/QuestSystem/QuestController'
import { QuestData, QuestRewardData, Id } from './QuestDB'

export interface QueryQuestTemplate {
    type: QuestControllerTypeCodes
    id: Id
    counts: number
    completedCounts?: number
}

export type QuestCondition = QuestCountsCondition | QuestEmptyCondition

export interface QuestCountsCondition {
    type: QuestConditionCodes.QUEST_COUNTS
    questTemplates: QueryQuestTemplate[]
}

export interface QuestEmptyCondition {
    type: QuestConditionCodes.EMPTY
}

export interface QuestOptions {
    id: Id
    name: string
    type?: QuestControllerTypeCodes
    state?: QuestStateCodes
    description?: string
    rewardGroup?: QuestRewardOptions[]
    condition?: QuestCondition
    failedTimestamp?: number
    startedTimestamp?: number
    creationTimestamp?: number
    completedTimestamp?: number
}

export const enum QuestStateCodes {
    FAILED,
    COMPLETED,
    PROCESSING,
    INITIALIZED
}

export const enum QuestConditionCodes {
    QUEST_COUNTS,
    TIMING,
    EMPTY
}

export class Quest extends EventEmitter {
    public readonly id: string
    public readonly name: string
    public readonly description: string
    public readonly creationTimestamp: number
    public readonly type: QuestControllerTypeCodes

    protected startedTimestamp = 0
    protected completedTimestamp = 0
    protected failedTimestamp = 0
    protected rewardGroup: QuestReward[] = []
    protected state: QuestStateCodes
    protected condition: QuestCondition

    constructor(option: QuestOptions) {
        super()

        this.type = QuestControllerTypeCodes.BASE

        this.id = option.id
        this.name = option.name

        if (option.type) this.type = option.type

        this.state = option.state ? option.state : QuestStateCodes.INITIALIZED

        this.condition = option.condition
            ? option.condition
            : {
                  type: QuestConditionCodes.EMPTY
              }

        if (option.rewardGroup) {
            option.rewardGroup.forEach((item: QuestRewardOptions) => {
                this.rewardGroup.push(new QuestReward(item))
            })
        }

        this.description = option.description ? option.description : ''
        this.creationTimestamp = option.creationTimestamp
            ? option.creationTimestamp
            : Date.now()

        if (this.state === QuestStateCodes.INITIALIZED) this.emit('initialized')
    }

    public completeOneConditionQuest(id: Id) {
        if (this.condition.type === QuestConditionCodes.QUEST_COUNTS)
            this.condition.questTemplates.some(item => {
                if (item.id === id) {
                    if (item.counts > item.completedCounts)
                        item.completedCounts += 1

                    return true
                }
            })
    }

    private checkCondition(): boolean {
        if (this.condition.type === QuestConditionCodes.QUEST_COUNTS)
            return this.condition.questTemplates.every(item => {
                if (item.counts === item.completedCounts) return true
                return false
            })

        if (this.condition.type === QuestConditionCodes.EMPTY) return true

        return false
    }

    public print(): QuestData {
        let rewardGroundOptions: QuestRewardData[] = this.rewardGroup.map(
            (reward: QuestReward) => {
                return reward.print()
            }
        )

        return {
            id: this.id,
            type: this.type,
            name: this.name,
            state: this.state,
            description: this.description,
            rewardGroup: rewardGroundOptions,
            condition: this.condition,
            failedTimestamp: this.failedTimestamp,
            startedTimestamp: this.startedTimestamp,
            creationTimestamp: this.creationTimestamp,
            completedTimestamp: this.completedTimestamp
        }
    }

    public getState(): QuestStateCodes {
        return this.state
    }

    public getCondition(): QuestCondition {
        return this.condition
    }

    public start(): void {
        if (this.state !== QuestStateCodes.INITIALIZED)
            throw new Error(
                `Error quest states(${this.state}),the quest(id:${this.id}) cannot starts`
            )

        this.state = QuestStateCodes.PROCESSING
        this.startedTimestamp = Date.now()
        this.emit('processing', this.startedTimestamp)
    }

    public complete(callback?: (reward: QuestReward[]) => void): boolean {
        if (this.state !== QuestStateCodes.PROCESSING)
            throw new Error(
                `Error quest states ${this.state},the quest(id:${this.id}) cannot completes`
            )
        if (!this.checkCondition()) return false

        this.state = QuestStateCodes.COMPLETED
        this.completedTimestamp = Date.now()
        this.emit('completed', this.completedTimestamp)
        this.rewardGroup.forEach((reward: QuestReward) => reward.receive())

        if (callback) callback(this.rewardGroup)
        return true
    }

    public fail(callback?: (reward: QuestReward[]) => void): boolean {
        if (this.state !== QuestStateCodes.PROCESSING)
            throw new Error(
                `Error quest states(${this.state}),the quest(id:${this.id}) cannot fails`
            )

        this.state = QuestStateCodes.FAILED
        this.failedTimestamp = Date.now()
        this.emit('failed', this.failedTimestamp)
        this.rewardGroup.forEach((reward: QuestReward) => reward.fail())

        if (callback) callback(this.rewardGroup)
        return true
    }
}
