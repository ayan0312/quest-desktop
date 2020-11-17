import React from 'react'
import { ipcRenderer } from 'electron'
import {
    Dialog,
    DialogType,
    DialogFooter
} from 'office-ui-fabric-react/lib/Dialog'
import {
    IconButton,
    DefaultButton,
    PrimaryButton
} from 'office-ui-fabric-react/lib/Button'
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling'
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities'

import {
    IControlStyles,
    IControlProps,
    IControlStyleProps,
    IControlState
} from './Control.types'

import DefaultSettings from 'src/shared/DefaultSettings'

export class ControlBase extends React.Component<IControlProps, IControlState> {
    public state: IControlState = {
        isPinned: false,
        isFullScreen: false,
        isHideDialog: true
    }

    public componentDidMount() {
        ipcRenderer.send('setAlwaysOnTop', this.state.isPinned)
    }

    private _showDialog = (): void => {
        this.setState({ isHideDialog: false })
    }

    private _closeDialog = (): void => {
        this.setState({ isHideDialog: true })
    }

    private _closeWindow = (): void => {
        ipcRenderer.send('closeWindow')
    }

    private _minimizeWindow = (): void => {
        ipcRenderer.send('minimizeWindow')
    }

    private _pinnedWindow = (): void => {
        const isPinned: boolean = !this.state.isPinned
        this.setState({ isPinned })
        ipcRenderer.send('setAlwaysOnTop', isPinned)
    }

    private _fullScreenWindow = (): void => {
        const isFullScreen: boolean = !this.state.isFullScreen
        this.setState({ isFullScreen })
        ipcRenderer.send('fullScreenWindow', isFullScreen)
    }

    public render(): JSX.Element {
        const { styles, theme } = this.props

        const getClassNames = classNamesFunction<
            IControlStyleProps,
            IControlStyles
        >()
        const classNames: IProcessedStyleSet<IControlStyles> = getClassNames(
            styles,
            { theme }
        )

        return (
            <div className={classNames.root}>
                <IconButton
                    className={classNames.button}
                    style={
                        this.state.isPinned
                            ? {
                                  color: theme.palette.themePrimary,
                                  background: 'transparent'
                              }
                            : {}
                    }
                    onClick={this._pinnedWindow}
                    iconProps={{ iconName: 'PinnedSolid' }}
                    ariaLabel="PinnedSolid"
                />

                <IconButton
                    className={classNames.button}
                    onClick={this._minimizeWindow}
                    iconProps={{ iconName: 'ChromeMinimize' }}
                    ariaLabel="Minimize"
                />

                <IconButton
                    className={classNames.button}
                    onClick={this._fullScreenWindow}
                    iconProps={{
                        iconName: this.state.isFullScreen
                            ? 'ChromeRestore'
                            : 'Checkbox'
                    }}
                    ariaLabel={
                        this.state.isFullScreen ? 'Restore' : 'FullScreen'
                    }
                />

                <IconButton
                    className={classNames.button}
                    onClick={this._showDialog}
                    iconProps={{ iconName: 'ChromeClose' }}
                    ariaLabel="Close"
                />

                <Dialog
                    hidden={this.state.isHideDialog}
                    onDismiss={this._closeDialog}
                    dialogContentProps={{
                        type: DialogType.normal,
                        title: `关闭 ${DefaultSettings.APP_NAME}`,
                        subText: `您确定想要退出${DefaultSettings.APP_NAME}吗？`
                    }}
                    modalProps={{
                        isBlocking: true,
                        styles: { main: { maxWidth: 450 } }
                    }}
                >
                    <DialogFooter>
                        <PrimaryButton
                            onClick={this._closeWindow}
                            text="关闭"
                        />
                        <DefaultButton
                            onClick={this._closeDialog}
                            text="取消"
                        />
                    </DialogFooter>
                </Dialog>
            </div>
        )
    }
}
