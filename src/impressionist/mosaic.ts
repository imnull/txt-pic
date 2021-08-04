import { TColor, TMosacData, TMosacPoint } from "./types"

export const getMosaicData = (image: ImageData, size: number, offsetX: number = 0, offsetY: number = 0): TMosacData => {
    if(size < 1) {
        size = 1
    }
    const { data, width, height } = image
    const rows = height / size >> 0
    const columns = width / size >> 0
    const points: TMosacPoint[] = []
    const s2 = size * .5 >> 0
    let y = 0
    while(y < rows) {
        let x = 0
        while(x < columns) {
            const idx = ((y * size + s2 + offsetY) * width + x * size + offsetX + s2) * 4
            const color = Array.from(data.slice(idx, idx + 4)) as TColor
            points.push([x * size, y * size, color])
            x += 1
        }
        y += 1
    }
    return { points, width, height, size, offsetX, offsetY, columns, rows }
}

export const drawMosaicDataToContext = (ctx: CanvasRenderingContext2D, data: TMosacData, debug: boolean = false) => {
    data.points.forEach(item => {
        ctx.save()
        ctx.beginPath()
        ctx.rect(item[0], item[1] + data.offsetY, data.size, data.size)
        ctx.clip()
        const [r, g, b, a] = item[2]
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`
        ctx.fill()
        if(debug) {
            ctx.lineWidth = 2
            ctx.strokeStyle = `rgba(0,0,0,0.2)`
            ctx.stroke()
        }
        ctx.restore()
    })
}

export const drawMosaicToCanvas = (canvas: HTMLCanvasElement, data: TMosacData, debug: boolean = false) => {
    const ctx = canvas.getContext('2d')
    drawMosaicDataToContext(ctx, data, debug)
}