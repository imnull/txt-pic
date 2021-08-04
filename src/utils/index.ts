import { TMosacData, getFullCharMap } from '../impressionist'

const CHAR_MAP = getFullCharMap()

export const mosaic2lines = (
    mosaicData: TMosacData,
    charMap: { letter: string, value: number }[] = CHAR_MAP
): string[] => {
    const chars = mosaicData.points.map(point => {
        const [r, g, b, a] = point[2].map(v => v / 256)
        const charIndex = g * a * charMap.length >> 0
        const char = charMap[charIndex]
        return char.letter
    })
    const lines: string[] = []
    while(chars.length > 0) {
        lines.push(chars.splice(0, mosaicData.columns).join(''))
    }
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