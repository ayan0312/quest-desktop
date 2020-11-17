import React from 'react'
import {
    ChoiceGroup,
    IChoiceGroupOption
} from 'office-ui-fabric-react/lib/ChoiceGroup'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import {
    PrimaryButton,
    classNamesFunction,
    IProcessedStyleSet,
    Separator,
    Label,
    IconButton,
    SpinButton,
    Spinner,
    SpinnerSize,
    MessageBar,
    MessageBarButton,
    MessageBarType
} from 'office-ui-fabric-react'

import { AnimationWrap } from 'src/react-router'
import { ipcRenderer } from 'electron'
import {
    IAddQuestStyleProps,
    IAddQuestStyles,
    IAddQuestState,
    IAddQuestProps
} from './AddQuest.types'
import {
    questControllerTypeToCode,
    checkQuestControllerType,
    QuestControllerTypeCodes
} from 'src/node/QuestSystem/QuestController'
import { extend } from 'src/shared/Utilities'
import { QuestRewardOption } from 'src/node/QuestSystem/QuestReward'
import questSystem from 'src/node/QuestSystem'

const defaultState: IAddQuestState = {
    quest: {
        name: '',
        type: -1,
        description: ''
    },
    rewardGroup: [],
    optionsCount: 0,
    isSubmitted: false,
    isShowMessage: false
}

export class AddQuestBase extends React.Component<IAddQuestProps> {
    public state: IAddQuestState = defaultState
    private _options: IChoiceGroupOption[] = [
        { key: 'daily', text: '每日', iconProps: { iconName: 'CalendarDay' } },
        {
            key: 'weekly',
            text: '每周',
            iconProps: { iconName: 'CalendarWeek' }
        },
        { key: 'monthly', text: '每月', iconProps: { iconName: 'Calendar' } },
        {
            key: 'mainline',
            text: '主线',
            disabled: true,
            iconProps: { iconName: 'SortLines' }
        },
        {
            key: 'sideline',
            text: '支线',
            disabled: true,
            iconProps: { iconName: 'TaskGroup' }
        },
        {
            key: 'activity',
            text: '活动',
            disabled: true,
            iconProps: { iconName: 'Family' }
        }
    ]

    private _increaseOptionsCount = () => {
        let initReward = {
            name: '',
            questType: -1
        }
        let rewardGroup = this.state.rewardGroup.slice()
        rewardGroup.push(initReward)
        this.setState({
            rewardGroup,
            optionsCount: this.state.optionsCount + 1
        })
    }

    private _decreaseOptioinsCount = () => {
        let rewardGroup = this.state.rewardGroup.slice()
        rewardGroup.pop()
        let n = this.state.optionsCount - 1
        if (n >= 0)
            this.setState({
                rewardGroup,
                optionsCount: n
            })
    }

    private _setQuestType = (
        ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
        option?: IChoiceGroupOption
    ) => {
        if (!option) return
        let type = checkQuestControllerType(option.key)
        if (type)
            this.setState({
                quest: extend(this.state.quest, {
                    type: questControllerTypeToCode(type)
                })
            })
    }

    private _setQuestDescription = (
        event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        newValue?: string
    ) => {
        if (newValue)
            this.setState({
                quest: extend(this.state.quest, {
                    description: newValue
                })
            })
    }

    private _setQuestName = (
        event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        newValue?: string
    ) => {
        if (newValue)
            this.setState({
                quest: extend(this.state.quest, {
                    name: newValue
                })
            })
    }

    private _changeRewardGroup(
        cb: (
            reward?: QuestRewardOption,
            index?: number,
            array?: QuestRewardOption[]
        ) => QuestRewardOption
    ) {
        let rewardGroup = this.state.rewardGroup.slice()
        this.setState({
            rewardGroup: rewardGroup.map((reward, index, rewards) => {
                return cb(reward, index, rewards)
            })
        })
    }

    private _changeKeyReward = (
        key: number,
        targetReward: Partial<QuestRewardOption>
    ) => {
        this._changeRewardGroup((reward, index) => {
            if (key === index) {
                reward = extend(reward, targetReward)
            }
            return reward
        })
    }

    private _onRewardNameChange(key: number) {
        return (
            event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
            newValue?: string
        ) => {
            if (newValue)
                this._changeKeyReward(key, {
                    name: newValue
                })
        }
    }

    private _onProgressValueValidate(key: number) {
        return (value?: string) => {
            if (value)
                this._changeKeyReward(key, {
                    activityValue: parseInt(value)
                })
        }
    }

    private _onDescriptionChange(key: number) {
        return (
            event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
            newValue?: string
        ) => {
            if (newValue)
                this._changeKeyReward(key, {
                    description: newValue
                })
        }
    }

    private _openFileDialog = () => {
        ipcRenderer.send('open-file-dialog')
    }

    private _getEmptyErrorMessage = (value: string): string => {
        return value.length > 0 ? '' : `请填写内容`
    }

