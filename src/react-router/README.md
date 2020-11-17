# About

`Router` forks from [react-router](https://github.com/ReactTraining/react-router/)

# Example

```tsx
// router.tsx
export const routerMemoryHistory: History = createMemoryHistory()

export function to<TEvent = any>(
    routePath: string,
    callback?: (e: TEvent, routePath: string) => void,
): (e: TEvent) => void {
    return (e: TEvent) => {
        routerMemoryHistory.push(routePath)
        callback && callback(e, routePath)
    }
}

export const App: () => JSX.Element = () => {
    return (
        <Router history={routerMemoryHistory}>
            <Window>
                <Switch mode="style">
                    <Route path="/" exact component={GettingStarted} />
                    <Route path="/menu" component={Menu} />
                    <Route path="/articles" component={Articles} />
                    <Route path="/addSite" component={AddSite} />
                    <Route path="/history" component={ComponentHistory} />
                    <Route path="/sponsor" component={Sponsor} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/folder" component={Folder} />
                </Switch>
            </Window>
        </Router>
    )
}

// ...
// GettingStarted.tsx
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

// ...
// Menu.tsx
return (
    <Switch mode="clone">
        <Route path="/menu" exact>
            <AnimationWrap path="/menu">
                <p>Menu 1</p>
            </AnimationWrap>
        </Route>
        <Route path="/menu/b2">
            <AnimationWrap path="/menu/b2">
                <p>Menu 2</p>
            </AnimationWrap>
        </Route>
        <Route path="/menu/b3">
            <AnimationWrap path="/menu/b3">
                <p>Menu 3</p>
            </AnimationWrap>
        </Route>
        <Route path="/menu/b4">
            <AnimationWrap path="/menu/b4">
                <p>Menu 4</p>
            </AnimationWrap>
        </Route>
        <Route path="/menu/b5">
            <AnimationWrap path="/menu/b5">
                <p>Menu 5</p>
            </AnimationWrap>
        </Route>
        <Route path="/menu/b6">
            <AnimationWrap path="/menu/b6">
                <p>Menu 6</p>
            </AnimationWrap>
        </Route>
    </Switch>
)
```
