import React from 'react'
import { Location } from 'history'

import { logger } from 'src/shared/Logger'
import { __DEV__ } from 'src/shared/Env'

import { matchPath, MatchPathResult } from 'src/react-router/matchPath'
import {
    RouterMode,
    defaultMode,
    RouterContext,
    RouterContextProviderValue
} from 'src/react-router/RouterContext'

export interface SwitchProps {
    mode?: RouterMode
    children?: React.ReactNode
    location?: Location
}

/**
 * The public API for rendering the first <Route> that matches.
 */
export class Switch extends React.Component<SwitchProps> {
    public static contextType: React.Context<
        RouterContextProviderValue
    > = RouterContext
    public context: RouterContextProviderValue
    public render() {
        if (!this.context) {
            logger.error(
                new Error('You should not use <Switch> outside a <Router>')
            )
        }

        const location = this.props.location || this.context.location
        let element: React.ReactElement
        let computedMatch: MatchPathResult = null
        React.Children.forEach(
            this.props.children,
            (child: React.ReactNode) => {
                if (computedMatch == null && React.isValidElement(child)) {
                    element = child
                    const path = child.props.path || child.props.from
                    computedMatch = path
                        ? matchPath(location.pathname, {
                              path,
                              ...child.props
                          })
                        : this.context.match
                }
            }
        )
        const mode: RouterMode = this.props.mode || this.context.mode
        const providerValue: RouterContextProviderValue = {
            location,
            computedMatch,
            mode: this.props.mode || mode || defaultMode,
            match: this.context.match,
            history: this.context.history
        }

        return (
            <RouterContext.Provider value={providerValue}>
                {mode === 'style'
                    ? this.props.children
                    : computedMatch
                    ? React.cloneElement(element, {
                          location,
                          computedMatch
                      })
                    : null}
            </RouterContext.Provider>
        )
    }
}

if (__DEV__) {
    Switch.prototype.componentDidUpdate = function(
        prevProps: Readonly<SwitchProps>
    ) {
        if (this.props.location && !prevProps.location) {
            logger.warn(
                "<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no 'location' prop and then provided one on a subsequent render."
            )
        }

        if (!this.props.location && prevProps.location) {
            logger.warn(
                "<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a 'location' prop initially but omitted it on a subsequent render."
            )
        }
    }
}
