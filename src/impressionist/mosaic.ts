import { TMosacData, TMosacPoint } from "./types"
import { traverseSampling, traverseArea } from './traverse'
import { setColor } from './utils'

/**
 * 收集采样点
 * @param image 
 * @param size 
 * @param offset 
 * @returns 
 */
export const getMosaicData = (image: ImageData, size: number, offset: number = 0.5): TMosacData => {
    const { width, height } = image
    const rows = height / size >> 0
    const columns = width / size >> 0
    const points: TMosacPoint[] = []
    traverseSampling(image, ({ x, y, color }) => {
        points.push([x, y, color])
    }, size, offset)
    return { points, width, height, size, columns, rows }
}

/**
 * Mosaic滤镜
 * @param image 图片数据
 * @param size 瓦片尺寸
 * @param offset 采样偏移
 * @returns 
 */
export const filterMosaic = (image: ImageData, size: number, offset: number = 0.5) => {
    // 如果瓦片尺寸小于2，不必处理
    if(size < 2) {
        return image
    }
    // 按瓦片大小遍历和采样
    traverseSampling(image, ({ x, y, color }) => {
        // 基于采样点，对瓦片区域的像素点进行遍历
        traverseArea(image, [x, y, size, size], ({ x, y }, image) => {
            // 将瓦片区域所有像素点设置为采样点颜色
            setColor(color, x, y, image)
        })
    }, size, offset)
    return image
}

/**
 * Mosaic滤镜工厂
 * @param size 瓦片大小
 * @param offset 采样偏移
 * @returns 
 */
export const createMosaicFilter = (size: number, offset: number = 0.5) => (image: ImageData) => {
    return filterMosaic(image, size, offset)
}

