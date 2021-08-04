import React, { createRef, useEffect, useState } from 'react'
import {
    getImageData,
    createMosaicFilter,
} from '../../impressionist'

import './index.css'

export default (props) => {

    const canvas = createRef()
    const [size, setSize] = useState(8)
    const [offset, setOffset] = useState(0.5)
    const [img, setImg] = useState(null)

    const handleImageLoad = (e) => {
        const { target: image } = e
        setImg(image)
    }

    const drawMosaic = (imageData, canvas) => {
        imageData = createMosaicFilter(size, offset)(imageData)
        canvas.width = imageData.width
        canvas.height = imageData.height
        const ctx = canvas.getContext('2d')
        ctx.putImageData(imageData, 0, 0)
    }

    const handleSize = (e) => {
        const { target: { value } } = e
        setSize(Number(value))
    }

    const handleOffset = (e) => {
        const { target: { value } } = e
        setOffset(Number(value))
    }

    useEffect(() => {
        if(!img || !canvas.current) {
            return
        }
        const data = getImageData(img)
        drawMosaic(data, canvas.current)
    }, [img, size, offset])
    

    return (
        <div className="mosaic-container">
            <div className="mosaic-ops">
                <input type="range" min={4} max={32} value={size} onChange={handleSize} />
                <span className="mosaic-ops-text">SIZE={size}</span>
            </div>
            <div className="mosaic-ops">
                <input type="range" min={0} max={1} value={offset} step={0.1} onChange={handleOffset} />
                <span className="mosaic-ops-text">OFFSET={offset}</span>
            </div>
            <div className="mosaic-row">
                <img className="mosaic-origin" src={`./images/logo.jpg`} onLoad={handleImageLoad} />
                <canvas className="mosaic-canvas" ref={canvas} />
            </div>
        </div>
    )
}