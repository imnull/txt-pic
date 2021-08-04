import React, { useEffect, useState, createRef } from 'react'
import { getMosaicData, getImageData } from '../../impressionist'
import { mosaic2lines, animationFactory } from '../../utils'

import './index.css'

const frameDraw = (ctx, video, setImageData) => () => {
    ctx.drawImage(video, 0, 0)
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    setImageData(imageData)
}

export default (props) => {

    const video = createRef()
    const canvas = createRef()

    const [scale, setScale] = useState(1)
    const [size, setSize] = useState(8)
    const [imageData, setImageData] = useState(null)
    const [lines, setLines] = useState([])

    let eng = null

    const handleLoadedMetaData = (e) => {
        const { target } = e
        const { current: cvs } = canvas
        cvs.width = target.videoWidth
        cvs.height = target.videoHeight
        const ctx = cvs.getContext('2d')
        if(!eng) {
            const frame = frameDraw(ctx, video.current, setImageData)
            eng = animationFactory(frame)
            eng.start()
        }
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

    useEffect(() => () => {
        if(eng) {
            eng.stop()
        }
    }, [])
    return (
        <div className="video-container">
            <div className="video-ops">
                <input type="range" min={4} max={16} value={size} onChange={handleSize} />
                <span className="video-ops-text">SIZE={size}</span>
            </div>
            <div className="video-row">
                <video
                    ref={video}
                    controls
                    autoPlay
                    loop
                    className="video-origin"
                    src="./images/cat.mp4"
                    onLoadedMetadata={handleLoadedMetaData}
                />
                <canvas ref={canvas} style={{ backgroundColor: '#eee', display: 'none' }} />
                <div className="video-lines-container" style={{ transform: `scale(${scale})` }}>{
                    lines.map((line, idx) => <pre className="video-line" key={idx}>{line}</pre>)
                }</div>
            </div>
        </div>
    )
}