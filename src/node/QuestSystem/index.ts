import db, { QuestDB, QuestProgressData, QuestData } from './QuestDB'
import { QuestProgress } from 'src/node/QuestSystem/QuestProgress'
import { Quest } from 'src/node/QuestSystem/Quest'
import {
    DailyQuestController,
    WeeklyQuestController,
    MonthlyQuestController
} from 'src/node/QuestSystem/DateQuestController'
import {
    DateQuest,
    DailyQuestOptions,
    DailyQuest,
    WeeklyQuestOptions,
    WeeklyQuest,
    MonthlyQuest,
    MonthlyQuestOptions,
    DateQuestOptions
} from 'src/node/QuestSystem/DateQuest'
import { QuestControllerTypeCodes } from 'src/node/QuestSystem/QuestController'
import { Default } from 'src/node/QuestSystem/Default'
import { extend } from 'src/shared/Utilities'
import { createId } from '../Database'

export type ControllerCollection = {
    [QuestControllerTypeCodes.DAILY]: DailyQuestController
    [QuestControllerTypeCodes.WEEKLY]: WeeklyQuestController
    [QuestControllerTypeCodes.MONTHLY]: MonthlyQuestController
}

export class QuestSystem {
    private static readonly controllerConstructor = {
        [QuestControllerTypeCodes.DAILY]: DailyQuestController,
        [QuestControllerTypeCodes.WEEKLY]: WeeklyQuestController,
        [QuestControllerTypeCodes.MONTHLY]: MonthlyQuestController
    }

    private static readonly controllerTypeCodes: QuestControllerTypeCodes[] = [
        QuestControllerTypeCodes.DAILY,
        QuestControllerTypeCodes.WEEKLY,
        QuestControllerTypeCodes.MONTHLY
    ]

    public readonly controller: ControllerCollection | {} = {}

    private db: QuestDB

    constructor() {
        this.db = db
        QuestSystem.controllerTypeCodes.forEach(code => {
            let progress: QuestProgress

            if (this.db.hasProgress(code)) {
                let progressData: QuestProgressData = this.db.getProgress(code)
                progress = new QuestProgress(progressData)
                this.controller[code] = new QuestSystem.controllerConstructor[
                    code
                ]({
                    progressValue: progress
                })
            } else {
                progress = new QuestProgress(
                    extend(Default.QuestProgressOptions, {
                        type: code
                    })
                )

                if (
                    code === QuestControllerTypeCodes.DAILY ||
                    code === QuestControllerTypeCodes.WEEKLY ||
                    code === QuestControllerTypeCodes.MONTHLY
                ) {
                    let option: DateQuestControllerOptions = {
                        progress,
                        markTimestamp: Date.now()
                    }

                    this.controller[
                        code
                    ] = new QuestSystem.controllerConstructor[code](option)

                    this.db.addProgress(
                        this.controller[code].printProgressData()
                    )
                } else {
                    let option: QuestControllerOptions = { progress }

                    this.controller[
                        code
                    ] = new QuestSystem.controllerConstructor[code](option)

                    this.db.addProgress(
                        this.controller[code].printProgressData()
                    )
                }
            }

            this.controller[code].init(
                this.db.getProcessingQuests(),
                this.controller[code].QuestConstructor
            )
        })

        this.bindEvent()
    }

    private bindEvent() {
        QuestSystem.controllerTypeCodes.forEach(code => {
            let controller = this.controller[code]

            controller.on('questProcessing', (quest: Quest) =>
                this.db.addProcessingQuest(quest.print())
            )

            controller.on('questFailed', (quest: Quest) =>
                this.db.addFailedQuest(quest.print())
            )

            controller.on('questCompleted', (quest: Quest) =>
                this.db.addCompletedQuest(quest.print())
            )

            // progress
            controller.on(
                'progressRefresh',
                (progressData: QuestProgressData) =>
                    this.db.updateProgress(progressData)
            )

            controller.on(
                'progressAddValue',
                (progressData: QuestProgressData) =>
                    this.db.updateProgress(progressData)
            )

            if (
                code === QuestControllerTypeCodes.DAILY ||
                code === QuestControllerTypeCodes.WEEKLY ||
                code === QuestControllerTypeCodes.MONTHLY
            ) {
                controller.on('refresh', markTimestamp => {
                    let templates: DateQuestOptions[] = this.db.getDateQuestTemplates()
                    templates.forEach(template => {
                        if (template.type === QuestControllerTypeCodes.DAILY) {
                            controller.addQuest(
                                new controller.QuestConstructor(template)
                            )
                        }
                    })

                    this.db.updateProgress(
                        extend(this.controller[code].printProgressData(), {
                            markTimestamp
                        })
                    )
                })
            }
        })
    }

    public addDailyQuest(questOptions: Omit<DailyQuestOptions, 'id'>): void {
        this.addDateQuest<DailyQuest, Omit<DailyQuestOptions, 'id'>>(id => {
            return new DailyQuest(
                extend(questOptions, {
                    id
                })
            )
        }, questOptions)
    }

    public addWeeklyQuest(questOptions: Omit<WeeklyQuestOptions, 'id'>): void {
        this.addDateQuest<WeeklyQuest, Omit<WeeklyQuestOptions, 'id'>>(id => {
            return new WeeklyQuest(
                extend(questOptions, {
                    id
                })
            )
        }, questOptions)
    }

    public addMonthlyQuest(
        questOptions: Omit<MonthlyQuestOptions, 'id'>
    ): void {
        this.addDateQuest<MonthlyQuest, Omit<MonthlyQuestOptions, 'id'>>(id => {
            return new MonthlyQuest(
                extend(questOptions, {
                    id
                })
            )
        }, questOptions)
    }

    private addDateQuest<
        T extends DateQuest,
        P extends Omit<DateQuestOptions, 'id'>
    >(questInstance: (id: string) => T, questOptions: P): T {
        let quest = questInstance(createId())
        this.db.addDateQuestTemplates(questOptions)
        this.controller[quest.type].addQuest(quest)
        return quest
    }

    /**
     * only complete processing quests
     */
    public completeQuest(key: keyof ControllerCollection, id: string): void {
        this.controller[key].completeQuest(id)
    }

    /**
     * only fail processing quests
     */
    public failQuest(key: keyof ControllerCollection, id: string): void {
        this.controller[key].failQuest(id)
    }

    /**
     * only delete processing quests
     */
    public deleteQuest(key: keyof ControllerCollection, id: string): void {
        this.controller[key].deleteQuest(id)
    }

    public printQuests(type: QuestControllerTypeCodes): QuestData[] {
        return this.controller[type].printQuests()
    }

    public printProgress(type: QuestControllerTypeCodes): QuestProgressData {
        return this.controller[type].printProgressValue()
    }

    public addValue(key: keyof ControllerCollection, value: number): void {
        this.controller[key].addValueToProgressValue(value)
        let prints = this.controller[key].printProgressValue()

        this.db.updateProgress(prints)
    }
}

export default new QuestSystem()
