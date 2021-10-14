import {observer} from "mobx-react-lite";
import {stores} from "../stores";
import {indexToXY} from "../model";
import ALGO_NAMES from "../data/algo-names.json";

export const AlgorithmName = observer(() => {
    const xy = indexToXY(stores.state.currentAlgorithm);
    // @ts-ignore
    const name = ALGO_NAMES[xy] ?? '?';
    return (
        <h2>{xy} - {name}</h2>
    );
});
