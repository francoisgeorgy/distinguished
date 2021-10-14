import './App.css'
import {MidiPortsSelect} from "./components/midi/MidiPortsSelect";
import {ExampleMIDIDevices} from "./components/ExampleMIDIDevices";
import {ExampleMIDIMessages} from "./components/ExampleMIDIMessages";
import {indexToXY, xyToIndex} from "./model";
import {AlgorithmsList} from "./components/AlgorithmsList";
import {AlgorithmDetails} from "./components/AlgorithmDetails";
import {useEffect} from "react";
import {stores} from "./stores";

function App() {

/*
    useEffect(() => {
        const h = window.location.hash;
        console.log("App: hash", h);
        if (h) {
            const index = parseInt(h.substring(1));
            if (!isNaN(index)) stores.state.setCurrentAlgorithm(index);
        }
    }, []);
*/

    function dummy() {
        console.log("hash change");
        const h = window.location.hash;
        console.log("App: hash", h);
        if (h) {
            const index = parseInt(h.substring(1));
            if (!isNaN(index)) stores.state.setCurrentAlgorithm(index);
        }
    }

    useEffect(() => {
        window.addEventListener("hashchange", dummy, false);
    }, [])

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
