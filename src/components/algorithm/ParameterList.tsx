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
        options.push(<option key={v["value"]} value={v["value"]}>{v["label"]}</option>);
    }

    return (
        <div>
            <select onChange={onChange} defaultValue={def}>
                {options}
            </select>
        </div>
    );

}
