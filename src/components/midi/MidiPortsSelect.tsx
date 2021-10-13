import React, {FormEvent} from 'react';
import {observer} from "mobx-react-lite";
import {stores} from "../../stores";
import {Port} from "../../stores/midiStore";
import "./MidiPortsSelect.css";

export const MidiPortsSelect = observer(() => {

    function handleInSelection(e: FormEvent<HTMLSelectElement>) {
        e.preventDefault();
        const v = e.currentTarget.value;
        stores.midi.useInput(v);
    }

    function handleOutSelection(e: FormEvent<HTMLSelectElement>) {
        e.preventDefault();
        const v = e.currentTarget.value;
        stores.midi.useOutput(v);
    }

    function portLabel(port: Port): string {
        return port.name;
    }

    // @ts-ignore
    return (
        <div className={`ports-row'}`}>
            <div>
                <span>MIDI input: </span>
                <select onChange={handleInSelection} value={stores.midi.inputInUse} className={stores.midi.inputInUse ? '' : 'bg-warning'}>
                    <option value="">select MIDI input...</option>
                    {Object.entries(stores.midi.inputs).map(([id, port]) => <option key={id} value={port.id}>{portLabel(port)}</option>)}
                </select>
            </div>
            <div>
                <span>MIDI output: </span>
                <select onChange={handleOutSelection} value={stores.midi.outputInUse} className={stores.midi.outputInUse ? '' : 'bg-warning'}>
                    <option value="">select MIDI output...</option>
                    {Object.entries(stores.midi.outputs).map(([id, port]) => <option key={id} value={port.id}>{portLabel(port)}</option>)}
                </select>
            </div>
        </div>
    );

});
