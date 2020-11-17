import React from 'react'

import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling'
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities'

import { WindowNav } from './WindowNav/WindowNav'
import { WindowMain } from './WindowMain/WindowMain'
import { WindowHeader } from './WindowHeader/WindowHeader'

import { IWindowProps, IWindowStyles, IWindowStyleProps } from './Window.types'

export class WindowBase extends React.Component<IWindowProps> {
    public render(): JSX.Element {
        const { styles, theme } = this.props

        const getClassNames = classNamesFunction<
            IWindowStyleProps,
            IWindowStyles
        >()
        const classNames: IProcessedStyleSet<IWindowStyles> = getClassNames(
            styles,
            { theme }
        )

        return (
            <section className={classNames.root}>
                <section className={classNames.left}>
                    <WindowNav />
                </section>
                <section className={classNames.right}>
                    <WindowHeader />
                    <WindowMain>{this.props.children}</WindowMain>
                </section>
            </section>
        )
    }
}
