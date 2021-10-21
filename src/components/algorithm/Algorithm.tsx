import {Name} from "./Name";
import {Parameters} from "./Parameters";
import {Details} from "./Details";
import {Description} from "./Description";
import {IOs} from "./IOs";
import {Midi} from "./Midi";
import {stores} from "../../stores";
import {valueToMIDI, xyToIndex} from "../../model";

export const Algorithm = () => {

    const useIt = () => {
        // stores.midi.sendPC(xyToIndex(stores.state.currentAlgorithm));
        stores.midi.sendCC(18, xyToIndex(stores.state.currentAlgorithm));
    }

    return (
        <div className="algorithm">
            <Name />
            <div className="my-20">
                <button onClick={useIt}>USE THIS ALGORITHM</button>
            </div>
            <div className="Xrow my-20 Xstretch">
                {/*<div className="mr-20">*/}
                    <IOs />
                    <Midi />
                    <Parameters />
                {/*</div>*/}
                {/*<AlgorithmDetails />*/}
            </div>
{/*
            <div className="my-20">
                <Description />
            </div>
*/}
        </div>
    );
}
