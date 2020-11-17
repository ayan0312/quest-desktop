import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities'

export interface IWindowNavStyles {
    root: IStyle
    logo: IStyle
    action: IStyle
    actionItem: IStyle
    routeLinks: IStyle
    activeButton: IStyle
    button: IStyle
}

export interface IWindowNavProps {
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<IWindowNavStyleProps, IWindowNavStyles>
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme
}

export interface IWindowNavState {
    pathname: string
}

export interface IWindowNavStyleProps {
    /**
     * Theme to apply to the WindowNav
     */
    theme: ITheme
}
