import {observer} from "mobx-react-lite";
import {stores} from "../../stores";
// import HELP_TEXTS from "../../data/help-texts.json";
import "./IOs.css";
import ALGORITHMS from "../../data/algorithms.json";

export const IOs = observer(() => {
    // const index = xyToIndex(xy);
    // @ts-ignore
    // console.log(HELP_TEXTS[stores.state.currentAlgorithm.toString()]);
    // @ts-ignore
    // const texts = HELP_TEXTS[stores.state.currentAlgorithm.toString()] ?? [];
    const algo = ALGORITHMS[stores.state.currentAlgorithm];
    return (
        <div className="algorithm-ios">
            <h3>Inputs</h3>
            <div className="ios-grid">
                <div className="label">Z</div>
                <div>{algo["Z"]}</div>
                <div className="label">X</div>
                <div>{algo["X"]}</div>
                <div className="label">Y</div>
                <div>{algo["Y"]}</div>
            </div>
            <h3>Outputs</h3>
            <div className="ios-grid">
                <div className="label">A</div>
                <div>{algo["A"]}</div>
                <div className="label">B</div>
                <div>{algo["B"]}</div>
            </div>
        </div>
    );
});
