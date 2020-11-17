import { styled } from 'office-ui-fabric-react/lib/Utilities'

import {
    IQuestListProps,
    IQuestListStyles,
    IQuestListStyleProps
} from './QuestList.types'
import { QuestListBase } from './QuestList.base'
import { getStyles } from './QuestList.styles'

export const QuestList: React.FunctionComponent<IQuestListProps> = styled<
    IQuestListProps,
    IQuestListStyleProps,
    IQuestListStyles
>(QuestListBase, getStyles)
