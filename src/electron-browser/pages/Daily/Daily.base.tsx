import React from 'react'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { IProcessedStyleSet, classNamesFunction } from 'office-ui-fabric-react'
import {
    IDailyProps,
    IDailyStyles,
    IDailyStyleProps,
    IDailyState
} from './Daily.types'
import questSystem from 'src/node/QuestSystem'
import { QuestControllerTypeCodes } from 'src/node/QuestSystem/QuestController'
import { AnimationWrap } from 'src/react-router'
import { QuestList } from 'src/electron-browser/components/QuestList/QuestList'
import { QuestProgress } from 'src/electron-browser/components/QuestProgress/QuestProgress'
import { QuestData } from 'src/node/QuestSystem/Quest'
import { formatDate, millisecondToTimeOption } from 'src/shared/TimeTools'

export class DailyBase extends React.Component<IDailyProps> {
    public state: IDailyState = {
        questData: questSystem.printQuests(QuestControllerTypeCodes.DAILY),
        progress: questSystem.printProgress(QuestControllerTypeCodes.DAILY),
        remainingTime: 0
    }

    public componentDidMount() {
        let controller = questSystem.controller[QuestControllerTypeCodes.DAILY]
        controller.on('questChange', () => {
            this.setState({
                questData: questSystem.printQuests(
                    QuestControllerTypeCodes.DAILY
                )
            })
        })

        controller.on('progressRefresh', () => {
            this.setState({
                progress: questSystem.printProgress(
                    QuestControllerTypeCodes.DAILY
                )
            })
        })

        controller.on('progressAddValue', () => {
            this.setState({
                progress: questSystem.printProgress(
                    QuestControllerTypeCodes.DAILY
                )
            })
        })

        controller.on('remainingTime', remainingTime => {
            this.setState({
                remainingTime
            })
        })
    }

    private _onQuestComplete = (questData: QuestData) => {
        questSystem.completeQuest(QuestControllerTypeCodes.DAILY, questData.id)
    }

    private _onGetReward = (type: QuestControllerTypeCodes) => {}

    public render() {
        const { styles, theme } = this.props

        const getClassNames = classNamesFunction<
            IDailyStyleProps,
            IDailyStyles
        >()

        const classNames: IProcessedStyleSet<IDailyStyles> = getClassNames(
            styles,
            { theme }
        )

        const timeOption = millisecondToTimeOption(this.state.remainingTime)

        return (
            <AnimationWrap path="/daily">
                <p>
                    {timeOption.day + '天'} {timeOption.hour + ':'}
                    {timeOption.minute + ':'}
                    {timeOption.second}
                </p>
                <Stack>
                    <QuestProgress
                        name="日活跃"
                        progress={this.state.progress}
                        onGetReward={this._onGetReward}
                    />
                    <QuestList
                        questData={this.state.questData}
                        onQuestComplete={this._onQuestComplete}
                    />
                </Stack>
            </AnimationWrap>
        )
    }
}
