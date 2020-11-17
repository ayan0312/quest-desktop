import {
    DateQuest,
    DateQuestOptions,
    DailyQuest,
    DailyQuestOptions,
    WeeklyQuest,
    WeeklyQuestOptions,
    MonthlyQuest,
    MonthlyQuestOptions
} from 'src/node/QuestSystem/DateQuest'
import {
    QuestController,
    QuestControllerTypeCodes
} from 'src/node/QuestSystem/QuestController'
import { QuestProgressOptions } from 'src/node/QuestSystem/QuestProgress'
import { getDayEnd, getWeekEnd, getMonthEnd } from 'src/shared/TimeTools'
import { logger } from 'src/shared/Logger'

export class DateQuestController<
    T extends DateQuest = DateQuest,
    P extends DateQuestOptions = DateQuestOptions
> extends QuestController<T, P> {
    public readonly type: QuestControllerTypeCodes

    public readonly QuestConstructor: typeof DateQuest

    protected markDate: Date
    protected theEndDate: Date
    protected timer: NodeJS.Timeout
    protected getDateEnd: (date: Date) => Date

    constructor() {
        super()
        this.type = QuestControllerTypeCodes.DATE
        this.QuestConstructor = DateQuest
        this.markDate = new Date()
        this.getDateEnd = getDayEnd
    }

    protected initalize() {
        this.theEndDate = this.getDateEnd(this.markDate)
        this.timer = setInterval(() => {
            this.emit('remainingTime', this.getRemainingTime(Date.now()))
        }, 1000)

        this.load()
    }

    private load() {
        setTimeout(() => {
            let now = Date.now()
            if (now > this.theEndDate.getTime()) {
                logger.info(`refresh DateQuest in a new day`)
                this.processingStorage.each((quest: DateQuest) => {
                    this.failQuest(quest.id)
                })
                this.refresh()
            } else {
                this.load()
            }
        }, 1000)
    }

    protected refresh() {
        this.markDate = new Date()
        this.theEndDate = this.getDateEnd(this.markDate)
        this.emit('refresh', this.markDate.getTime())

        this.load()
    }

    protected refreshProgress(): QuestProgressOptions {
        this.progress.refresh()
        return this.progress.print()
    }

    private getRemainingTime(currentTime?: number): number {
        return (
            this.theEndDate.getTime() -
            (currentTime ? currentTime : new Date().getTime())
        )
    }
}

export class DailyQuestController extends DateQuestController<
    DailyQuest,
    DailyQuestOptions
> {
    public readonly type: QuestControllerTypeCodes

    public readonly QuestConstructor: typeof DailyQuest

    constructor() {
        super()
        this.type = QuestControllerTypeCodes.DAILY
        this.QuestConstructor = DailyQuest
        this.getDateEnd = getDayEnd
        this.initalize()
    }
}

export class WeeklyQuestController extends DateQuestController<
    WeeklyQuest,
    WeeklyQuestOptions
> {
    public readonly type: QuestControllerTypeCodes

    public readonly QuestConstructor: typeof WeeklyQuest

    constructor() {
        super()
        this.type = QuestControllerTypeCodes.WEEKLY
        this.QuestConstructor = WeeklyQuest
        this.getDateEnd = getWeekEnd
        this.initalize()
    }
}

export class MonthlyQuestController extends DateQuestController<
    MonthlyQuest,
    MonthlyQuestOptions
> {
    public readonly type: QuestControllerTypeCodes

    public readonly QuestConstructor: typeof MonthlyQuest

    constructor() {
        super()
        this.type = QuestControllerTypeCodes.MONTHLY
        this.QuestConstructor = MonthlyQuest
        this.getDateEnd = getMonthEnd
        this.initalize()
    }
}
