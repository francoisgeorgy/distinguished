import {observer} from "mobx-react-lite";
import {stores} from "../../stores";
import {formatIndex} from "../../model";
import ALGORITHMS from "../../data/algorithms.json";

export const Name = observer(() => {
    const index = stores.state.currentAlgorithm;
    // @ts-ignore
    const name = ALGORITHMS[index].name;
    return (
        <h2>{formatIndex(index, '')} - {name}</h2>
    );
});
