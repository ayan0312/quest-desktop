import React from 'react'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import {
    PrimaryButton,
    IProcessedStyleSet,
    classNamesFunction,
    ProgressIndicator
} from 'office-ui-fabric-react'
import {
    IQuestProgressProps,
    IQuestProgressStyles,
    IQuestProgressStyleProps
} from './QuestProgress.types'

export class QuestProgressBase extends React.Component<IQuestProgressProps> {
    private _onGetRaward = () => {
        this.props.onGetReward(this.props.progress.type)
    }

    public render(): JSX.Element {
        const { styles, theme } = this.props

        const getClassNames = classNamesFunction<
            IQuestProgressStyleProps,
            IQuestProgressStyles
        >()
        const classNames: IProcessedStyleSet<IQuestProgressStyles> = getClassNames(
            styles,
            { theme }
        )

        let currentStageMaxValue = this.props.progress.eachStageValue[
            this.props.progress.currentStage
        ]
        let percentComplete =
            this.props.progress.currentStageValue / currentStageMaxValue
        let disabled = percentComplete === 1 ? false : true

        return (
            <Stack
                wrap={false}
                className={classNames.root}
                disableShrink={false}
            >
                <div>
                    <ProgressIndicator
                        label={this.props.name ? this.props.name : '活跃值'}
                        description={`${this.props.progress.currentValue}/${this.props.progress.maxValue}`}
                        percentComplete={percentComplete}
                    />
                </div>
                <PrimaryButton disabled={disabled} onClick={this._onGetRaward}>
                    领取奖励
                </PrimaryButton>
            </Stack>
        )
    }
}
