import React from 'react'
import { History, Location } from 'history'

import { MatchPathResult } from 'src/react-router/matchPath'

const createNamedContext = (name: string) => {
    const context: React.Context<RouterContextProviderValue> = React.createContext(
        undefined
    )
    context.displayName = name
    return context
}

export type RouterMode = 'style' | 'clone'
export const defaultMode: RouterMode = 'style'

export interface RouterContextProviderValue {
    mode: RouterMode
    match: MatchPathResult
    history: History
    location: Location
    computedMatch?: MatchPathResult
}

export const RouterContext: React.Context<RouterContextProviderValue> = /*#__PURE__*/ createNamedContext(
    'Router'
)
