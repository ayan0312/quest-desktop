import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities'

export interface IControlStyles {
    root: IStyle
    button: IStyle
}

export interface IControlProps {
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<IControlStyleProps, IControlStyles>
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme
}

export interface IControlState {
    isPinned: boolean
    isFullScreen: boolean
    isHideDialog: boolean
}

export interface IControlStyleProps {
    /**
     * Theme to apply to the Control
     */
    theme: ITheme
}
