import { Location, LocationDescriptor, LocationDescriptorObject } from 'history'
import React from 'react'

import { logger } from 'src/shared/Logger'
import { __DEV__ } from 'src/shared/Env'
import { isString } from 'src/shared/Utilities'

import {
    resolveToLocation,
    normalizeToLocation
} from 'src/react-router/locationUtils'
import {
    RouterContext,
    RouterContextProviderValue
} from 'src/react-router/RouterContext'

function isModifiedEvent(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
): boolean {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

interface LinkAnchorProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    ref: React.Ref<any>
    navigate: () => void
}

const LinkAnchor: React.ForwardRefExoticComponent<React.PropsWithoutRef<
    LinkAnchorProps
> &
    React.RefAttributes<any>> = React.forwardRef<any, LinkAnchorProps>(
    ({ navigate, onClick, ...rest }, ref) => {
        const { target } = rest

        let props: any = {
            ...rest,
            onClick: (
                event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
                try {
                    if (onClick) onClick(event)
                } catch (ex) {
                    event.preventDefault()
                    throw ex
                }

                if (
                    !event.defaultPrevented && // onClick prevented default
                    event.button === 0 && // ignore everything but left clicks
                    (!target || target === '_self') && // let browser handle 'target=_blank' etc.
                    !isModifiedEvent(event) // ignore clicks with modifier keys
                ) {
                    event.preventDefault()
                    navigate()
                }
            }
        }
        props.ref = ref
        return <a {...props} />
    }
)

if (__DEV__) {
    LinkAnchor.displayName = 'LinkAnchor'
}

export interface LinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: LocationDescriptor | ((location: Location) => LocationDescriptor)
    ref: React.Ref<any>
    replace?: boolean
    component?: React.ComponentType<any>
}

/**
 * The public API for rendering a history-aware <a>.
 */
export const Link: React.ForwardRefExoticComponent<React.PropsWithoutRef<
    LinkProps
> &
    React.RefAttributes<any>> = React.forwardRef<any, LinkProps>(
    ({ component = LinkAnchor, replace, to, ...rest }, ref) => {
        return (
            <RouterContext.Consumer>
                {(context: RouterContextProviderValue) => {
                    if (!context) {
                        logger.error(
                            new Error(
                                'You should not use <Link> outside a <Router>'
                            )
                        )
                    }
                    const { history } = context
                    const location: LocationDescriptorObject = normalizeToLocation(
                        resolveToLocation(to, context.location),
                        context.location
                    )
                    const href: string = location
                        ? history.createHref(location)
                        : ''
                    const props = {
                        ...rest,
                        href,
                        navigate() {
                            const location: LocationDescriptor = resolveToLocation(
                                to,
                                context.location
                            )

                            const method = replace
                                ? history.replace
                                : history.push

                            method(
                                isString(location)
                                    ? location
                                    : location.pathname
                            )
                        }
                    }
                    props.ref = ref
                    return React.createElement(component, props)
                }}
            </RouterContext.Consumer>
        )
    }
)

if (__DEV__) {
    Link.displayName = 'Link'
}
