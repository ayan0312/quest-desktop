import { IStyle, ITheme } from 'office-ui-fabric-react/lib/Styling'
import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities'

export interface IGettingStartedProps {
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<
        IGettingStartedStyleProps,
        IGettingStartedStyles
    >
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme
}

export interface IGettingStartedStyles {
    root: IStyle
}

export interface IGettingStartedStyleProps {
    /**
     * Theme to apply to the GettingStarted
     */
    theme: ITheme
}
