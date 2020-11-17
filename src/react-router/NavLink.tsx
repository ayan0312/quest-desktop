import React from 'react'
import { Location, LocationDescriptorObject } from 'history'

import { logger } from 'src/shared/Logger'
import { __DEV__ } from 'src/shared/Env'

import { Link, LinkProps } from 'src/react-router/Link'
import { matchPath, MatchPathResult } from 'src/react-router/matchPath'
import {
    resolveToLocation,
    normalizeToLocation
} from 'src/react-router/locationUtils'
import {
    RouterContext,
    RouterContextProviderValue
} from 'src/react-router/RouterContext'

function joinClassnames(...classnames: any[]) {
    return classnames.filter(i => i).join(' ')
}

export interface NavLinkProps extends LinkProps {
    activeClassName?: string
    activeStyle?: React.CSSProperties
    exact?: boolean
    strict?: boolean
    isActive?(match: MatchPathResult, location: Location): boolean
    location?: Location
}

/**
 * A <Link> wrapper that knows if it's 'active' or not.
 */
export const NavLink: React.ForwardRefExoticComponent<React.PropsWithoutRef<
    NavLinkProps
> &
    React.RefAttributes<any>> = React.forwardRef<any, NavLinkProps>(
    (
        {
            'aria-current': ariaCurrent = 'page',
            activeClassName = 'active',
            activeStyle,
            className: classNameProp,
            exact,
            isActive: isActiveProp,
            location: locationProp,
            strict,
            style: styleProp,
            to,
            ...rest
        },
        ref
    ) => {
        return (
            <RouterContext.Consumer>
                {(context: RouterContextProviderValue) => {
                    if (!context) {
                        logger.error(
                            new Error(
                                'You should not use <NavLink> outside a <Router>'
                            )
                        )
                    }
                    const currentLocation: Location =
                        locationProp || context.location
                    const toLocation: LocationDescriptorObject = normalizeToLocation(
                        resolveToLocation(to, currentLocation),
                        currentLocation
                    )
                    const { pathname: path } = toLocation
                    // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
                    const escapedPath: string =
                        path &&
                        path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')

                    const match: MatchPathResult = escapedPath
                        ? matchPath(currentLocation.pathname, {
                              path: escapedPath,
                              exact,
                              strict
                          })
                        : null
                    const isActive: boolean = !!(isActiveProp
                        ? isActiveProp(match, currentLocation)
                        : match)

                    const className: string = isActive
                        ? joinClassnames(classNameProp, activeClassName)
                        : classNameProp
                    const style: React.CSSProperties = isActive
                        ? { ...styleProp, ...activeStyle }
                        : styleProp

                    const props: any = {
                        'aria-current': (isActive && ariaCurrent) || null,
                        className,
                        style,
                        to: toLocation,
                        ...rest
                    }
                    props.ref = ref
                    return <Link {...props} />
                }}
            </RouterContext.Consumer>
        )
    }
)

if (__DEV__) {
    NavLink.displayName = 'NavLink'
}
