import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities'
import { QuestProgressValueData } from 'src/node/QuestSystem/QuestProgressValue'
import { QuestData } from 'src/node/QuestSystem/Quest'
import { QuestControllerTypeCodes } from 'src/node/QuestSystem/QuestController'

export interface IDailyProps {
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<IDailyStyleProps, IDailyStyles>
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme
}

export interface IDailyStyles {
    root: IStyle
}

export interface IDailyState {
    questData: QuestData[]
    progress: QuestProgressValueData
    remainingTime: number
}

export interface IDailyStyleProps {
    /**
     * Theme to apply to the DailyNav
     */
    theme: ITheme
}
