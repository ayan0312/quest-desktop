import React from 'react'
import {
    ITheme,
    removeOnThemeChangeCallback,
    registerOnThemeChangeCallback
} from 'office-ui-fabric-react/lib/Styling'

import { __DEV__ } from 'src/shared/env'

import { loadTheme } from './loadTheme'
import ThemeContext, { ThemeContextProviderValue } from './ThemeContext'
import { defaultTheme } from './officeTheme'

export interface ThemeProps {
    theme?: ITheme
    children?: React.ReactNode
}
export interface ThemeState {
    theme: ITheme
}

export class Theme extends React.Component<ThemeProps, ThemeState> {
    public state = {
        theme: this.props.theme || loadTheme(defaultTheme)
    }

    public unlisten = (theme: ITheme) => {
        this.setState({ theme })
    }

    public componentDidMount(): void {
        registerOnThemeChangeCallback(this.unlisten)
    }

    public componentWillUnmount(): void {
        removeOnThemeChangeCallback(this.unlisten)
    }

    public render(): JSX.Element {
        const providerValue: ThemeContextProviderValue = {
            theme: this.state.theme
        }
        return (
            <ThemeContext.Provider value={providerValue}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}
