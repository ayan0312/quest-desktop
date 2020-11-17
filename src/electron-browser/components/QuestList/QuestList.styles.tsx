import { IQuestListStyles, IQuestListStyleProps } from './QuestList.types'
import { getFocusStyle } from 'office-ui-fabric-react'

export const getStyles = (props: IQuestListStyleProps): IQuestListStyles => {
    const { theme } = props
    const { palette, semanticColors, fonts } = theme

    return {
        root: {
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        },
        top: {
            width: '100%'
        },
        bottom: {
            width: '100%',
            overflow: 'auto'
        },
        itemCell: [
            getFocusStyle(theme, { inset: -1 }),
            {
                minHeight: 54,
                padding: 10,
                boxSizing: 'border-box',
                borderBottom: `1px solid ${semanticColors.bodyDivider}`,
                display: 'flex',
                selectors: {
                    '&:hover': { background: palette.neutralLight }
                }
            }
        ],
        itemImage: {
            flexShrink: 0
        },
        itemContent: {
            marginLeft: 10,
            overflow: 'hidden',
            flexGrow: 1
        },
        itemName: [
            fonts.xLarge,
            {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }
        ],
        itemIndex: {
            fontSize: fonts.small.fontSize,
            color: palette.neutralTertiary,
            marginBottom: 10
        },
        chevron: {
            alignSelf: 'center',
            marginLeft: 10,
            color: palette.neutralTertiary,
            fontSize: fonts.large.fontSize,
            flexShrink: 0
        }
    }
}
