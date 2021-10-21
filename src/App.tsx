import {Fragment, useEffect} from "react";
import {stores} from "./stores";
import {MidiPortsSelect} from "./components/midi/MidiPortsSelect";
import {AlgorithmsList} from "./components/AlgorithmsList";
import {Algorithm} from "./components/algorithm/Algorithm";
import {Description} from "./components/algorithm/Description";
import Hotkeys from 'react-hot-keys';
import {xyToIndex} from "./model";
import './App.css'

const KEY_PREV = "left";
const KEY_NEXT = "right";

function App() {

    function handleHashChange() {
        console.log("handleHashChange", window.location.hash);
        if (window.location.hash) stores.state.setCurrentAlgorithm(window.location.hash.substring(1));
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

    const handleKeyUp = (keyName, e, handle) => {
        // console.log(keyName, e, handle);
        // e.preventDefault();
        // stores.state.selectPreviousAlgorithm();
        // return false;
    };

    const handleKeyDown = (keyName, e, handle) => {
        console.log(keyName, e, handle);
        // e.preventDefault();
        switch (keyName) {
            case KEY_PREV:
                stores.state.selectPreviousAlgorithm();
                break;
            case KEY_NEXT:
                stores.state.selectNextAlgorithm();
                break;
            case 'enter':
                stores.midi.sendCC(18, xyToIndex(stores.state.currentAlgorithm));
                break;
            default:
                break;
        }
    };

    return (
        <Fragment>
            <Hotkeys
                keyName={`${KEY_PREV},${KEY_NEXT},enter`}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                allowRepeat={true}
            />
            <header>
                <div className="row space-between">
                    <div className="title">
                        A webmidi utility for the Expert Sleepers Disting Mk4
                    </div>
                    <div>
                        v__CLI_VERSION__ by <a href="https://studiocode.dev/" target="_blank" rel="noopener noreferrer">StudioCode.dev</a>
                    </div>
                </div>
                <div className="row space-between align-middle">
                    <MidiPortsSelect />
                    <div className="my-10">Keyboard: LEFT & RIGHT to browse - ENTER to select algorithm</div>
                </div>
            </header>
            <main>
                <div className="left scrollable">
                    <AlgorithmsList />
                </div>
                <div className="middle scrollable">
                    <Algorithm />
                </div>
                <div className="right scrollable">
                    <Description />
                </div>
            </main>
{/*
            <footer>
                Made by StudioCode.dev
            </footer>
*/}
        </Fragment>
    )
}

export default App
