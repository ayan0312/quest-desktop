import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities'

export interface IWindowHeaderProps {
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<
        IWindowHeaderStyleProps,
        IWindowHeaderStyles
    >
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme
}

export interface IWindowHeaderStyles {
    root: IStyle
    left: IStyle
    right: IStyle
}

export interface IWindowHeaderStyleProps {
    /**
     * Theme to apply to the WindowHeader
     */
    theme: ITheme
}
