import {Fragment, useEffect, useState} from "react";
import {stores} from "./stores";
import {MidiPortsSelect} from "./components/midi/MidiPortsSelect";
import {AlgorithmsList} from "./components/AlgorithmsList";
import {Algorithm} from "./components/algorithm/Algorithm";
import {Description} from "./components/algorithm/Description";
import Hotkeys from 'react-hot-keys';
import {xyToIndex} from "./model";
import './App.css'
import {loadPreferences, savePreferences} from "./utils/preferences";

// https://github.com/vitejs/vite/issues/2139 :
// import Switch from "react-switch";
import S from "react-switch";
// @ts-ignore
const Switch = S.default? S.default: S

const DAY_THEME = 'light';
const NIGHT_THEME = 'dark';
const DEFAULT_THEME = DAY_THEME;

const sunIcon = (
    <svg focusable="false" role="img"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
         style={{position: "absolute", top: "2px", right:"2px"}} height={14} >
        <path fill="yellow"
              d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"
              className=""></path>
    </svg>
);

const moonIcon = (
    <svg focusable="false" role="img"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
         style={{position: "absolute", top: "2px", left:"2px"}} height={14} >
        <path fill="yellow"
              d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"
              className=""></path>
    </svg>
)

const KEY_PREV = "pageup";
const KEY_NEXT = "pagedown";
// const KEY_PREV = "left";
// const KEY_NEXT = "right";

function App() {

    function selectTheme(theme: string) {
        if (theme === "dark") theme = NIGHT_THEME;
        setTheme(theme);
        savePreferences({theme});
    }

    function toggleTheme() {
        selectTheme(theme === NIGHT_THEME ? DAY_THEME : NIGHT_THEME);
    }

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
        const s = loadPreferences();
        selectTheme(s.theme ?? DEFAULT_THEME);
    }, [])

    useEffect(() => {
        stores.state.setCurrentAlgorithm(window.location.hash?.substring(1));
    }, [])

    const [theme, setTheme] = useState<string>(DEFAULT_THEME);

    const [kbSelection, setKbSelection] = useState<string | null>(null);

    const handleKeyDown = (keyName: string, e: any, handle: any) => {
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

    document.documentElement.setAttribute('data-theme', theme);

    return (
        <Fragment>
            <Hotkeys
                keyName={`${KEY_PREV},${KEY_NEXT},enter,a,b,c,d,e,f,g,h,i,j,k,l,m,n,1,2,3,4,5,6,7,8`}
                onKeyDown={handleKeyDown}
                allowRepeat={true}
            />
            <header>
                <div className="row">
                    <div className="title">
                        A simple browser for the Expert Sleepers Disting Mk4 <span
                        className="font-normal">(fw 4.21)</span>
                    </div>
                    <div className="grow align-end mr-10">
                        v__CLI_VERSION__ by <a href="https://studiocode.dev/" target="_blank"
                                               rel="noopener noreferrer">StudioCode.dev</a>
                    </div>
                    <Switch onChange={toggleTheme} checked={theme === NIGHT_THEME} height={18} width={36}
                            uncheckedIcon={sunIcon} checkedIcon={moonIcon}/>
                </div>
                <div className="row space-between align-middle">
                    <MidiPortsSelect/>
                    <div className="my-10 text-secondary">Keyboard: PageUp & PageDown to browse - ENTER to select algorithm
                    </div>
                </div>
            </header>
            <main>
                <div className="left scrollable-visible">
                    <AlgorithmsList/>
                </div>
                <div className="middle scrollable-visible">
                    <Algorithm/>
                </div>
                <div className="right scrollable-visible">
                    <Description/>
                </div>
            </main>
        </Fragment>
    )
}

export default App
