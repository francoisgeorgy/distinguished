import HELP_TEXTS from "../data/help-texts.json";
import ALGO_NAMES from "../data/algo-names.json";
import {indexToXY} from "../model";
import {stores} from "../stores";
import {observer} from "mobx-react-lite";

export const AlgorithmsList = observer(() => {

    function selectAlgorithm(index) {
        stores.state.setCurrentAlgorithm(index);
    }

    return (
        <div className="presets-list">
            <div>
                {Object.keys(HELP_TEXTS).length} presets
            </div>
            <div>
                <h2>{stores.state.currentAlgorithm}</h2>
            </div>
            <div>
                {Object.keys(HELP_TEXTS).sort().map((index: string) => {
                    const xy = indexToXY(parseInt(index, 10));
                    // @ts-ignore
                    const name = ALGO_NAMES[xy] ?? '?';
                    // @ts-ignore
                    const texts = HELP_TEXTS[index];
                    return (
                        <div>
                            <a href={`#${index}`} onClick={() => selectAlgorithm(index)}>{index} {indexToXY(parseInt(index, 10))}: {name} {texts.length}</a>
                        </div>);
                })}
            </div>
        </div>
    );
});
