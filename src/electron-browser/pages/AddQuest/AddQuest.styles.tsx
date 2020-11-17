import { IAddQuestStyles, IAddQuestStyleProps } from './AddQuest.types'

export const getStyles = (props: IAddQuestStyleProps): IAddQuestStyles => {
    const { theme } = props

    return {
        root: {
            width: '100%',
            height: '100%',
            overflowX: 'hidden',
            overflowY: 'auto',
            paddingBottom: '40px'
        },
        stack: {
            width: '100%'
        },
        button: {
            width: '100%',
            overflow: 'auto'
        },
        shortButton: {
            width: '150px'
        },
        separator: {
            width: '100%',
            padding: '30px 0'
        },
        stackItem: {
            width: '37.5%',
            margin: '0 5%'
        },
        spinner: {},
        messageBar: {
            position: 'absolute',
            transition: 'opacity 0.3s'
        }
    }
}
