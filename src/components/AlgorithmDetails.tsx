import {observer} from "mobx-react-lite";
import {stores} from "../stores";
import {indexToXY} from "../model";
import HELP_TEXTS from "../data/help-texts.json";

export const AlgorithmDetails = observer(() => {
    // const index = xyToIndex(xy);
    // console.log(index);
    // @ts-ignore
    const texts = HELP_TEXTS[stores.state.currentAlgorithm.toString()];
    return (
        <div className="algorithm-details">
            <h2>{indexToXY(stores.state.currentAlgorithm)}</h2>
            {texts ?? 'no help text found'}
        </div>
    );
});
