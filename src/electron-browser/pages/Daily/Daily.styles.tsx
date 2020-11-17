import { IDailyStyles, IDailyStyleProps } from './Daily.types'

export const getStyles = (props: IDailyStyleProps): IDailyStyles => {
    const { theme } = props

    return {
        root: {
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        }
    }
}
