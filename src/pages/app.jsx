import * as React from 'react'
import { getFullCharMap } from '../txt-pic/char-map'

import Impressionist from './impressionist'
import Video from './video'


const charMap = getFullCharMap()
console.log(charMap)

export default class App extends React.Component {
    render() {
        return (
            <div className="root">
                <Video charMap={charMap} degree={4} />
                <Impressionist charMap={charMap} imageSrc={`./images/logo.jpg`} degree={8} />
            </div>
        )
    }
}