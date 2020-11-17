import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities'

export interface IWindowProps {
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<IWindowStyleProps, IWindowStyles>
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme
}

export interface IWindowStyles {
    root: IStyle
    left: IStyle
    right: IStyle
}

export interface IWindowStyleProps {
    /**
     * Theme to apply to the WindowNav
     */
    theme: ITheme
}
