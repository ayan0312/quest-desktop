import React from 'react'
import { ITheme } from 'office-ui-fabric-react/lib/Styling'

const createNamedContext = (name: string) => {
    const context: React.Context<any> = React.createContext(undefined)
    context.displayName = name
    return context
}

export interface ThemeContextProviderValue {
    theme: ITheme
}

const context: React.Context<any> = /*#__PURE__*/ createNamedContext('Theme')
export default context
