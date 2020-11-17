import {
    IGettingStartedStyles,
    IGettingStartedStyleProps
} from './GettingStarted.types'

export const getStyles = (
    props: IGettingStartedStyleProps
): IGettingStartedStyles => {
    return {
        root: {
            width: '100%',
            height: '100%',
            userSelect: 'none'
        }
    }
}
