import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities'

export interface IWindowMainStyles {
    root: IStyle
}

export interface IWindowMainProps {
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<IWindowMainStyleProps, IWindowMainStyles>
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme
}

export interface IWindowMainStyleProps {
    /**
     * Theme to apply to the WindowMain
     */
    theme: ITheme
}
