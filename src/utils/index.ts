import { TMosacData, getFullCharMap, TMosacPoint } from '../impressionist'

/**
 * 采样转字符（Green层）
 * @param point 
 * @param charMap 
 * @returns 
 */
export const samp2char_g = (
    point: TMosacPoint, 
    charMap: { letter: string, value: number }[]
) => {
    // 取绿色
    const [, g] = point[2].map(v => v / 256)
    // 换算绿色灰阶到字符灰阶的索引
    const charIndex = g * charMap.length >> 0
    const char = charMap[charIndex]
    return char.letter
}

export const mosaic2lines = (
    mosaicData: TMosacData,
    charMap: { letter: string, value: number }[] = getFullCharMap()
): string[] => {
    const chars = mosaicData.points.map(point => samp2char_g(point, charMap))
    const lines: string[] = []
    while(chars.length > 0) {
        lines.push(chars.splice(0, mosaicData.columns).join(''))
    }
    // console.log(lines.join('\n'))
    return lines
}

export const animationFactory = <T>(cb: (opts?: T) => void, opts?: T) => {
    let stop = false, handle = 0
    const loop = () => {
        cancelAnimationFrame(handle)
        if(stop) {
            return
        }
        cb(opts)
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

/**
 * 像素信息类型
 */
type TPixelInfo = {
    /** 当前像素点色值 [R,G,B,A] */
    color: [number, number, number, number]
    /** 全局索引位置 */
    index: number
    /** 横坐标 */
    x: number
    /** 纵坐标 */
    y: number
    /** 画布宽度 */
    width: number
    /** 画布高度 */
    height: number
}

/**
 * 线性逐点遍历
 * @param imageData 
 * @param cb 
 */
export const traverseImageData = (imageData: ImageData, cb: (color: TPixelInfo) => void) => {
    const { data, width, height } = imageData
    for(let i = 0; i < data.length; i += 4) {
        cb({
            width,
            height,
            index: i,
            color: [data[i], data[i + 1], data[i + 2], data[i + 3]],
            x: i % width,
            y: i / width >> 0,
        })
    }
}

export const traverseImageDataAsXY = (imageData: ImageData, cb: (color: TPixelInfo) => void, step: number = 1) => {
    if(step < 1) {
        step = 1
    }
    const { data, width, height } = imageData
    const rows = height / step >> 0
    const columns = width / step >> 0
    for(let y = 0; y < rows; y++) {
        for(let x = 0; x < columns; x++) {
            /** 像素串行索引 */
            const pixelIdx = width * y + x
            /** 像素数组索引 */
            const index = pixelIdx * 4
            cb({
                width,
                height,
                index,
                color: [data[index], data[index + 1], data[index + 2], data[index + 3]],
                x,
                y,
            })
        }
    }
}