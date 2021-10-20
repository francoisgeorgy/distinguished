import {Knob} from "react-svg-knob";
import {PublicKnobSkinType} from "react-svg-knob/dist/skin";
import {valueToMIDI} from "../../model";
import {stores} from "../../stores";

const knobSkin: PublicKnobSkinType = {
    cursor_length: 15,
    font_size: 15,
    font_weight: "normal",
    track_color: "#0075ff",
    cursor_color: "#0075ff"
};

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

export const ParameterKnob = ({paramNumber, min, max, def}: KnobProps) => {

    const onChange = (v: number) => {
        stores.midi.sendCC(paramNumber + 1, valueToMIDI(min, max, v));
    }

    return (
        <div style={{"width": "102px"}} className="parameter-knob">
            <Knob initialValue={initialValue()} onKnobChange={onChange}
                  config={{format: knobValueFormater, value_resolution: 0.01, value_min: min, value_max: max}}
                  skin={knobSkin}/>
        </div>
    );

}