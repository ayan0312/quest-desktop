import React from 'react'

import { AnimationWrap } from 'src/react-router'

export class Sideline extends React.Component {
    public render() {
        return (
            <AnimationWrap path="/sideline">
                <p>Sideline</p>
            </AnimationWrap>
        )
    }
}
