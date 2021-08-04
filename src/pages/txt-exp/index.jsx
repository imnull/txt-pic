import React, { createRef, useEffect, useState } from 'react'
import './index.css'

import { getMosaicData } from '../../txt-pic/mosaic'

export default (props) => {

    const { charMap, imageData, degree = 4 } = props
    const [lines, setLines] = useState([])

    useEffect(() => {

        if(!imageData) {
            return
        }

        const md = getMosaicData(imageData, degree)
        const chars = md.points.map(point => {
            const [r, g, b, a] = point[2].map(v => v / 256)
            const charIndex = g * a * charMap.length >> 0
            const char = charMap[charIndex]
            return char.letter
        })
        const lines = []
        while(chars.length > 0) {
            lines.push(chars.splice(0, md.columns).join(''))
        }
        lines.pop()
        setLines(lines)
    }, [imageData])

    return (
        <>{lines.map((line, idx) => <pre className="txt-exp" key={idx}>{line}</pre>)}</>
    )
}