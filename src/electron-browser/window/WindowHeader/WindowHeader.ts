import { styled } from 'office-ui-fabric-react/lib/Utilities'

import {
    IWindowHeaderProps,
    IWindowHeaderStyles,
    IWindowHeaderStyleProps
} from './WindowHeader.types'
import { WindowHeaderBase } from './WindowHeader.base'
import { getStyles } from './WindowHeader.styles'

export const WindowHeader: React.FunctionComponent<IWindowHeaderProps> = styled<
    IWindowHeaderProps,
    IWindowHeaderStyleProps,
    IWindowHeaderStyles
>(WindowHeaderBase, getStyles)
