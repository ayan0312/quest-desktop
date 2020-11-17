import { styled } from 'office-ui-fabric-react/lib/Utilities'

import {
    IQuestProgressProps,
    IQuestProgressStyles,
    IQuestProgressStyleProps
} from './QuestProgress.types'
import { QuestProgressBase } from './QuestProgress.base'
import { getStyles } from './QuestProgress.styles'

export const QuestProgress: React.FunctionComponent<IQuestProgressProps> = styled<
    IQuestProgressProps,
    IQuestProgressStyleProps,
    IQuestProgressStyles
>(QuestProgressBase, getStyles)
