import React from 'react'
import { History, createMemoryHistory } from 'history'

import { Route, Switch, Router } from 'src/react-router'

import { Window } from 'src/electron-browser/window/Window'

import { GettingStarted } from 'src/electron-browser/pages/GettingStarted/GettingStarted'
import { Mainline } from 'src/electron-browser/pages/Mainline/Mainline'
import { Sideline } from 'src/electron-browser/pages/Sideline/Sideline'
import { Daily } from 'src/electron-browser/pages/Daily/Daily'
import { Weekly } from 'src/electron-browser/pages/Weekly/Weekly'
import { Monthly } from 'src/electron-browser/pages/Monthly/Monthly'
import { History as ComponentHistory } from 'src/electron-browser/pages/History/History'
import { Sponsor } from 'src/electron-browser/pages/Sponsor/Sponsor'
import { Settings } from 'src/electron-browser/pages/Settings/Settings'
import { AddQuest } from './pages/AddQuest/AddQuest'

export const routerMemoryHistory: History = createMemoryHistory()

export function to<TEvent = any>(
    routePath: string,
    callback?: (e: TEvent, routePath: string) => void
): (e: TEvent) => void {
    return (e: TEvent) => {
        routerMemoryHistory.push(routePath)
        callback && callback(e, routePath)
    }
}

export const App: () => JSX.Element = () => {
    console.log(routerMemoryHistory.location)
    return (
        <Router history={routerMemoryHistory}>
            <Window>
                <Switch mode="style">
                    <Route path="/" exact component={GettingStarted} />
                    <Route path="/mainline" component={Mainline} />
                    <Route path="/sideline" component={Sideline} />
                    <Route path="/daily" component={Daily} />
                    <Route path="/weekly" component={Weekly} />
                    <Route path="/monthly" component={Monthly} />
                    <Route path="/addQuest" component={AddQuest} />
                    <Route path="/history" component={ComponentHistory} />
                    <Route path="/sponsor" component={Sponsor} />
                    <Route path="/settings" component={Settings} />
                </Switch>
            </Window>
        </Router>
    )
}
