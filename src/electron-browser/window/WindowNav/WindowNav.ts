import { styled } from 'office-ui-fabric-react/lib/Utilities'

import {
    IWindowNavProps,
    IWindowNavStyles,
    IWindowNavStyleProps
} from './WindowNav.types'
import { WindowNavBase } from './WindowNav.base'
import { getStyles } from './WindowNav.styles'

export const WindowNav: React.FunctionComponent<IWindowNavProps> = styled<
    IWindowNavProps,
    IWindowNavStyleProps,
    IWindowNavStyles
>(WindowNavBase, getStyles)
