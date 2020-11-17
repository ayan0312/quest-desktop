import { Quest, QuestOptions } from 'src/node/QuestSystem/Quest'
import { QuestControllerTypeCodes } from 'src/node/QuestSystem/QuestController'

export interface DateQuestOptions extends QuestOptions {}

export class DateQuest extends Quest {
    public readonly type: QuestControllerTypeCodes

    constructor(option: DateQuestOptions) {
        super(option)
        this.type = QuestControllerTypeCodes.DATE
    }
}

export interface DailyQuestOptions extends QuestOptions {}

export class DailyQuest extends DateQuest {
    public readonly type: QuestControllerTypeCodes

    constructor(option: DailyQuestOptions) {
        super(option)
        this.type = QuestControllerTypeCodes.DAILY
    }
}

export interface WeeklyQuestOptions extends QuestOptions {}

export class WeeklyQuest extends DateQuest {
    public readonly type: QuestControllerTypeCodes

    constructor(option: WeeklyQuestOptions) {
        super(option)
        this.type = QuestControllerTypeCodes.WEEKLY
    }
}

export interface MonthlyQuestOptions extends QuestOptions {}

export class MonthlyQuest extends DateQuest {
    public readonly type: QuestControllerTypeCodes

    constructor(option: MonthlyQuestOptions) {
        super(option)
        this.type = QuestControllerTypeCodes.MONTHLY
    }
}
