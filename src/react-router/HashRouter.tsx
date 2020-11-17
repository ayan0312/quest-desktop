import { History, createHashHistory, HashHistoryBuildOptions } from 'history'
import React from 'react'

import { Router } from 'src/react-router/Router'
import { RouterMode } from 'src/react-router/RouterContext'

export interface HashRouterProps extends HashHistoryBuildOptions {
    mode?: RouterMode
    children?: React.ReactNode
}

/**
 * The public API for a <Router> that uses .location.hash.
 */
export class HashRouter extends React.Component<HashRouterProps> {
    public history: History = createHashHistory(this.props)

    public render() {
        return (
            <Router
                history={this.history}
                mode={this.props.mode}
                children={this.props.children}
            />
        )
    }
}
