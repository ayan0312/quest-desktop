import {
    MemoryHistory,
    createMemoryHistory,
    MemoryHistoryBuildOptions
} from 'history'
import React from 'react'

import { Router } from 'src/react-router/Router'
import { RouterMode } from 'src/react-router/RouterContext'

export interface MemoryRouterProps extends MemoryHistoryBuildOptions {
    mode?: RouterMode
    children?: React.ReactNode
}

/**
 * The public API for a <Router> that stores location in memory.
 */
export class MemoryRouter extends React.Component<MemoryRouterProps> {
    public history: MemoryHistory = createMemoryHistory(this.props)

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
