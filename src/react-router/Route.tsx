import React from 'react'
import { Location } from 'history'

import { logger } from 'src/shared/Logger'
import { __DEV__ } from 'src/shared/Env'
import { isFunction } from 'src/shared/Utilities'

import { matchPath, MatchPathResult } from 'src/react-router/matchPath'
import {
    RouterContext,
    RouterContextProviderValue
} from 'src/react-router/RouterContext'

function isEmptyChildren(children: React.ReactNode): boolean {
    return React.Children.count(children) === 0
}

function evalChildrenDev(
    path: string | string[],
    props: RouterContextProviderValue,
    children: (props: RouterContextProviderValue) => React.ReactNode
): React.ReactNode | null {
    const value: React.ReactNode = children(props)
    if (value === undefined) {
        logger.warn(
            'You returned `undefined` from the `children` function of ' +
                `<Route${path ? ` path='${path}'` : ''}>, but you ` +
                'should have returned a React element or `null`'
        )
    }

    return value || null
}

export interface RouteProps {
    location?: Location
    component?:
        | React.ComponentType<RouterContextProviderValue>
        | React.ComponentType<any>
    render?: (props: RouterContextProviderValue) => React.ReactNode
    children?:
        | ((props: RouterContextProviderValue) => React.ReactNode)
        | React.ReactNode
    path?: string | string[]
    exact?: boolean
    sensitive?: boolean
    strict?: boolean
    computedMatch?: MatchPathResult
}

/**
 * The public API for matching a single path and rendering.
 */
export class Route extends React.Component<RouteProps> {
    public static contextType: React.Context<
        RouterContextProviderValue
    > = RouterContext
    public context: RouterContextProviderValue

    protected _renderStyleComponent(
        providerValue: RouterContextProviderValue
    ): any {
        return (
            this.props.children ||
            React.createElement(this.props.component, providerValue) ||
            this.props.render(providerValue)
        )
    }

    protected _renderCloneComponent(
        providerValue: RouterContextProviderValue
    ): any {
        // Preact uses an empty array as children by
        // default, so use null if that's the case.
        // if (Array.isArray(children) && children.length === 0) children = null

        if (providerValue.match) {
            if (this.props.children) {
                if (isFunction(this.props.children)) {
                    if (__DEV__) {
                        return evalChildrenDev(
                            this.props.path,
                            providerValue,
                            this.props.children
                        )
                    }
                    return this.props.children(providerValue)
                }
                return this.props.children
            }
            if (this.props.component) {
                return React.createElement(this.props.component, providerValue)
            }
            if (this.props.render) {
                return this.props.render(providerValue)
            }
            return null
        }

        if (isFunction(this.props.children)) {
            if (__DEV__) {
                return evalChildrenDev(
                    this.props.path,
                    providerValue,
                    this.props.children
                )
            }
            return this.props.children(providerValue)
        }
        return null
    }

    protected _getProviderValue(): RouterContextProviderValue {
        const location: Location = this.props.location || this.context.location
        const computedMatch: MatchPathResult =
            this.props.computedMatch || this.context.computedMatch

        const match: MatchPathResult = computedMatch
            ? computedMatch
            : this.props.path
            ? matchPath(location.pathname, {
                  path: this.props.path,
                  strict: this.props.strict,
                  sensitive: this.props.sensitive,
                  exact: this.props.exact
              })
            : this.context.match
        return {
            match,
            location,
            mode: this.context.mode,
            history: this.context.history
        }
    }

    public render() {
        if (!this.context) {
            logger.error(
                new Error('You should not use <Route> outside a <Router>')
            )
        }
        const providerValue: RouterContextProviderValue = this._getProviderValue()

        return (
            <RouterContext.Provider value={providerValue}>
                {providerValue.mode === 'style'
                    ? this._renderStyleComponent(providerValue)
                    : this._renderCloneComponent(providerValue)}
            </RouterContext.Provider>
        )
    }
}

if (__DEV__) {
    Route.prototype.componentDidMount = function() {
        if (
            this.props.children &&
            !isEmptyChildren(this.props.children) &&
            this.props.component
        ) {
            logger.warn(
                'You should not use <Route component> and <Route children> in the same route; <Route component> will be ignored'
            )
        }

        if (
            this.props.children &&
            !isEmptyChildren(this.props.children) &&
            this.props.render
        ) {
            logger.warn(
                'You should not use <Route render> and <Route children> in the same route; <Route render> will be ignored'
            )
        }

        if (this.props.component && this.props.render) {
            logger.warn(
                'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored'
            )
        }
    }

    Route.prototype.componentDidUpdate = function(
        prevProps: Readonly<RouteProps>
    ) {
        if (this.props.location && !prevProps.location) {
            logger.warn(
                "<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no 'location' prop and then provided one on a subsequent render."
            )
        }

        if (!this.props.location && prevProps.location) {
            logger.warn(
                "<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a 'location' prop initially but omitted it on a subsequent render."
            )
        }
    }
}
