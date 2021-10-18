import {Knob} from "react-svg-knob";
import {PublicKnobSkinType} from "react-svg-knob/dist/skin";

const knobSkin: PublicKnobSkinType = {
    cursor_length: 15,
    font_size: 15,
    font_weight: "normal",
    track_color: "#0075ff",
    cursor_color: "#0075ff"
};

// knob handler
const updatePeriod = (v: number) => {
    //TODO: choice linear/log
    // console.log("updatePeriod", periodRange);
    // knobPosition = v;
    // let lg = logValue(v, KNOB_MIN, KNOB_MAX, pmin, pmax);
    // modulators.setFreq(1 / lg, index);
}

const initialValue = () => {
    return 0;
}

const knobValueFormater = (v: number) => {
    // console.log("knobValueFormater", v);
    // let p = logValue(v, KNOB_MIN, KNOB_MAX, pmin, pmax);
    // return formatPeriod(p);
    return v.toFixed(0);
}

export const ControlKnob = () => {
    return (
        <div style={{"width": "102px"}}>
            <Knob initialValue={initialValue()} onKnobChange={updatePeriod}
                  config={{format: knobValueFormater, value_resolution: 0.01}}
                  skin={knobSkin}/>
        </div>
    );
}