    private _createRewardForm(
        key: number,
        classNames: IProcessedStyleSet<IAddQuestStyles>
    ) {
        let getIconPathname = (
            event: Electron.IpcRendererEvent,
            file: Electron.OpenDialogReturnValue
        ) => {
            console.log(file)
            if (file.filePaths[0])
                this._changeKeyReward(key, {
                    iconPath: file.filePaths[0]
                })
        }

        ipcRenderer.removeAllListeners('selected-image')
        ipcRenderer.on('selected-image', getIconPathname)

        return (
            <Stack key={key}>
                <Separator className={classNames.separator}>
                    奖励{key + 1}
                </Separator>
                <TextField
                    underlined
                    label="奖励名称"
                    onGetErrorMessage={this._getEmptyErrorMessage}
                    onChange={this._onRewardNameChange(key)}
                />
                <Label>
                    上传图标
                    <Stack horizontal disableShrink>
                        <Stack.Item>
                            <TextField
                                label="地址："
                                underlined
                                value={this.state.rewardGroup[key].iconPath}
                            />
                        </Stack.Item>
                        <Stack.Item>
                            <IconButton
                                iconProps={{
                                    iconName: 'Upload'
                                }}
                                title="Upload"
                                ariaLabel="Emoji"
                                onClick={this._openFileDialog}
                            />
                        </Stack.Item>
                    </Stack>
                </Label>

                <SpinButton
                    defaultValue="0"
                    label={'活跃值'}
                    min={0}
                    max={10000}
                    step={1}
                    onValidate={this._onProgressValueValidate(key)}
                    incrementButtonAriaLabel={'Increase value by 1'}
                    decrementButtonAriaLabel={'Decrease value by 1'}
                />
                <TextField
                    label="奖励描述"
                    multiline
                    rows={3}
                    onChange={this._onDescriptionChange(key)}
                />
            </Stack>
        )
    }

    private _renderAllRewardForm(
        classNames: IProcessedStyleSet<IAddQuestStyles>,
        count: number
    ) {
        let r: JSX.Element[] = []
        for (let i = 0; i < count; i++)
            r.push(this._createRewardForm(i, classNames))
        return r
    }

    public render(): JSX.Element {
        const { styles, theme } = this.props

        const getClassNames = classNamesFunction<
            IAddQuestStyleProps,
            IAddQuestStyles
        >()

        const classNames: IProcessedStyleSet<IAddQuestStyles> = getClassNames(
            styles,
            { theme }
        )

        return (
            <AnimationWrap path="/addQuest">
                <MessageBar
                    styles={
                        this.state.isShowMessage
                            ? {
                                  root: { opacity: 1 }
                              }
                            : {
                                  root: { opacity: 0 }
                              }
                    }
                    className={classNames.messageBar}
                    messageBarType={this.state.messageBarType}
                    isMultiline={false}
                >
                    {this.state.message}
                </MessageBar>

                <Stack className={classNames.root}>
                    <Separator className={classNames.separator}>
                        创建新任务
                    </Separator>
                    <Stack
                        wrap={false}
                        className={classNames.stack}
                        disableShrink={false}
                        horizontal
                        horizontalAlign="center"
                    >
                        <Stack.Item className={classNames.stackItem}>
                            <TextField
                                underlined
                                label="任务名称"
                                onGetErrorMessage={this._getEmptyErrorMessage}
                                onChange={this._setQuestName}
                            />
                            <TextField
                                label="任务描述"
                                onChange={this._setQuestDescription}
                                multiline
                                rows={3}
                            />

                            <ChoiceGroup
                                label="任务类型"
                                onChange={this._setQuestType}
                                options={this._options}
                            />
                        </Stack.Item>

                        <Stack.Item className={classNames.stackItem}>
                            <PrimaryButton
                                className={classNames.button}
                                text="添加新奖励"
                                onClick={this._increaseOptionsCount}
                            />
                            {this._renderAllRewardForm(
                                classNames,
                                this.state.optionsCount
                            )}
                            {this.state.optionsCount > 0 ? (
                                <PrimaryButton
                                    className={classNames.button}
                                    text="删除"
                                    onClick={this._decreaseOptioinsCount}
                                />
                            ) : (
                                ''
                            )}
                        </Stack.Item>
                    </Stack>
                    <Separator className={classNames.separator}>结束</Separator>
                    <Stack
                        className={classNames.stack}
                        verticalAlign="center"
                        gap={20}
                    >
                        <Stack.Item align="center">
                            <PrimaryButton
                                className={classNames.shortButton}
                                text="创建"
                                onClick={this._submit}
                                disabled={this.state.isSubmitted}
                            />
                        </Stack.Item>
                        <Stack.Item align="center">
                            <Spinner
                                className={classNames.spinner}
                                style={
                                    this.state.isSubmitted
                                        ? { display: 'block' }
                                        : { display: 'none' }
                                }
                                size={SpinnerSize.large}
                            />
                        </Stack.Item>
                    </Stack>
                </Stack>
            </AnimationWrap>
        )
    }

    private _submit = () => {
        let questInput = this.state.quest
        if (questInput.type < 0) return

        this.setState({
            isSubmitted: true
        })

        let rewardGroup = this.state.rewardGroup.slice()
        rewardGroup.map(reward => {
            reward.questType = questInput.type
        })

        let option = {
            rewardGroup,
            name: questInput.name,
            description: questInput.description,
            type: questInput.type
        }

        if (questInput.type === QuestControllerTypeCodes.DAILY)
            questSystem.addDailyQuest(option)
        if (questInput.type === QuestControllerTypeCodes.WEEKLY)
            questSystem.addWeeklyQuest(option)
        if (questInput.type === QuestControllerTypeCodes.MONTHLY)
            questSystem.addMonthlyQuest(option)

        setTimeout(() => {
            this.setState(
                extend(defaultState, {
                    isShowMessage: true,
                    messageBarType: MessageBarType.success,
                    message: `添加成功:${questInput.name}`
                })
            )
        }, 500)
    }
}
