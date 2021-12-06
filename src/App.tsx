import {Fragment, useEffect, useState} from "react";
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

    const [kbSelection, setKbSelection] = useState<string|null>(null);

    const handleKeyDown = (keyName: string, e: any, handle: any) => {
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
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'e':
            case 'f':
            case 'g':
            case 'h':
            case 'i':
            case 'j':
            case 'k':
            case 'l':
            case 'm':
            case 'n':
                const letter = keyName.toUpperCase();
                setKbSelection(letter);
                // @ts-ignore
                document.getElementById(`selector-${letter}1`).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                if (kbSelection) {
                    stores.state.setCurrentAlgorithm(kbSelection + keyName);
                }
                break;
            default:
                break;
        }
    };

    return (
        <Fragment>
            <Hotkeys
                keyName={`${KEY_PREV},${KEY_NEXT},enter,a,b,c,d,e,f,g,h,i,j,k,l,m,n,1,2,3,4,5,6,7,8`}
                onKeyDown={handleKeyDown}
                allowRepeat={true}
            />
            <header>
                <div className="row space-between">
                    <div className="title">
                        A webmidi browser for the Expert Sleepers Disting Mk4 <span className="font-normal">(fw 4.21)</span>
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
                <div className="left scrollable-visible">
                    <AlgorithmsList />
                </div>
                <div className="middle scrollable-visible">
                    <Algorithm />
                </div>
                <div className="right scrollable-visible">
                    <Description />
                </div>
            </main>
        </Fragment>
    )
}

export default App
