import {
    ITheme,
    loadTheme as _loadTheme
} from 'office-ui-fabric-react/lib/Styling'

export function loadTheme(theme: ITheme, depComments?: boolean): ITheme {
    return _loadTheme(theme, depComments)
}
