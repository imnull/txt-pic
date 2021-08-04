import React, { useEffect, useState } from 'react'
import { getMosaicData, getImageData } from '../../impressionist'
import { mosaic2lines } from '../../utils'

import './index.css'

export default (props) => {

    const [scale, setScale] = useState(1)
    const [size, setSize] = useState(6)
    const [imageData, setImageData] = useState(null)
    const [lines, setLines] = useState([])

    const handleImageLoad = (e) => {
        const { target: image } = e
        const imageData = getImageData(image)
        setImageData(imageData)
    }

    const drawImpress = (imageData) => {
        const mosaicData = getMosaicData(imageData, size)
        const lines = mosaic2lines(mosaicData)
        const mayWidth = mosaicData.columns * 8
        if(mayWidth > imageData.width) {
            const scale = imageData.width / mayWidth
            setScale(scale)
        } else {
            setScale(imageData.width / mayWidth)
        }
        setLines(lines)
    }

    const handleSize = (e) => {
        const { target: { value } } = e
        setSize(Number(value))
    }

    useEffect(() => {
        if(!imageData) {
            return
        }
        drawImpress(imageData)
    }, [imageData, size])

    

    return (
        <div className="impress-container">
            <div className="impress-ops">
                <input type="range" min={2} max={16} value={size} onChange={handleSize} />
                <span className="impress-ops-text">SIZE={size}</span>
            </div>
            <div className="impress-row">
                <img className="impress-origin" src={`./images/logo.jpg`} onLoad={handleImageLoad} />
                <div className="impress-lines-container" style={{ transform: `scale(${scale})` }}>{
                    lines.map((line, idx) => <pre className="impress-line" key={idx}>{line}</pre>)
                }</div>
            </div>
        </div>
    )
}