import { ITheme, createTheme } from 'office-ui-fabric-react/lib/Styling'

export const defaultTheme: ITheme = createTheme({
    palette: {
        themePrimary: '#803b39',
        themeLighterAlt: '#faf5f4',
        themeLighter: '#ebd7d6',
        themeLight: '#d9b6b5',
        themeTertiary: '#b37a78',
        themeSecondary: '#8f4c4a',
        themeDarkAlt: '#733634',
        themeDark: '#612d2c',
        themeDarker: '#472120',
        neutralLighterAlt: '#eeeeee',
        neutralLighter: '#eaeaea',
        neutralLight: '#e1e1e1',
        neutralQuaternaryAlt: '#d1d1d1',
        neutralQuaternary: '#c8c8c8',
        neutralTertiaryAlt: '#c0c0c0',
        neutralTertiary: '#b7b7b7',
        neutralSecondary: '#a0a0a0',
        neutralPrimaryAlt: '#888888',
        neutralPrimary: '#2b2b2b',
        neutralDark: '#5a5a5a',
        black: '#434343',
        white: '#f6f6f6'
    }
})

export const defaultNightTheme: ITheme = createTheme({
    palette: {
        themePrimary: '#e1e1e1',
        themeLighterAlt: '#e4e4e4',
        themeLighter: '#e7e7e7',
        themeLight: '#eaeaea',
        themeTertiary: '#eeeeee',
        themeSecondary: '#f1f1f1',
        themeDarkAlt: '#f5f5f5',
        themeDark: '#f8f8f8',
        themeDarker: '#fbfbfb',
        neutralLighterAlt: '#4a4a4a',
        neutralLighter: '#525252',
        neutralLight: '#5e5e5e',
        neutralQuaternaryAlt: '#656565',
        neutralQuaternary: '#6b6b6b',
        neutralTertiaryAlt: '#848484',
        neutralTertiary: '#f8f8f8',
        neutralSecondary: '#f9f9f9',
        neutralPrimaryAlt: '#fafafa',
        neutralPrimary: '#f6f6f6',
        neutralDark: '#fdfdfd',
        black: '#fefefe',
        white: '#434343'
    }
})
