import {observer} from "mobx-react-lite";
import {stores} from "../../stores";
import {formatIndex, indexToXY} from "../../model";
import ALGORITHMS from "../../data/algorithms.json";
// import ALGO_NAMES from "../../data/algo-names.json";

export const Name = observer(() => {
    const index = stores.state.currentAlgorithm;
    // const xy = indexToXY(stores.state.currentAlgorithm);
    // @ts-ignore
    // const name = ALGO_NAMES[xy] ?? '?';
    const name = ALGORITHMS[index].name;
    return (
        <h2>{formatIndex(index)} - {name}</h2>
    );
});
