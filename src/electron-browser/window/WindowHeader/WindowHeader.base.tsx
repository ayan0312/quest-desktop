import React from 'react'

import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling'
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities'

import { Control } from './components/Control'

import {
    IWindowHeaderProps,
    IWindowHeaderStyles,
    IWindowHeaderStyleProps
} from './WindowHeader.types'

import DefaultSettings from 'src/shared/DefaultSettings'

export class WindowHeaderBase extends React.Component<IWindowHeaderProps> {
    public render(): JSX.Element {
        const { styles, theme } = this.props

        const getClassNames = classNamesFunction<
            IWindowHeaderStyleProps,
            IWindowHeaderStyles
        >()
        const classNames: IProcessedStyleSet<IWindowHeaderStyles> = getClassNames(
            styles,
            { theme }
        )

        return (
            <header className={classNames.root}>
                <div className={classNames.left}>
                    <p>{DefaultSettings.APP_NAME}</p>
                </div>
                <div className={classNames.right}>
                    <Control />
                </div>
            </header>
        )
    }
}
