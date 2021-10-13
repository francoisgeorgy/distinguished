import './App.css'
import {MidiPortsSelect} from "./components/midi/MidiPortsSelect";
import {ExampleMIDIDevices} from "./components/ExampleMIDIDevices";
import {ExampleMIDIMessages} from "./components/ExampleMIDIMessages";
import {indexToXY, xyToIndex} from "./model";
import {AlgorithmsList} from "./components/AlgorithmsList";
import {AlgorithmDetails} from "./components/AlgorithmDetails";

function App() {

    return (
        <div className="App">
            <header className="App-header">
                Distinguished - A webmidi utility for the Expert Sleepers Disting Mk4
            </header>
            <div>
                <MidiPortsSelect />
                {/*<ExampleMIDIDevices />*/}
                {/*<ExampleMIDIMessages />*/}
            </div>
            <AlgorithmDetails xy={"A1"} />
            <AlgorithmsList />
        </div>
    )
}

export default App
