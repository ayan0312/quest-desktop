import {
    QuestReward,
    QuestRewardOptions
} from 'src/node/QuestSystem/QuestReward'
import { EventEmitter } from 'events'
import { QuestControllerTypeCodes } from 'src/node/QuestSystem/QuestController'
import { QuestProgressData } from './QuestDB'

export type EachStageValue = Record<number, number>
export type EachStageQuestReward = Record<number, QuestReward[]>
export type EachStageQuestRewardOptions = Record<number, QuestRewardOptions[]>

export interface QuestProgressOptions {
    maxStage: number
    maxValue: number
    currentValue?: number
    eachStageValue: EachStageValue
    type: QuestControllerTypeCodes
    eachStageQuestRewardOptions: EachStageQuestRewardOptions
}

export class QuestProgress extends EventEmitter {
    public readonly maxStage: number
    public readonly maxValue: number
    public readonly type: QuestControllerTypeCodes =
        QuestControllerTypeCodes.BASE

    private currentValue: number
    private currentStage: number
    private currentStageValue: number
    private eachStageValue: EachStageValue
    private eachStageQuestReward: EachStageQuestReward

    constructor(option: QuestProgressOptions) {
        super()
        this.type = option.type
        this.maxStage = option.maxStage
        this.maxValue = option.maxValue
        this.currentValue = option.currentValue ? option.currentValue : 0
        this.eachStageValue = option.eachStageValue
        this.eachStageQuestReward = {}
        Object.keys(option.eachStageQuestRewardOptions).forEach(key => {
            this.eachStageQuestReward[key] = option.eachStageQuestRewardOptions[
                key
            ].map((rewardOptions: QuestRewardOptions) => {
                return new QuestReward(rewardOptions)
            })
        })

        this.updateCurrentStage()
    }

    public print(): QuestProgressData {
        let eachStageQuestRewardOptions: EachStageQuestRewardOptions = {}
        this.every((stageValue, stageRewards, stage) => {
            eachStageQuestRewardOptions[stage] = stageRewards.map(reward => {
                return reward.print()
            })
            return true
        })

        return {
            eachStageQuestRewardOptions,
            type: this.type,
            maxStage: this.maxStage,
            maxValue: this.maxValue,
            currentValue: this.currentValue,
            eachStageValue: this.eachStageValue,
            currentStage: this.currentStage,
            currentStageValue: this.currentStageValue
        }
    }

    public refresh(): void {
        this.currentValue = 0
        this.updateCurrentStage()
        this.every((stageValue, stageRewards, stage) => {
            stageRewards.forEach(reward => {
                reward.reset()
            })
            return true
        })

        this.emit('progressRefresh', this.print())
    }

    private every(
        callback: (
            stageValue: number,
            stageRewards: QuestReward[],
            stage: number
        ) => boolean
    ): void {
        for (let stage = 0; stage <= this.maxStage; stage = stage + 1) {
            if (
                !callback(
                    this.eachStageValue[stage],
                    this.eachStageQuestReward[stage],
                    stage
                )
            )
                break
        }
    }

    private updateCurrentStage(): void {
        let total = 0
        this.every((stageValue, stageRewards, stage) => {
            total = stageValue + total
            if (this.currentValue >= total) {
                this.currentStage = stage
                this.currentStageValue = this.currentValue - total
                return false
            }
            return true
        })
    }

    public addValue(value: number): void {
        if (value > 0) this.currentValue = this.currentValue + value
        this.updateCurrentStage()

        this.emit('progressAddValue', this.print())
    }

    public getCurrentValue(): number {
        return this.currentValue
    }

    public getCurrentStage(): number {
        return this.currentStage
    }

    public getCurrentStageReward(): QuestReward[] {
        return this.eachStageQuestReward[this.currentStage]
    }

    public getCurrentStageValue(): number {
        return this.currentStageValue
    }
}
