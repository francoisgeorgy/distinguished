import {observer} from "mobx-react-lite";
import {stores} from "../../stores";
import {ControlKnob} from "../ControlKnob";
import "./Parameters.css";
import ALGORITHMS from "../../data/algorithms.json";
import {Fragment} from "react";
import React from "react";

export const Parameters = observer(() => {
    const index = stores.state.currentAlgorithm;
    return (
        <div className="algorithm-parameters my-20">
            <div>
                <h3>Parameters</h3>
            </div>
            <div className="Xrow Xwrap">
                {ALGORITHMS[index].parameters.map((parameter: any, key: number) => {
                    let isKnob = parameter["control"].toUpperCase() === "KNOB";
                    let control;
                    if (isKnob) {
                        control = <ControlKnob />;
                    } else {
                        let options = [];
                        for (let v = parameter["min"]; v <= parameter["max"]; v++) {
                            options.push(<option value={v}>{v}</option>);
                        }
                        control = <select>{options}</select>;
                    }
                    return (
                        <div key={key} className={`parameter row ${isKnob ? 'is-knob' : ''}`}>
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
