import { History, Location, UnregisterCallback } from 'history'
import React from 'react'

import { logger } from 'src/shared/Logger'
import { __DEV__ } from 'src/shared/Env'

import {
    RouterMode,
    defaultMode,
    RouterContext,
    RouterContextProviderValue
} from 'src/react-router/RouterContext'
import { MatchPathResultObject } from 'src/react-router/matchPath'

export interface RouterProps {
    mode?: RouterMode
    history: History
    children?: React.ReactNode
}

export interface RouterState {
    location: Location
}

export class Router extends React.Component<RouterProps, RouterState> {
    public static computeRootMatch(pathname: string): MatchPathResultObject {
        return {
            url: '/',
            path: '/',
            params: {},
            isExact: pathname === '/',
            sourcePath: pathname
        }
    }

    private _isMounted: boolean = false
    private _pendingLocation: Location = null

    public state: RouterState = {
        location: this.props.history.location
    }

    public unlisten: UnregisterCallback = this.props.history.listen(
        (location: Location) => {
            if (this._isMounted) {
                this.setState({ location })
            } else {
                this._pendingLocation = location
            }
        }
    )

    public componentDidMount(): void {
        this._isMounted = true
        if (this._pendingLocation) {
            this.setState({ location: this._pendingLocation })
        }
    }

    public componentWillUnmount(): void {
        this.unlisten()
    }

    public render(): JSX.Element {
        const providerValue: RouterContextProviderValue = {
            mode: this.props.mode || defaultMode,
            match: Router.computeRootMatch(this.state.location.pathname),
            history: this.props.history,
            location: this.state.location
        }
        return (
            <RouterContext.Provider value={providerValue}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

if (__DEV__) {
    Router.prototype.componentDidUpdate = function(
        prevProps: Readonly<RouterProps>
    ) {
        if (prevProps.history !== this.props.history) {
            logger.warn('You cannot change <Router history>')
        }
    }
}
