import { styled } from 'office-ui-fabric-react/lib/Utilities'

import { IWindowProps, IWindowStyles, IWindowStyleProps } from './Window.types'
import { WindowBase } from './Window.base'
import { getStyles } from './Window.styles'

export const Window: React.FunctionComponent<IWindowProps> = styled<
    IWindowProps,
    IWindowStyleProps,
    IWindowStyles
>(WindowBase, getStyles)
