import {Fragment, useEffect} from "react";
import {stores} from "./stores";
import {MidiPortsSelect} from "./components/midi/MidiPortsSelect";
import {AlgorithmsList} from "./components/AlgorithmsList";
import {AlgorithmDetails} from "./components/AlgorithmDetails";
import { useKeyUp, useKeyDown } from "react-keyboard-input-hook";
import './App.css'
import {AlgorithmControls} from "./components/AlgorithmControls";
import {AlgorithmName} from "./components/AlgorithmName";
import { Algorithm } from "./components/Algorithm";

function App() {

    function handleHashChange() {
        console.log("handleHashChange", window.location.hash);
        stores.state.setCurrentAlgorithm(window.location.hash?.substring(1));
    }

    useEffect(() => {
        window.addEventListener("hashchange", handleHashChange, false);
        // cleanup callback:
        return () => {
            window.removeEventListener("hashchange", handleHashChange, false);
        }
    }, [])

    useEffect(() => {
        console.log("App useEffect", window.location.hash);
        stores.state.setCurrentAlgorithm(window.location.hash?.substring(1));
    }, [])

    // @ts-ignore
    const handleKeyUp = ({ keyName, keyCode, e }) => {
        console.log(keyName, keyCode, e);
        e.PreventDefault();
        if (stores.state.currentAlgorithm > 0) stores.state.setCurrentAlgorithm(stores.state.currentAlgorithm - 1);
        return false;
    };

    // @ts-ignore
    const handleKeyDown = ({ keyName, keyCode, e }) => {
        console.log(keyName, keyCode, e);
        e.PreventDefault();
        stores.state.setCurrentAlgorithm(stores.state.currentAlgorithm + 1);
        return false;
    };

    // const { keyCode, keyCodeHistory, keyName, keyNameHistory } = useKeyUp();
    // useKeyUp(handleKeyUp);
    // useKeyDown(handleKeyDown);

    return (
        <Fragment>
            <header>
                <div className="title">
                    Distinguished - A webmidi utility for the Expert Sleepers Disting Mk4
                </div>
                <MidiPortsSelect />
            </header>
            <main>
                <div className="left scrollable">
                    <AlgorithmsList />
                </div>
                <div className="middle">
{/*
                    <div className="grid1x3">
                        <AlgorithmName />
                        <div className="center centerV">
                            <button>USE THIS ALGORITHM</button>
                        </div>
                        <div></div>
                    </div>
*/}
                    <Algorithm />
                </div>
            </main>
            <footer>
                Made by StudioCode.dev
            </footer>
        </Fragment>
    )
}

export default App
