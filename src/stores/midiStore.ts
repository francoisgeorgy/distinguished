import {action, makeAutoObservable} from 'mobx';
import {RootStore} from "./index";
import {SYSEX_END, SYSEX_START} from "../utils/midi";
import {loadPreferences, savePreferences} from "../utils/preferences";

export interface Port {
    id: string;
    name: string;
    connection: WebMidi.MIDIPortConnectionState;
}

export interface Ports {
    [id: string]: Port
}

export class MidiStore {

    stores: RootStore;

    // These two collections will reflect the available MIDI inputs and outputs. We can not directly
    // use the MIDI interface collections because they are not observable.
    inputs: Ports = {};
    outputs: Ports = {};

    inputInUse: string = ""; //WebMidi.MIDIInput[] = [];
    outputInUse: string = ""; //WebMidi.MIDIOutput[] = [];

    // for example, can be deleted:
    messages: Uint8Array[] = [];

    constructor(stores: RootStore) {
        makeAutoObservable(this, {
            stores: false,
            useOutput: action,
            releaseOutput: action,
            updateInputsOutputs: action,
            // for example, can be deleted:
            addMessage: action
        });
        this.stores = stores;
        this.onStateChange = this.onStateChange.bind(this);     // very important
        this.onMidiMessage = this.onMidiMessage.bind(this);     // very important
        this.requestMidi().then(); //.then(r => console.log(r));
    }

    //=============================================================================================

    // for example, can be deleted:
    addMessage(message: WebMidi.MIDIMessageEvent) {
        this.messages.push(message.data);
    }

    //=============================================================================================

    async requestMidi() {
        if (window.MIDI) {
            // console.log("MIDI already setup");
            this.onStateChange();
            return;
        }
        if (navigator.requestMIDIAccess) {
            try {
                const o = await navigator.requestMIDIAccess({sysex: true});
                this.onMIDISuccess(o);
            } catch (e) {
                //TODO: tell the user he has denied access to the MIDI interface.
                // console.warn("MIDI requestMIDIAccess denied", e);
            }
        } else {
            // console.warn("ERROR: navigator.requestMIDIAccess not supported", "#state");
        }
    }

    onMIDISuccess(midiAccess: WebMidi.MIDIAccess) {
        window.MIDI = midiAccess;
        window.MIDI.onstatechange = this.onStateChange;
        this.onStateChange();
    }

    onStateChange(event: WebMidi.MIDIConnectionEvent|null = null) {
        // console.log("MIDI onStateChange", event?.port.type, event?.port.connection, event?.port.name, event?.port.id);
        this.updateInputsOutputs(event);
        this.autoConnectInput();
        this.autoConnectOutput();
    }

    updateInputsOutputs(event: WebMidi.MIDIConnectionEvent|null) {

        if (!window.MIDI) return;

        //
        // INPUTS
        //
        if (event === null || event.port.type === "input") {

            // Check for inputs to remove from the existing array (because they are no longer being reported by the MIDI back-end).
            for (let id of Object.keys(this.inputs)) {
                let remove = true;
                for (let input of window.MIDI.inputs.values()) {    // midi interface list of inputs
                    if (input.id === id) {
                        remove = false;
                        break;
                    }
                }
                if (remove) {
                    delete (this.inputs[id]);
                    this.releaseInput();
                }
            }

            // Inputs to add
            for (let input of window.MIDI.inputs.values()) {
                if (this.inputs.hasOwnProperty(input.id)) {
                    this.inputs[input.id].connection = input.connection;
                    continue;
                }
                // console.log("MIDI add input", this.inputDebugLabel(input.id));
                this.inputs[input.id] = {
                    id: input.id,
                    name: input.name ?? '',
                    connection: input.connection
                };
                input.onmidimessage = this.onMidiMessage;
            }
        }

        //
        // OUTPUTS
        //
        if (event === null || event.port.type === "output") {

            for (let id of Object.keys(this.outputs)) {
                let remove = true;
                for (let output of window.MIDI.outputs.values()) {
                    if (output.id === id) {
                        remove = false;
                        break;
                    }
                }
                if (remove) {
                    delete (this.outputs[id]);
                    this.releaseOutput();
                }
            }

            // Outputs to add
            for (let output of window.MIDI.outputs.values()) {
                if (this.outputs.hasOwnProperty(output.id)) {
                    continue;
                }
                // console.log("MIDI add output", this.outputDebugLabel(output.id));
                this.outputs[output.id] = {
                    id: output.id,
                    name: output.name ?? '',
                    connection: output.connection
                };
            }
        }

    }

    onMidiMessage(message: WebMidi.MIDIMessageEvent) {
        this.addMessage(message);   // for example, can be deleted:
        this.parseMessage(message);
    }

    useInput(id: string) {
        if (this.inputInUse !== id) {   // do we select another device?
            if (this.inputById(id)) {
                // console.log("MIDI useInput: ASSIGN INPUT", this.inputDebugLabel(id));
                this.inputInUse = id;
                savePreferences({input_id: id});
            }
        }
    }

    releaseInput() {
        if (this.inputInUse) {
            const input = this.inputById(this.inputInUse);
            if (input) {
                // console.log("MidiStore.releaseInput: release event handler");
                // @ts-ignore
                // input.onmidimessage = null;
            }
        }
        this.inputInUse = "";
    }

    useOutput(id: string) {
        if (this.outputInUse !== id) {
            if (this.outputById(id)) {
                // console.log("MIDI useOutput: ASSIGN OUTPUT", id);
                this.outputInUse = id;
                savePreferences({output_id: id});
            }
        }
    }

    releaseOutput() {
        this.outputInUse = "";
    }

    autoConnectInput() {
        if (this.inputInUse) return;
        const s = loadPreferences();
        if (s.input_id) {
            this.useInput(s.input_id);
        }
    }

    autoConnectOutput() {
        // console.log(`Midi.autoConnectOutput`);
        if (this.outputInUse) return;
        const s = loadPreferences();
        if (s.output_id) {
            this.useOutput(s.output_id);
        }
    }

    inputById(id: string): WebMidi.MIDIInput | null {
        if (!id) return null;
        // @ts-ignore
        for (let port of window.MIDI.inputs.values()) {
            if (port.id === id) {
                return port;
            }
        }
        return null;
    }

    outputById(id: string): WebMidi.MIDIOutput | null {
        if (!id) return null;
        // @ts-ignore
        for (let port of window.MIDI.outputs.values()) {
            if (port.id === id) {
                return port;
            }
        }
        return null;
    }

    inputDebugLabel(id: string|null) {
        return id ? ('[IN ' + id.substring(0, 5) + ' ' + this.inputById(id)?.name + ']').trim() : '[IN -]';
    }

    outputDebugLabel(id: string|null) {
        return id ? ('[OUT ' + id.substring(0, 5) + ' ' + this.outputById(id)?.name + ']').trim() : '[OUT -]';
    }

    send(messages: Uint8Array, outputId?: string) {
        this.outputById(outputId ?? this.outputInUse)?.send(messages);
    }

    parseMessage(message: WebMidi.MIDIMessageEvent) {
        const data = message.data;
        if (data[0] === SYSEX_START) {
            if (data[data.length-1] !== SYSEX_END) {
                // console.warn("MIDI parseMessage: invalid sysex, missing EOX");
                return;
            }
            // parse sysex message here
        }
    }

}
