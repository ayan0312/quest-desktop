import { IWindowNavStyles, IWindowNavStyleProps } from './WindowNav.types'

export const getStyles = (props: IWindowNavStyleProps): IWindowNavStyles => {
    return {
        root: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flex: '0 1 100%',
            flexDirection: 'column'
        },
        logo: {
            userSelect: 'none',
            width: '100%',
            height: '60px',
            lineHeight: '60px',
            textAlign: 'center',
            fontSize: '30px',
            display: 'block',
            flex: '0 0 60px'
        },
        action: [
            {
                listStyle: 'none',
                display: 'block',
                width: '75%',
                margin: '0',
                padding: '0 10% 0 15%',
                overflow: 'auto',
                flex: '0 1 100%'
            }
        ],
        actionItem: {
            padding: '15px 0',
            selectors: {
                '>span': {
                    color: '#787878',
                    fontSize: '12px',
                    userSelect: 'none',
                    display: 'block',
                    margin: '5px 0 10px 0'
                }
            }
        },
        routeLinks: {
            display: 'block',
            selectors: {
                '.active': {}
            }
        },
        activeButton: {
            marginBottom: '10px',
            height: '30px',
            width: '100%',
            textAlign: 'left',
            transition: 'all 0.1s',
            background: 'green',
            selectors: {}
        },
        button: {
            marginBottom: '10px',
            height: '30px',
            width: '100%',
            textAlign: 'left',
            transition: 'all 0.1s',
            background: 'transparent',
            selectors: {
                ':hover': {
                    background: '#D8D8D8'
                }
            }
        }
    }
}
