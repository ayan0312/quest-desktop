import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities'
import { QuestData } from 'src/node/QuestSystem/Quest'

export interface IQuestListProps {
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<IQuestListStyleProps, IQuestListStyles>
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme

    questData: QuestData[]

    onQuestComplete: (questData: QuestData) => void
}

export interface IQuestListStyles {
    root: IStyle
    top: IStyle
    bottom: IStyle
    itemCell: IStyle
    itemImage: IStyle
    itemContent: IStyle
    itemName: IStyle
    itemIndex: IStyle
    chevron: IStyle
}

export interface IQuestListState {
    isSearched: boolean
    searchedItems: QuestData[]
}

export interface IQuestListStyleProps {
    /**
     * Theme to apply to the QuestListNav
     */
    theme: ITheme
}
