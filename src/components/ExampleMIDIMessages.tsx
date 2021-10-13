import {observer} from "mobx-react-lite";
import {stores} from "../stores";
import {hs} from "../utils/hexstring";

export const ExampleMIDIMessages = observer(() => {
    return (
        <div>
            <h3>MIDI Messages:</h3>
            {stores.midi.messages.map(message => <pre>{hs(message)}</pre>)}
        </div>
)});