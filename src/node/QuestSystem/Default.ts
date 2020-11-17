import { QuestProgressOptions } from 'src/node/QuestSystem/QuestProgress'

export interface Default {
    QuestProgressOptions: Omit<QuestProgressOptions, 'type'>
}

export const Default: Default = {
    QuestProgressOptions: {
        maxStage: 2,
        maxValue: 1000,
        currentValue: 0,
        eachStageValue: {
            0: 100,
            1: 300,
            2: 600
        },
        eachStageQuestRewardOptions: {
            0: [],
            1: [],
            2: []
        }
    }
}
