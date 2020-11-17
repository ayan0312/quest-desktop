import React from 'react'

import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling'
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities'

import { AnimationWrap } from 'src/react-router'

import {
    IGettingStartedProps,
    IGettingStartedStyles,
    IGettingStartedStyleProps
} from './GettingStarted.types'

export class GettingStartedBase extends React.Component<IGettingStartedProps> {
    public render(): JSX.Element {
        const { styles, theme } = this.props

        const getClassNames = classNamesFunction<
            IGettingStartedStyleProps,
            IGettingStartedStyles
        >()
        const classNames: IProcessedStyleSet<IGettingStartedStyles> = getClassNames(
            styles,
            { theme }
        )

        return (
            <AnimationWrap path="/">
                <section className={classNames.root}>
                    <div>
                        <h2>Getting Started with Yukino</h2>
                    </div>
                    <div>
                        <h2>海内存知己,天涯若比邻</h2>
                    </div>
                </section>
            </AnimationWrap>
        )
    }
}
