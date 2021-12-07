import {observer} from "mobx-react-lite";
import {stores} from "../stores";
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
                    // @ts-ignore
                    const name = ALGORITHMS[index].name;
                    const active = index === stores.state.currentAlgorithm;
                    return (
                        <a id={`selector-${index}`} key={index} href={`#${index}`}
                           className={active ? 'active' : ''}
                           onClick={() => selectAlgorithm(index)}>{index} - {name}</a>
                    );
                })}
            </div>
        </div>
    );

});
