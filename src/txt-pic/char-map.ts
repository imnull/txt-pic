const getRate = (data: Uint8ClampedArray) => {
    let c = 0
    for (let i = 0; i < data.length; i += 4) {
        const val = data[i + 3]
        if (val > 0) {
            c += 1
        }
    }
    const C = data.length / 4
    const rate = c / C
    return rate
}

const drawLetterData = (ctx: CanvasRenderingContext2D, letter: string, size: number, fontFamily = 'System') => {
    ctx.clearRect(0, 0, size, size)
    ctx.save()
    ctx.font = `${size}px ${fontFamily}`
    ctx.fillStyle = '#000'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.fillText(letter, size / 2, size / 2)
    const imageData = ctx.getImageData(0, 0, size, size)
    ctx.restore()
    return imageData
}

export const getCharMap = (chars: string, fontFamily = 'System', size = 240) => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    const rateMap: { letter: string, value: number }[] = []

    const letters = chars.split('')
    letters.forEach(letter => {
        const { data } = drawLetterData(ctx, letter, size, fontFamily)
        const rate = getRate(data)
        const val = Math.round(rate * 256)
        const item = rateMap.find(({ value }) => value === val)
        if (!item) {
            rateMap.push({ letter, value: val })
        }
    })

    return rateMap.sort((b, a) => a.value - b.value)
}

export const getFullCharMap = (fontFamily = 'monospace', size = 240) => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const rateMap: { letter: string, value: number }[] = []
    for (let i = 32; i < 128; i++) {
        const letter = String.fromCharCode(i)
        const { data } = drawLetterData(ctx, letter, size, fontFamily)
        const rate = getRate(data)
        const val = Math.round(rate * 256)
        const item = rateMap.find(({ value }) => value === val)
        if (!item) {
            rateMap.push({ letter, value: val })
        }
    }
    return rateMap
        .filter(({ value }) => value > 0)
        .sort((b, a) => a.value - b.value)
}
/*

*/