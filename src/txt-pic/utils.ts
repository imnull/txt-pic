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