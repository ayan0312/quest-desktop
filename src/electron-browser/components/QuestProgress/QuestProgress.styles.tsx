import {
    IQuestProgressStyles,
    IQuestProgressStyleProps
} from './QuestProgress.types'
import { getFocusStyle } from 'office-ui-fabric-react'

export const getStyles = (
    props: IQuestProgressStyleProps
): IQuestProgressStyles => {
    const { theme } = props
    const { palette, semanticColors, fonts } = theme

    return {
        root: {
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        }
    }
}
