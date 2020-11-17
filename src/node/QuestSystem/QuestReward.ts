import { TimeOptions } from 'src/shared/TimeTools'
import { EventEmitter } from 'events'
import { QuestControllerTypeCodes } from 'src/node/QuestSystem/QuestController'
import { QuestRewardData } from './QuestDB'

export interface QuestRewardOptions {
    name: string
    iconPath?: string
    questType: QuestControllerTypeCodes
    description?: string
    activityValue?: number
    state?: QuestRewardState
    limitedTime?: TimeOptions
}

export type QuestRewardState = 'received' | 'unreceived' | 'failed'

export class QuestReward extends EventEmitter {
    public static readonly STATE: Record<QuestRewardState, QuestRewardState> = {
        received: 'received',
        unreceived: 'unreceived',
        failed: 'failed'
    }

    public name: string
    public iconPath: string
    public questType: QuestControllerTypeCodes
    public description: string
    public activityValue?: number
    public limitedTime?: TimeOptions

    private state: QuestRewardState

    constructor(option: QuestRewardOptions) {
        super()
        this.name = option.name
        this.questType = option.questType
        this.iconPath = option.iconPath ? option.iconPath : ''
        this.description = option.description ? option.description : ''
        if (option.activityValue)
            this.activityValue = option.activityValue ? option.activityValue : 0
        else if (this.limitedTime) this.limitedTime = option.limitedTime
    }

    public print(): QuestRewardData {
        return {
            name: this.name,
            iconPath: this.iconPath,
            questType: this.questType,
            description: this.description,
            activityValue: this.activityValue,
            state: this.state,
            limitedTime: this.limitedTime
        }
    }

    public reset(): void {
        this.state = QuestReward.STATE.unreceived
    }

    public getState(): QuestRewardState {
        return this.state
    }

    public receive(): void {
        if (this.state === QuestReward.STATE.unreceived)
            this.state = QuestReward.STATE.received
    }

    public fail(): void {
        if (this.state === QuestReward.STATE.unreceived)
            this.state = QuestReward.STATE.failed
    }
}
