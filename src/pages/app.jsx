import * as React from 'react'
import Mosaic from './mosaic'

import { getCharMap } from '../txt-pic/char-map'

const charMap = getCharMap('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`1234567890-=[]\\;\',./~!@#$%^&*()_+{}|:"<>?')
console.log(charMap)

export default class App extends React.Component {
    render() {
        return (
            <div className="root">
                <Mosaic charMap={charMap} />
            </div>
        )
    }
}