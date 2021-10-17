import {observer} from "mobx-react-lite";
import {stores} from "../stores";
import HELP_TEXTS from "../data/help-texts.json";
import "./AlgorithmConnections.css";

export const AlgorithmConnections = observer(() => {
    // const index = xyToIndex(xy);
    // @ts-ignore
    // console.log(HELP_TEXTS[stores.state.currentAlgorithm.toString()]);
    // @ts-ignore
    const texts = HELP_TEXTS[stores.state.currentAlgorithm.toString()] ?? [];
    return (
        <div className="algorithm-connections">
            <div className="connections-grid">
                <div>Z</div>
                <div>sets the envelope times</div>
                <div>X</div>
                <div>trigger input A</div>
                <div>Y</div>
                <div>trigger input B</div>
                <div>A</div>
                <div>envelope output A</div>
                <div>B</div>
                <div>envelope output B</div>
            </div>
        </div>
    );
});
