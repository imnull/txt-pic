import React, { createRef, useEffect, useState } from 'react'
import './index.css'

import { loadImage, getImageData, putImageDataToCanvas } from '../../txt-pic/utils'
import { getMosaicData, drawMosaicToCanvas, drawMosaicDataToContext } from '../../txt-pic/mosaic'
import TxtExp from '../txt-exp'

export default (props) => {

    const { charMap, imageSrc, degree = 4 } = props
    const [image, setImage] = useState(null)
    const [lines, setLines] = useState([])
    const [imageData, setImageData] = useState(null)

    // useEffect(() => {
    //     if(!image) {
    //         return
    //     }
    //     console.log(image)
    //     const imgDt = getImageData(image)

    //     const md = getMosaicData(imgDt, degree)
    //     const chars = md.points.map(point => {
    //         const [r, g, b, a] = point[2].map(v => v / 256)
    //         const charIndex = g * a * charMap.length >> 0
    //         const char = charMap[charIndex]
    //         return char.letter
    //     })
    //     const lines = []
    //     while(chars.length > 0) {
    //         lines.push(chars.splice(0, md.columns).join(''))
    //     }
    //     lines.pop()
    //     setLines(lines)
    // }, [image])

    useEffect(() => {
        loadImage(imageSrc).then(img => {
            const imgDt = getImageData(img)
            setImageData(imgDt)
        })
        return () => {
        }
    }, [])

    const S = 6

    return (
        <>
            <div className="txt-pic">
                <TxtExp degree={degree} imageData={imageData} charMap={charMap} />
            </div>
        </>
    )
}