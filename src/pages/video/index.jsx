import React, { createRef, useEffect, useState } from 'react'
import TxtExp from '../txt-exp'

import './index.css'

const animationEngine = (cb) => {
    let stop = false, handle = 0
    const loop = () => {
        cancelAnimationFrame(handle)
        if(stop) {
            return
        }
        cb()
        handle = requestAnimationFrame(loop)
    }

    return {
        start() {
            stop = false
            requestAnimationFrame(loop)
        },
        stop() {
            stop = true
            cancelAnimationFrame(handle)
        }
    }
}

const txtFrame = (ctx, video, setImageData) => () => {
    ctx.drawImage(video, 0, 0)
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    setImageData(imageData)
}

export default (props) => {

    const { charMap, degree = 4 } = props

    const canvas = createRef()
    const video = createRef()

    const [imageData, setImageData] = useState(null)

    let eng = null

    const handleLoadedMetaData = (e) => {
        const { target } = e
        const { current: cvs } = canvas
        cvs.width = target.videoWidth
        cvs.height = target.videoHeight
        const ctx = cvs.getContext('2d')
        if(!eng) {
            const frame = txtFrame(ctx, video.current, setImageData)
            eng = animationEngine(frame)
            eng.start()
        }
    }

    useEffect(() => {
        return () => {
            if(eng) {
                eng.stop()
            }
        }
    }, [])

    return (
        <div>
            <video
                ref={video}
                controls
                src="./images/cat.mp4"
                onLoadedMetadata={handleLoadedMetaData}
            />
            <canvas ref={canvas} style={{ backgroundColor: '#eee' }} />
            <div className="video-txt">
                <TxtExp charMap={charMap} degree={degree} imageData={imageData} />
            </div>
        </div>
    )
}