import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities'
import { QuestOption } from 'src/node/QuestSystem/Quest'
import { QuestRewardOption } from 'src/node/QuestSystem/QuestReward'
import { QuestControllerTypeCodes } from 'src/node/QuestSystem/QuestController'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'

export interface IAddQuestProps {
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<IAddQuestStyleProps, IAddQuestStyles>
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme
}

export interface IAddQuestStyles {
    root: IStyle
    button: IStyle
    shortButton: IStyle
    stack: IStyle
    separator: IStyle
    stackItem: IStyle
    spinner: IStyle
    messageBar: IStyle
}

export interface QuestInput {
    name: string
    type: QuestControllerTypeCodes
    description: string
}

export interface IAddQuestState {
    quest: QuestInput
    optionsCount: number
    rewardGroup: QuestRewardOption[]
    isSubmitted: boolean
    messageBarType?: MessageBarType.success
    message?: string
    isShowMessage: boolean
}

export interface IAddQuestStyleProps {
    /**
     * Theme to apply to the AddQuestNav
     */
    theme: ITheme
}
