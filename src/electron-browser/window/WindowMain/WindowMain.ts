import { styled } from 'office-ui-fabric-react/lib/Utilities'

import {
    IWindowMainProps,
    IWindowMainStyles,
    IWindowMainStyleProps
} from './WindowMain.types'
import { WindowMainBase } from './WindowMain.base'
import { styles } from './WindowMain.styles'

export const WindowMain: React.FunctionComponent<IWindowMainProps> = styled<
    IWindowMainProps,
    IWindowMainStyleProps,
    IWindowMainStyles
>(WindowMainBase, styles)
