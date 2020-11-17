import { styled } from 'office-ui-fabric-react/lib/Utilities'

import {
    IControlProps,
    IControlStyles,
    IControlStyleProps
} from './Control.types'
import { ControlBase } from './Control.base'
import { getStyles } from './Control.styles'

export const Control: React.FunctionComponent<IControlProps> = styled<
    IControlProps,
    IControlStyleProps,
    IControlStyles
>(ControlBase, getStyles)
