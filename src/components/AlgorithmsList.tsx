import {observer} from "mobx-react-lite";
import {stores} from "../stores";
import {indexToXY} from "../model";
import HELP_TEXTS from "../data/help-texts.json";
import ALGO_NAMES from "../data/algo-names.json";

export const AlgorithmsList = observer(() => {

    function selectAlgorithm(index: number) {
        stores.state.setCurrentAlgorithm(index);
    }

    return (
        <div className="presets-list">
            <h2>
                Algorithms
            </h2>
            <div>
                {Object.keys(HELP_TEXTS).map(s => parseInt(s, 10)).sort((a, b) => a-b).map((num: number) => {
                    // const num = parseInt(index, 10);
                    // if (isNaN(num)) {
                    //     console.warn("AlgorithmList: invalid index", index);
                    //     return null;
                    // }
                    const xy = indexToXY(num);
                   // @ts-ignore
                    const name = ALGO_NAMES[xy] ?? '?';
                    // @ts-ignore
                    const texts = HELP_TEXTS[num.toString(10)];
                    return (
                        <div>
                            <a href={`#${num}`}>{xy} - {name}</a>
                            {/*<a href={`#${index}`} onClick={() => selectAlgorithm(num)}>{xy} - {name}</a>*/}
                        </div>);
                })}
            </div>
        </div>
    );
});
