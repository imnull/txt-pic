/** RGBA颜色 */
export type TColor = [number, number, number, number]

/**
 * 像素信息类型
 */
export type TPixelInfo = {
    /** 当前像素点色值 [R,G,B,A] */
    color: TColor
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

export type TMosacPoint = [number, number, TColor]
export type TMosacData = {
    width: number, height: number,
    size: number,
    points: TMosacPoint[],
    columns: number,
    rows: number,
}