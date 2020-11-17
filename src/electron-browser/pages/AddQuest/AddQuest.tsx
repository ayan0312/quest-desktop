import { styled } from 'office-ui-fabric-react/lib/Utilities'

import {
    IAddQuestProps,
    IAddQuestStyles,
    IAddQuestStyleProps
} from './AddQuest.types'
import { AddQuestBase } from './AddQuest.base'
import { getStyles } from './AddQuest.styles'

export const AddQuest: React.FunctionComponent<IAddQuestProps> = styled<
    IAddQuestProps,
    IAddQuestStyleProps,
    IAddQuestStyles
>(AddQuestBase, getStyles)
