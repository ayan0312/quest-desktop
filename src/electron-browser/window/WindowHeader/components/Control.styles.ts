import { IControlStyles, IControlStyleProps } from './Control.types'

export const getStyles = (props: IControlStyleProps): IControlStyles => {
    return {
        root: {},
        button: {
            height: 30,
            width: 30,
            textAlign: 'center',
            lineHeight: 32,
            color: props.theme.palette.neutralPrimary,
            transition: '0.3 all ease-out',
            cursor: 'pointer',
            borderRadius: 'none',
            ['-webkit-app-region' as string]: 'no-drag',
            selectors: {
                ':hover': {
                    background: 'transparent'
                },
                ':active': {
                    background: 'transparent'
                },
                i: {
                    fontSize: 12
                }
            }
        }
    }
}
//-webkit-app-region: no-drag;
