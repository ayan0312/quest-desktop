import React from 'react'

import { FontIcon } from 'office-ui-fabric-react/lib/Icon'
import { ActionButton } from 'office-ui-fabric-react/lib/Button'
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling'
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities'

import { to, routerMemoryHistory } from 'src/electron-browser/router'

import {
    IWindowNavProps,
    IWindowNavState,
    IWindowNavStyles,
    IWindowNavStyleProps
} from './WindowNav.types'

interface ButtonOptions {
    name: string
    ariaLabel: string
    pathname: string
    iconName: string
}

const QuestButtons: ButtonOptions[] = [
    {
        name: '每日',
        ariaLabel: 'Daily',
        pathname: '/daily',
        iconName: 'CalendarDay'
    },
    {
        name: '每周',
        ariaLabel: 'Weekly',
        pathname: '/weekly',
        iconName: 'CalendarWeek'
    },
    {
        name: '每月',
        ariaLabel: 'Monthly',
        pathname: '/monthly',
        iconName: 'Calendar'
    },
    {
        name: '主线',
        ariaLabel: 'Mainline',
        pathname: '/mainline',
        iconName: 'SortLines'
    },
    {
        name: '支线',
        ariaLabel: 'Sideline',
        pathname: '/sideline',
        iconName: 'TaskGroup'
    },
    {
        name: '活动',
        ariaLabel: 'Activity',
        pathname: '/activity',
        iconName: 'Family'
    },
    {
        name: '历史',
        ariaLabel: 'History',
        pathname: '/history',
        iconName: 'History'
    },
    {
        name: '创建任务',
        ariaLabel: 'AddQuest',
        pathname: '/addQuest',
        iconName: 'Add'
    }
]

const OtherButtons: ButtonOptions[] = [
    {
        name: '设置',
        ariaLabel: 'Settings',
        pathname: '/settings',
        iconName: 'Settings'
    },
    {
        name: '赞助',
        ariaLabel: 'Sponsor',
        pathname: '/sponsor',
        iconName: 'Emoji2'
    }
]

export class WindowNavBase extends React.Component<IWindowNavProps> {
    public state: IWindowNavState = {
        pathname: ''
    }

    private to(pathname: string) {
        let cb = to(pathname)
        return e => {
            cb(e)
            this.setState({
                pathname: routerMemoryHistory.location.pathname
            })
        }
    }

    public render(): JSX.Element {
        const { styles, theme } = this.props
        const getClassNames = classNamesFunction<
            IWindowNavStyleProps,
            IWindowNavStyles
        >()
        const classNames: IProcessedStyleSet<IWindowNavStyles> = getClassNames(
            styles,
            { theme }
        )

        return (
            <nav className={classNames.root}>
                <div className={classNames.logo}>
                    <FontIcon iconName="MusicInCollectionFill" />
                </div>

                <ul className={classNames.action}>
                    <li className={classNames.actionItem}>
                        <span>任务类型</span>
                        <div className={classNames.routeLinks}>
                            {QuestButtons.map((options, index) => {
                                return (
                                    <ActionButton
                                        key={index}
                                        className={
                                            this.state.pathname ===
                                            options.pathname
                                                ? classNames.activeButton
                                                : classNames.button
                                        }
                                        onClick={this.to(options.pathname)}
                                        iconProps={{
                                            iconName: options.iconName
                                        }}
                                        ariaLabel={options.ariaLabel}
                                    >
                                        {options.name}
                                    </ActionButton>
                                )
                            })}
                        </div>
                    </li>

                    <li className={classNames.actionItem}>
                        <span>其他</span>
                        <div className={classNames.routeLinks}>
                            {OtherButtons.map((options, index) => {
                                return (
                                    <ActionButton
                                        key={index}
                                        className={
                                            this.state.pathname ===
                                            options.pathname
                                                ? classNames.activeButton
                                                : classNames.button
                                        }
                                        onClick={this.to(options.pathname)}
                                        iconProps={{
                                            iconName: options.iconName
                                        }}
                                        ariaLabel={options.ariaLabel}
                                    >
                                        {options.name}
                                    </ActionButton>
                                )
                            })}
                        </div>
                    </li>
                </ul>
            </nav>
        )
    }
}
