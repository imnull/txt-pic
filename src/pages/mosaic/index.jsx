import React, { createRef, useEffect, useState } from 'react'
import { drawMosaicToCanvas, drawMosaicDataToContext, getMosaicData, getImageData } from '../../impressionist'

import './index.css'

export default (props) => {

    const canvas = createRef()
    const [size, setSize] = useState(8)
    const [imageData, setImageData] = useState(null)

    const handleImageLoad = (e) => {
        const { target: image } = e
        const imageData = getImageData(image)
        setImageData(imageData)
    }

    const drawMosaic = (imageData, canvas) => {
        const mosaicData = getMosaicData(imageData, size)
        canvas.width = mosaicData.width
        canvas.height = mosaicData.height
        drawMosaicToCanvas(canvas, mosaicData)
    }

    const handleSize = (e) => {
        const { target: { value } } = e
        setSize(Number(value))
    }

    useEffect(() => {
        if(!imageData || !canvas.current) {
            return
        }
        drawMosaic(imageData, canvas.current)
    }, [imageData, size])

    

    return (
        <div className="mosaic-container">
            <div className="mosaic-ops">
                <input type="range" min={8} max={32} value={size} onChange={handleSize} />
                <span className="mosaic-ops-text">SIZE={size}</span>
            </div>
            <div className="mosaic-row">
                <img className="mosaic-origin" src={`./images/logo.jpg`} onLoad={handleImageLoad} />
                <canvas className="mosaic-canvas" ref={canvas} />
            </div>
        </div>
    )
}