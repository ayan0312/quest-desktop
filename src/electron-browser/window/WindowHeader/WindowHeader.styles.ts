import {
    IWindowHeaderStyles,
    IWindowHeaderStyleProps
} from './WindowHeader.types'

export const getStyles = (
    props: IWindowHeaderStyleProps
): IWindowHeaderStyles => {
    //const { theme } = props
    return {
        root: {
            display: 'flex',
            flexGrow: 0,
            flexShrink: 0,
            height: 60,
            width: '100%',
            justifyContent: 'space-between',
            ['-webkit-app-region' as string]: 'drag',
            userSelect: 'none'
        },
        left: {
            marginLeft: 20
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            marginRight: 20
        }
    }
}
