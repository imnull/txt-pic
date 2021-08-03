export type TColor = [number, number, number, number]
export type TMosacPoint = [number, number, TColor]
export type TMosacData = {
    width: number, height: number,
    size: number,
    points: TMosacPoint[],
    offsetX: number, offsetY: number,
    columns: number,
}