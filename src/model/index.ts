import {mapToRange} from "../utils/maths";

export function indexToXY(index: number): string {
    let b = Math.floor(index / 8);
    let i = index % 8 + 1;
    return String.fromCharCode(b + 65) + i.toString();
}

export function xyToIndex(xy: string): number {
    let bank = xy.toUpperCase().charCodeAt(0) - 65;
    let num = parseInt(xy[1], 10);
    return bank * 8 + num - 1;
}

export function formatIndex(index: string, separator = "-") {
    if (index.includes("-")) {
        return index;
    } else {
        return index.substr(0, 1) + separator + index.substr(1);
    }
}

export function valueToMIDI(value: number, min: number, max: number): number {
    // const range = max - min;
    // let cc = (127 * value / range) - (127 * min / range) ;
    // console.log(`min=${min} max=${max} value=${value} midi=${cc}`);
    // return cc;
    return mapToRange(value, min, max, 0, 127);
}
