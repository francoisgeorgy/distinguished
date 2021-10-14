import {observer} from "mobx-react-lite";
import {stores} from "../stores";
import {indexToXY} from "../model";
import HELP_TEXTS from "../data/help-texts.json";

export const AlgorithmDetails = observer(() => {
    // const index = xyToIndex(xy);
    // @ts-ignore
    // console.log(HELP_TEXTS[stores.state.currentAlgorithm.toString()]);
    // @ts-ignore
    const texts = HELP_TEXTS[stores.state.currentAlgorithm.toString()] ?? [];
    return (
        <div className="algorithm-details">
            {texts.map((line: string) => <p>{line}</p>)}
        </div>
    );
});
