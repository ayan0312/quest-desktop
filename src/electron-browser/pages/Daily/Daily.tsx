import { styled } from 'office-ui-fabric-react/lib/Utilities'

import { IDailyProps, IDailyStyles, IDailyStyleProps } from './Daily.types'
import { DailyBase } from './Daily.base'
import { getStyles } from './Daily.styles'

export const Daily: React.FunctionComponent<IDailyProps> = styled<
    IDailyProps,
    IDailyStyleProps,
    IDailyStyles
>(DailyBase, getStyles)
