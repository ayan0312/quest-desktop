import React from 'react'

import { AnimationWrap } from 'src/react-router'

export class Weekly extends React.Component {
    public render() {
        return (
            <AnimationWrap path="/weekly">
                <p>Weekly</p>
            </AnimationWrap>
        )
    }
}
