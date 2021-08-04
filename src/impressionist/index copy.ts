import { getCharMap } from './char-map'
import { drawMosaicDataToContext, getMosaicData } from './mosaic'
import { getImageData, loadImage, putImageData } from './utils'



const charMap = getCharMap('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`1234567890-=[]\\;\',./~!@#$%^&*()_+{}|:"<>?')
console.log(charMap)


const main = async () => {
    const image = await loadImage('./images/logo.png')
    const imageData = getImageData(image)
    const oriCanvas = putImageData(imageData)
    document.body.appendChild(oriCanvas)

    const mosacCanvas = oriCanvas.cloneNode() as HTMLCanvasElement
    const ctx = mosacCanvas.getContext('2d')

    const sizeLoop = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 12, 10, 7, 6, 5, 4, 3, 2, 1]
    let cursor = 0
    setInterval(() => {
        // ctx.clearRect(0, 0, mosacCanvas.width, mosacCanvas.height)
        ctx.save()
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, mosacCanvas.width, mosacCanvas.height)
        cursor = (cursor + 1) % sizeLoop.length
        const mosacData = getMosaicData(imageData, sizeLoop[cursor])
        drawMosaicDataToContext(ctx, mosacData, false)
        ctx.restore()
    }, 100)

    document.body.appendChild(mosacCanvas)
}

main()