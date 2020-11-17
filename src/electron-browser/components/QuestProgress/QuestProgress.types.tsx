import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities'
import { QuestProgressValueData } from 'src/node/QuestSystem/QuestProgressValue'
import { QuestControllerTypeCodes } from 'src/node/QuestSystem/QuestController'

export interface IQuestProgressProps {
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<
        IQuestProgressStyleProps,
        IQuestProgressStyles
    >
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme

    name?: string

    progress: QuestProgressValueData

    onGetReward: (type: QuestControllerTypeCodes) => void
}

export interface IQuestProgressStyles {
    root: IStyle
}

export interface IQuestProgressStyleProps {
    /**
     * Theme to apply to the QuestProgressNav
     */
    theme: ITheme
}
