import {observer} from "mobx-react-lite";
import {stores} from "../stores";

export const ExampleMIDIDevices = observer(() => {
    return (
        <div>
            <h3>Inputs:</h3>
            <pre>{JSON.stringify(stores.midi.inputs, null, 4)}</pre>
            <h3>Outputs:</h3>
            <pre>{JSON.stringify(stores.midi.outputs, null, 4)}</pre>
        </div>
)});