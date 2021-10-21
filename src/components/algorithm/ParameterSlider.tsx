import {valueToMIDI} from "../../model";
import {stores} from "../../stores";
import {FormEvent, useState} from "react";

type ParameterSliderProps = {
    paramNumber: number,
    min: number,
    max: number,
    def: number
}

export const ParameterSlider = ({paramNumber, min, max, def}: ParameterSliderProps) => {

    const [v, setV] = useState(def);

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        const v = parseInt(e.currentTarget.value, 10);
        if (isNaN(v)) {
            console.warn("ParameterSlider.onChange: invalid value", e.currentTarget.value);
            return false;
        }
        setV(v);
        stores.midi.sendCC(paramNumber + 1, valueToMIDI(min, max, v));
    }

    console.log("ParameterSlider", paramNumber, min, max, def);

    return (
        <div className="parameter-slider">
            <div className="span-3-cols">
                <input type="range" min={min} max={max} defaultValue={def} onChange={onChange} />
            </div>
            <div className="param-min">{min}</div>
            <div className="self-justify-center">{v}</div>
            <div className="param-max self-justify-end">{max}</div>
        </div>
    );

}
