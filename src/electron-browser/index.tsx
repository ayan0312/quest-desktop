import React from 'react'
import ReactDOM from 'react-dom'
import { initializeIcons } from '@uifabric/icons'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'
import { ITheme, loadTheme } from 'office-ui-fabric-react/lib/Styling'

import { App } from 'src/electron-browser/router'
import { Theme, defaultTheme } from 'src/electron-browser/theme'

initializeIcons()
mergeStyles({
    selectors: {
        ':global(body), :global(html), :global(#root)': {
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%'
        }
    }
})

const theme: ITheme = loadTheme(defaultTheme)
ReactDOM.render(
    <Theme theme={theme}>
        <App />
    </Theme>,
    document.getElementById('root')
)
