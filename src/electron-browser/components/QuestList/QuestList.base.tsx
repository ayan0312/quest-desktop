import React from 'react'
import { Separator } from 'office-ui-fabric-react/lib/Separator'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import {
    PrimaryButton,
    IconButton,
    IProcessedStyleSet,
    classNamesFunction
} from 'office-ui-fabric-react'
import {
    FocusZone,
    FocusZoneDirection
} from 'office-ui-fabric-react/lib/FocusZone'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image'
import { List } from 'office-ui-fabric-react/lib/List'
import {
    IQuestListProps,
    IQuestListStyles,
    IQuestListStyleProps,
    IQuestListState
} from './QuestList.types'
import { QuestData } from 'src/node/QuestSystem/Quest'

export class QuestListBase extends React.Component<IQuestListProps> {
    public state: IQuestListState = {
        isSearched: false,
        searchedItems: []
    }

    private _onComplete(data: QuestData) {
        return () => {
            this.props.onQuestComplete(data)
            this.setState({
                searchedItems: this.state.searchedItems.filter(
                    item => item.id === data.id
                )
            })
        }
    }

    private _onRenderCell(classNames: IProcessedStyleSet<IQuestListStyles>) {
        return (item: QuestData, index: number | undefined) => {
            return (
                <div className={classNames.itemCell} data-is-focusable={true}>
                    <Image
                        className={classNames.itemImage}
                        src=""
                        width={50}
                        height={50}
                        imageFit={ImageFit.cover}
                    />
                    <div className={classNames.itemContent}>
                        <div className={classNames.itemName}>{item.name}</div>
                        <div
                            className={classNames.itemIndex}
                        >{`Item ${index}`}</div>
                        <div>{item.description}</div>
                    </div>
                    <PrimaryButton
                        text="complete"
                        onClick={this._onComplete(item)}
                        allowDisabledFocus
                    />
                </div>
            )
        }
    }

    public render(): JSX.Element {
        const { styles, theme, questData } = this.props

        const getClassNames = classNamesFunction<
            IQuestListStyleProps,
            IQuestListStyles
        >()
        const classNames: IProcessedStyleSet<IQuestListStyles> = getClassNames(
            styles,
            { theme }
        )

        const originalItems = questData

        const _onFilterChanged = (_: any, text: string): void => {
            let searchedItems = originalItems.filter(
                item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0
            )

            this.setState({
                searchedItems,
                isSearched:
                    searchedItems.length === originalItems.length ? false : true
            })
        }

        let resultContent =
            this.state.searchedItems.length === originalItems.length
                ? ''
                : `${this.state.searchedItems.length} of ${originalItems.length} shown`

        return (
            <Stack
                wrap={false}
                className={classNames.root}
                disableShrink={false}
            >
                <Stack.Item align="center" grow className={classNames.top}>
                    <Stack>
                        <TextField
                            label={
                                '查找任务' +
                                (this.state.isSearched ? resultContent : '')
                            }
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={_onFilterChanged}
                        />
                        <IconButton
                            iconProps={{
                                iconName: 'settings'
                            }}
                            title="Emoji"
                            ariaLabel="Emoji"
                        />
                        <Separator>任务</Separator>
                    </Stack>
                </Stack.Item>

                <Stack.Item align="center" className={classNames.bottom}>
                    <Stack>
                        <FocusZone direction={FocusZoneDirection.vertical}>
                            <List
                                items={
                                    this.state.isSearched
                                        ? this.state.searchedItems
                                        : originalItems
                                }
                                onRenderCell={this._onRenderCell(classNames)}
                            />
                        </FocusZone>
                    </Stack>
                </Stack.Item>
            </Stack>
        )
    }
}
