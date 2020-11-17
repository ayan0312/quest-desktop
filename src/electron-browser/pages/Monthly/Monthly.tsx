import React from 'react'

import { AnimationWrap } from 'src/react-router'

export class Monthly extends React.Component {
    public render() {
        return (
            <AnimationWrap path="/monthly">
                <p>Monthly</p>
            </AnimationWrap>
        )
    }
}
