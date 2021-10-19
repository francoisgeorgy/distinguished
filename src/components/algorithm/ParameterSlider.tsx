import {valueToMIDI} from "../../model";
import {stores} from "../../stores";

const initialValue = () => {
    return 0;
}

const knobValueFormater = (v: number) => {
    // console.log("knobValueFormater", v);
    // let p = logValue(v, KNOB_MIN, KNOB_MAX, pmin, pmax);
    // return formatPeriod(p);
    return v.toFixed(0);
}

type KnobProps = {
    paramNumber: number,
    min: number,
    max: number,
    def: number
}

export const ParameterSlider = ({paramNumber, min, max, def}: KnobProps) => {

    const onChange = (v: number) => {
        // console.log("onChange", paramNumber, valueToMIDI(min, max, v), v, min, max);
        stores.midi.sendCC(paramNumber + 1, valueToMIDI(min, max, v));
    }

    return (
        <div className="parameter-slider">
            <input type="range" min={min} max={max} />
        </div>
    );
}