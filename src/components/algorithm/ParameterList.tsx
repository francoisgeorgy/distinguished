import React, {FormEvent} from "react";
import {stores} from "../../stores";
import {valueToMIDI} from "../../model";

type ParameterListProps = {
    paramNumber: number,
    values: any,
    def: number
}

export const ParameterList = ({paramNumber, values, def}: ParameterListProps) => {

    const onChange = (e: FormEvent<HTMLSelectElement>) => {
        const v = parseInt(e.currentTarget.value, 10);
        if (isNaN(v)) {
            console.warn("ParameterList.onChange: invalid value", e.currentTarget.value);
            return false;
        }
        stores.midi.sendCC(paramNumber + 1, valueToMIDI(v, min, max));
    }

    let min = Math.min.apply(Math, values.map((e: any) => e["value"]));
    let max = Math.max.apply(Math, values.map((e: any) => e["value"]));

    // console.log("ParameterList: values, min, max", values, min, max);

    let options = [];
    for (let v of values) {
        let s;
        if (v["value"] == v["label"]) {     // it's important to use "==" instead of "===" here.
            s = v["value"]
        } else {
            s = `${v["value"]}: ${v["label"]}`;
        }
        options.push(<option key={v["value"]} value={v["value"]}>{s}</option>);
    }

    return (
        <div>
            <select onChange={onChange} defaultValue={def}>
                {options}
            </select>
        </div>
    );

}
