import { TColor, TMosacData, TMosacPoint } from "./types"

export const getMosaicData = (image: ImageData, size: number, offsetX: number = 0, offsetY: number = 0): TMosacData => {
    const { data, width, height } = image
    const columns = Math.ceil(width / size)
    const points: TMosacPoint[] = []
    const s2 = size * .5 >> 0
    let y = 0
    while(y < height) {
        let x = 0
        while(x < width) {
            const idx = ((y + s2 + offsetY) * width + x + offsetX + s2) * 4
            const color = Array.from(data.slice(idx, idx + 4)) as TColor
            points.push([x, y, color])
            x += size
        }
        y += size
    }
    return { points, width, height, size, offsetX, offsetY, columns }
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