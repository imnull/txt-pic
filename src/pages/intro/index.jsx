import React, { createRef, useEffect, useState } from 'react'

export default (props) => {

    const [s1, setS1] = useState('')
    const section1 = () => {
        const canvas = document.createElement('canvas')
        canvas.width = 2
        canvas.height = 2
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = `rgba(10,20,30,0.5)`
        ctx.fillRect(0, 1, 1, 1)
        const imageData = ctx.getImageData(0, 0, 2, 2)
        setS1(JSON.stringify({
            width: imageData.width,
            height: imageData.height,
            data: Array.from(imageData.data)
        }, null, '  '))
    }

    useEffect(() => {
        section1()
    }, [])

    return (
        <div className="intro-container">
            <div className="section">
                <h3>Canvas绘图并获取数据</h3>
                <pre>{s1}</pre>
            </div>
        </div>
    )
}