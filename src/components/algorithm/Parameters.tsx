import {observer} from "mobx-react-lite";
import {stores} from "../../stores";
import {ParameterKnob} from "./ParameterKnob";
import "./Parameters.css";
import ALGORITHMS from "../../data/algorithms.json";
import {Fragment} from "react";
import React from "react";
import {ParameterSlider} from "./ParameterSlider";

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
            <div className="Xrow Xwrap">
                {parameters.map((parameter: any, key: number) => {
                    let isKnob = false;
                    let control;
                    if (parameter["values"]) {
                        let options = [];
                        // console.log(parameters["values"], parameters);
                        for (let v of parameter["values"]) {
                            options.push(<option value={v["value"]}>{v["label"]}</option>);
                        }
                        control = <select>{options}</select>;
                    } else {
                        isKnob = parameter["control"].toUpperCase() === "KNOB";
                        if (isKnob) {
                            // control = <ParameterKnob paramNumber={key} min={parameter["min"]} max={parameter["max"]} def={parameter["def"]} />;
                            control = <ParameterSlider paramNumber={key} min={parameter["min"]} max={parameter["max"]} def={parameter["def"]} />;
                        } else {
                            let options = [];
                            for (let v = parameter["min"]; v <= parameter["max"]; v++) {
                                options.push(<option value={v}>{v}</option>);
                            }
                            control = <select>{options}</select>;
                        }
                    }
                    return (
                        <div key={key} className={`parameter row ${isKnob ? 'is-knob' : 'centerV'}`}>
                            <div className="key">{key}</div>
                            {control}
                            <div className="parameter-details">
                                <div>{parameter["name"]}</div>
                                {isKnob &&
                                <div className="row">
                                    <div>{parameter["min"]}...{parameter["max"]}</div>
                                    <div className="ml-20">default {parameter["def"]}</div>
                                </div>}
                            </div>
                        </div>
                    )
                })}
            </div>
            {/*<div className="parameters-grid">*/}
            {/*    <div></div>*/}
            {/*    <div>param</div>*/}
            {/*    <div>min</div>*/}
            {/*    <div>max</div>*/}
            {/*    <div>def</div>*/}
            {/*    {ALGORITHMS[index].parameters.map((parameter: any, key: number) => {*/}
            {/*        return (*/}
            {/*            <React.Fragment key={key}>*/}
            {/*                <div>{key}</div>*/}
            {/*                <div>{parameter["name"]}</div>*/}
            {/*                <div>{parameter["min"]}</div>*/}
            {/*                <div>{parameter["max"]}</div>*/}
            {/*                <div>{parameter["def"]}</div>*/}
            {/*            </React.Fragment>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*     row 1 */}
            {/*</div>*/}
        </div>
    );
});
