import {observer} from "mobx-react-lite";
import {stores} from "../../stores";
import {ParameterKnob} from "./ParameterKnob";
import "./Parameters.css";
import ALGORITHMS from "../../data/algorithms.json";
import {Fragment} from "react";
import React from "react";
import {ParameterSlider} from "./ParameterSlider";
import {ParameterList} from "./ParameterList";

export const Parameters = observer(() => {
    const index = stores.state.currentAlgorithm;
    // @ts-ignore
    const parameters = ALGORITHMS[index].parameters;
    // console.log(parameters);
    return (
        <div className="algorithm-parameters my-20">
            <div>
                <h3>Parameters</h3>
            </div>
            {parameters.map((parameter: any, key: number) => {
                let isKnob = false;
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
                // return (
                //     <div key={key} className="parameter">
                //         <div className="row mb-5" key={key}>
                //             <div className="key">{key} :</div>
                //             <div>{parameter["name"]}</div>
                //             <div className="grow">
                //             {control}
                //             </div>
                //         </div>
                //     </div>
                // )
            })}
            <div className="mt-20 line140 text-grey text-small">
                The application can not read the current Disting parameters values.<br />
                Therefore, it shows the default value or the last value you selected if you changed it with the application.
            </div>
        </div>
    );
});
