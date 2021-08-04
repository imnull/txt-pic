import { TPixelInfo } from './types'
import { createPixelInfo } from './utils'

/**
 * 线性遍历
 * @param imageData 图片数据
 * @param cb 回调
 */
export const traverseImageData = (imageData: ImageData, cb: (color: TPixelInfo) => void) => {
    const { data, width } = imageData
    for(let i = 0; i < data.length; i += 4) {
        const idx = i / 4
        cb(createPixelInfo(imageData, idx % width, idx / width >> 0))
    }
}

/**
 * 非线性采样
 * @param imageData 图片数据
 * @param cb 回调
 * @param step 步长
 * @param samplingOffset 采样像素偏移
 */
export const traverseSampling = (
    imageData: ImageData,
    cb: (color: TPixelInfo) => void,
    step: number = 1,
    samplingOffset: number = 0
) => {
    if(step < 1) {
        step = 1
    }
    const { data, width, height } = imageData
    const rows = height / step >> 0
    const columns = width / step >> 0
    for(let Y = 0; Y < rows; Y++) {
        for(let X = 0; X < columns; X++) {
            const info = createPixelInfo(imageData, X * step, Y * step)
            /** 采样偏移量 */
            const sampOffset = step * samplingOffset >> 0
            /** 采样像素位置索引 */
            const sampPixelIdx = width * (info.y + sampOffset) + info.x + sampOffset
            /** 采样像素数组索引 */
            const sampIdx = sampPixelIdx * 4
            /** 采样点颜色重新赋值 */
            info.color = [
                data[sampIdx],
                data[sampIdx + 1],
                data[sampIdx + 2],
                data[sampIdx + 3]
            ]
            cb(info)
        }
    }
}

/**
 * 遍历矩形区域
 * @param imageData 结构化图片数据
 * @param rect 矩形区域 `[x, y, width, height]`
 * @param cb 回调
 */
export const traverseArea = (
    imageData: ImageData,
    rect: [number, number, number, number],
    cb: (color: TPixelInfo, data: ImageData) => void
) => {
    const { width, height } = imageData
    const [X, Y, W, H] = rect
    for(let y = Y; y < Math.min(Y + H, height); y++) {
        for(let x = X; x < Math.min(X + W, width); x++) {
            cb(createPixelInfo(imageData, x, y), imageData)
        }
    }
}