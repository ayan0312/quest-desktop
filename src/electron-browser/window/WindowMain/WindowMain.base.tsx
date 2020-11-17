import React from 'react'

import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling'
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities'

import {
    IWindowMainProps,
    IWindowMainStyleProps,
    IWindowMainStyles
} from './WindowMain.types'

export class WindowMainBase extends React.Component<IWindowMainProps> {
    public render() {
        const { styles, theme } = this.props
        const getClassNames = classNamesFunction<
            IWindowMainStyleProps,
            IWindowMainStyles
        >()
        const classNames: IProcessedStyleSet<IWindowMainStyles> = getClassNames(
            styles,
            { theme }
        )
        return <main className={classNames.root}>{this.props.children}</main>
    }
}
