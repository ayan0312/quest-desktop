import { IWindowStyles, IWindowStyleProps } from './Window.types'

export const getStyles = (props: IWindowStyleProps): IWindowStyles => {
    const { theme } = props
    return {
        root: {
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            minWidth: 1000,
            background: theme.palette.white
        },
        left: {
            flexGrow: 0,
            flexShrink: 0,
            width: 200,
            height: '100%',
            background: theme.palette.neutralLighterAlt
        },
        right: {
            display: 'flex',
            flexGrow: 1,
            flexShrink: 1,
            height: '100%',
            flexDirection: 'column',
            background: theme.palette.white
        }
    }
}
