import React from 'react'
import { Motion, spring } from 'react-motion'

import { logger } from 'src/shared/Logger'

import {
    RouterContext,
    RouterContextProviderValue
} from 'src/react-router/RouterContext'

export interface AnimationWrapProps {
    path: string
}

/**
 * The public API for matching a single path and rendering.
 */
export class AnimationWrap extends React.Component<AnimationWrapProps> {
    public state = {
        once: false
    }

    public static contextType: React.Context<
        RouterContextProviderValue
    > = RouterContext
    public context: RouterContextProviderValue

    private _easeOutQuad(t: number): number {
        return t * (2 - t)
    }

    private _reverse(max: number, current: number): number {
        return max - current
    }

    public componentDidMount(): void {
        if (this.context.mode === 'clone') {
            if (!this.state.once) {
                this.setState({
                    once: true
                })
            }
        }
    }

    public render(): JSX.Element {
        if (!this.context) {
            logger.error(
                new Error('You should not use <Route> outside a <Router>')
            )
        }

        let isShow: boolean = false
        let min: number = 0
        let max: number = 30
        let x: number = max

        if (this.context.location.pathname === this.props.path) {
            isShow = true
            if (this.context.mode === 'style') x = min
            if (this.context.mode === 'clone') {
                if (!this.state.once) x = max
                if (this.state.once) x = min
            }
        } else {
            x = max
        }

        return (
            <Motion style={{ x: spring(x) }}>
                {value => {
                    return (
                        <div
                            style={{
                                display: isShow ? 'block' : 'none',
                                transform: isShow
                                    ? `translateX(${value.x}px)`
                                    : 'none',
                                opacity: isShow
                                    ? this._reverse(
                                          1,
                                          this._easeOutQuad(value.x / max)
                                      )
                                    : 0,
                                height: '100%',
                                width: '100%'
                            }}
                        >
                            {this.props.children}
                        </div>
                    )
                }}
            </Motion>
        )
    }
}
