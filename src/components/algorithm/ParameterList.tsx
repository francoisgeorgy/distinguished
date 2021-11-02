import React, {FormEvent} from "react";
import {stores} from "../../stores";

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
        stores.midi.sendCC(paramNumber + 1, v);
    }

    console.log("ParameterList", paramNumber, def, values);

    let options = [];
    for (let v of values) {
        let s;
        if (v["value"] == v["label"]) {     // important to use "==" instead of "===" here.
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
