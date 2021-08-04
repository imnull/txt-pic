import React, { createRef, useEffect, useState } from 'react'
import './index.css'

import { loadImage, getImageData, putImageDataToCanvas } from '../../txt-pic/utils'
import { getMosaicData, drawMosaicToCanvas, drawMosaicDataToContext } from '../../txt-pic/mosaic'

export default (props) => {

    const { charMap, imageSrc, degree = 4 } = props
    const [image, setImage] = useState(null)
    const [lines, setLines] = useState([])

    useEffect(() => {
        if(!image) {
            return
        }
        console.log(image)
        const imgDt = getImageData(image)

        const md = getMosaicData(imgDt, degree)
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
    }, [image])

    useEffect(() => {
        loadImage(imageSrc).then(img => {
            setImage(img)
        })
        return () => {
        }
    }, [])

    const S = 6

    return (
        <>
            <div className="txt-pic">{
                lines.map((line, idx) => <pre key={idx}>{line}</pre>)
            }</div>
        </>
    )
}