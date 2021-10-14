import {Fragment, useEffect} from "react";
import {stores} from "./stores";
import {MidiPortsSelect} from "./components/midi/MidiPortsSelect";
import {AlgorithmsList} from "./components/AlgorithmsList";
import {AlgorithmDetails} from "./components/AlgorithmDetails";
import { useKeyUp, useKeyDown } from "react-keyboard-input-hook";
import './App.css'

function App() {

    function handleHashChange() {
        stores.state.setCurrentAlgorithm(window.location.hash?.substring(1));
    }

    useEffect(() => {
        window.addEventListener("hashchange", handleHashChange, false);
        // cleanup callback:
        return () => {
            window.removeEventListener("hashchange", handleHashChange, false);
        }
    }, [])

    // @ts-ignore
    const handleKeyUp = ({ keyName }) => {
        console.log("the " + keyName + " was just released!");
        if (stores.state.currentAlgorithm > 0) stores.state.setCurrentAlgorithm(stores.state.currentAlgorithm - 1);
    };

    // @ts-ignore
    const handleKeyDown = ({ keyName }) => {
        console.log("the " + keyName + " was just pressed down!");
        stores.state.setCurrentAlgorithm(stores.state.currentAlgorithm + 1);
    };

    const { keyCode, keyCodeHistory, keyName, keyNameHistory } = useKeyUp();
    useKeyUp(handleKeyUp);
    useKeyDown(handleKeyDown);

    return (
        <Fragment>
            <header className="App-header">
                <div>
                    Distinguished - A webmidi utility for the Expert Sleepers Disting Mk4
                </div>
                <MidiPortsSelect />
            </header>
            <main className="scrollable">
                <div className="left">
                    <AlgorithmsList />
                </div>
                <div className="middle">
                    <AlgorithmDetails />
                </div>
            </main>
            <footer>
                Made by StudioCode.dev
            </footer>
        </Fragment>
    )
}

export default App
