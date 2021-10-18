import {observer} from "mobx-react-lite";
import {stores} from "../stores";
import {indexToXY} from "../model";
// import HELP_TEXTS from "../data/help-texts.json";
// import ALGO_NAMES from "../data/algo-names.json";
import ALGORITHMS from "../data/algorithms.json";
import "./AlgorithmsList.css";

export const AlgorithmsList = observer(() => {

    function selectAlgorithm(index: string) {
        stores.state.setCurrentAlgorithm(index);
        return false;
    }

    return (
        <div className="presets-list">
            <h2>
                Algorithms
            </h2>
            <div className="presets-list-items">
                {Object.keys(ALGORITHMS).sort().map((index: string) => {
                    // const num = parseInt(index, 10);
                    // if (isNaN(num)) {
                    //     console.warn("AlgorithmList: invalid index", index);
                    //     return null;
                    // }
                    // const xy = indexToXY(num);
                   // @ts-ignore
                   //  const name = ALGO_NAMES[xy] ?? '?';
                    // @ts-ignore
                    // const texts = HELP_TEXTS[num.toString(10)];
                    // @ts-ignore
                    const name = ALGORITHMS[index].name;
                    return (
                            <a key={index} href={`#${index}`} onClick={() => selectAlgorithm(index)}>{index} - {name}</a>
                        );
                })}
            </div>
        </div>
    );
});
