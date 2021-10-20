import {observer} from "mobx-react-lite";
import {stores} from "../../stores";
import ALGORITHMS from "../../data/algorithms.json";
import React from "react";
import "./Midi.css";

export const Midi = observer(() => {
    const index = stores.state.currentAlgorithm;
    // @ts-ignore
    const midi = ALGORITHMS[index]?.midi;
    if (!midi) return null;
    if (!midi["in"] && !midi["out"]) return null;
    console.log(midi);
    return (
        <div className="algorithm-midi my-20">
            <div>
                <h3>MIDI</h3>
            </div>
            <div className="row algorithm-midi-in-out">
                {midi["in"] && <div>Receives MIDI</div>}
                {midi["out"] && <div>Sends MIDI</div>}
            </div>
        </div>
    );
});
