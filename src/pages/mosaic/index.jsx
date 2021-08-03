import React, { createRef, useEffect, useState } from 'react'
import './index.css'

import { loadImage, getImageData, putImageDataToCanvas } from '../../txt-pic/utils'
import { getMosaicData, drawMosaicToCanvas, drawMosaicDataToContext } from '../../txt-pic/mosaic'

export default (props) => {

    const { charMap } = props

    const cvs1 = createRef()
    const cvs2 = createRef()
    const [image, setImage] = useState(null)
    const [mosaic, setMosaic] = useState(null)

    useEffect(() => {
        if(!image) {
            return
        }
        console.log(image)
        const imgDt = getImageData(image)
        // putImageDataToCanvas(cvs1.current, imgDt)

        const md = getMosaicData(imgDt, 3)
        setMosaic(md)
        // const ctx2 = cvs2.current.getContext('2d')
        // ctx2.save()
        // ctx2.fillStyle = '#fff'
        // ctx2.fillRect(0, 0, ctx2.canvas.width, ctx2.canvas.height)
        // drawMosaicDataToContext(ctx2, md, true)
        // ctx2.restore()
    }, [image])

    useEffect(() => {
        loadImage('./images/suning.jpg').then(img => {
            setImage(img)
        })
        return () => {
        }
    }, [])

    const S = 6

    return (
        <>
            {/* <canvas className="mosaic-canvas" width={120} height={120} ref={cvs1} />
            <canvas className="mosaic-canvas" width={120} height={120} ref={cvs2} /> */}
            { mosaic ? (<div className="txt-pic" style={{ width: S * mosaic.columns }}>{
                mosaic.points.map((point, idx) => {
                    let [r, g, b, a] = point[2].map(v => v / 256)
                    const charIndex = g * a * charMap.length >> 0
                    const char = charMap[charIndex]
                    return <i className="txt-cell" style={{ width: S, height: S, lineHeight: `${S}px` }} key={idx}>
                        <span>{char.letter}</span>
                    </i>
                })
            }</div>) : null}
        </>
    )
}