import React, {useEffect, useState} from 'react';
import "./MidiSupportWarning.css";

export const MidiSupportWarning = () => {

    const [supported, setSupported] = useState(true);

    useEffect(() => {
        if (!navigator.requestMIDIAccess) {
            setSupported(false);
        }
    }, []);

    if (supported) return null;
    return (
        <div className="midi-support-warning-top">
            This browser does not support MIDI.
            See <a href="https://webmidi.info/" target="_blank" rel="noreferrer noopener">webmidi.info</a> for a list of browsers that support MIDI.
        </div>
    );

}