export function mapToRange(value: number, valueMin: number, valueMax: number, rangeMin: number, rangeMax: number): number {
    const max = valueMax - valueMin;
    const range = rangeMax - rangeMin;
    let r = (range * value / max) - (range * valueMin / max) ;
    // console.log(value, valueMin, valueMax, max, range, r);
    // return Math.round(r);
    return Math.ceil(r);
}