import { TColor, TPixelInfo } from "./types"

export const loadImage = (url: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', err => reject(err))
    img.setAttribute('src', url)
})

export const getImageData = (image: HTMLImageElement) => {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    return imageData
}

export const putImageDataToCanvas = (canvas: HTMLCanvasElement, data: ImageData, x: number = 0, y: number = 0) => {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.putImageData(data, x, y)
}

export const putImageData = (data: ImageData) => {
    const canvas = document.createElement('canvas')
    canvas.width = data.width
    canvas.height = data.height
    putImageDataToCanvas(canvas, data, 0, 0)
    return canvas
}

/**
 * 基于数组本身索引修改
 * @param color 
 * @param index 
 * @param array 
 */
export const assignColor = (
    color: TColor,
    index: number,
    array: Uint8ClampedArray
) => {
    const [r, g, b, a] = color
    array[index + 0] = r
    array[index + 1] = g
    array[index + 2] = b
    array[index + 3] = a
}

/**
 * 基于坐标系修改
 * @param color 
 * @param x 
 * @param y 
 * @param image 
 * @returns 
 */
export const setColor = (
    color: TColor,
    x: number,
    y: number,
    image: ImageData
) => {
    const { width, height, data } = image
    if (y < 0 || y >= height || x < 0 || x >= width) {
        return
    }
    const pixelIdx = y * width + x
    const index = pixelIdx * 4
    assignColor(color, index, data)
}

/**
 * 创建像素信息对象
 * @param image 
 * @param x 
 * @param y 
 * @returns 
 */
export const createPixelInfo = (image: ImageData, x: number, y: number) => {
    const { width, height, data } = image
    const pixelIdx = y * width + x
    const index = pixelIdx * 4
    const color: TColor = [
        data[index + 0], data[index + 1],
        data[index + 2], data[index + 3]
    ]
    const info: TPixelInfo = {
        width,
        height,
        index,
        color,
        x,
        y
    }
    return info
}