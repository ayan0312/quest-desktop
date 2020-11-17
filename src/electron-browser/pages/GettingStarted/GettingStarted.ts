import { styled } from 'office-ui-fabric-react/lib/Utilities'

import {
    IGettingStartedProps,
    IGettingStartedStyles,
    IGettingStartedStyleProps
} from './GettingStarted.types'
import { GettingStartedBase } from './GettingStarted.base'
import { getStyles } from './GettingStarted.styles'

export const GettingStarted: React.FunctionComponent<IGettingStartedProps> = styled<
    IGettingStartedProps,
    IGettingStartedStyleProps,
    IGettingStartedStyles
>(GettingStartedBase, getStyles)
