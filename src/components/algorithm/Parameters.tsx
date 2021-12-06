import {observer} from "mobx-react-lite";
import {stores} from "../../stores";
import ALGORITHMS from "../../data/algorithms.json";
import React from "react";
import {ParameterSlider} from "./ParameterSlider";
import {ParameterList} from "./ParameterList";
import "./Parameters.css";

export const Parameters = observer(() => {
    const index = stores.state.currentAlgorithm;
    // @ts-ignore
    const parameters = ALGORITHMS[index].parameters;
    return (
        <div className="algorithm-parameters my-20">
            <div>
                <h3>Parameters</h3>
            </div>
            {parameters.map((parameter: any, key: number) => {
                let control;
                if (parameter["values"]) {
                    control = <ParameterList paramNumber={key} values={parameter["values"]} def={parameter["def"]} />;
                } else {
                    if (parameter["max"] - parameter["min"] < 6) {
                        const values = [];
                        for (let i=parameter["min"]; i<=parameter["max"]; i++) {
                            values.push({
                                value: i,
                                label: i.toString(10)
                            })
                        }
                        control = <ParameterList paramNumber={key} values={values} def={parameter["def"]} />;
                    } else {
                        control = <ParameterSlider paramNumber={key} min={parameter["min"]} max={parameter["max"]} def={parameter["def"]} />;
                    }
                }
                return (
                    <div key={key} className="parameter row stretch">
                        <div className="key">{key}</div>
                        <div className="grow">{parameter["name"]}</div>
                        {control}
                    </div>
                )
            })}
            <div className="mt-20 line140 text-grey text-small">
                The application can not read the current Disting parameters values.<br />
                Therefore, it shows the default value or the last value you selected if you changed it with the application.
            </div>
            <div className="mt-20 line140 text-grey text-small">
                Always check the official documentation.
            </div>
            <div className="mt-20 line140 text-grey text-small">
                Report any problem by opening a ticket in <a href="https://github.com/francoisgeorgy/distinguished/issues" target="_blank" rel="noopener noreferer">the GitHub project</a>.
            </div>
        </div>
    );
});
