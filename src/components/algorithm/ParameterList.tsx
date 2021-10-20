import {valueToMIDI} from "../../model";
import {stores} from "../../stores";
import React, {FormEvent} from "react";

type ParameterListProps = {
    paramNumber: number,
    values: any
}

export const ParameterList = ({paramNumber, values}: ParameterListProps) => {

    const onChange = (e: FormEvent<HTMLSelectElement>) => {
        const v = parseInt(e.currentTarget.value, 10);
        if (isNaN(v)) {
            console.warn("ParameterList.onChange: invalid value", e.currentTarget.value);
            return false;
        }
        stores.midi.sendCC(paramNumber + 1, v);
    }

    let options = [];
    for (let v of values) {
        options.push(<option value={v["value"]}>{v["label"]}</option>);
    }

    return (
        <div className="mt-10">
            <select onChange={onChange}>
                {options}
            </select>
        </div>
    );

}
