import HELP_TEXTS from "../data/help-texts.json";
import ALGO_NAMES from "../data/algo-names.json";
import {indexToXY} from "../model";

export const AlgorithmsList = () => {
    return (
        <div className="presets-list">
            <div>
                {Object.keys(HELP_TEXTS).length} presets
            </div>
            <div>
                {Object.keys(HELP_TEXTS).sort().map((index: string) => {
                    const xy = indexToXY(parseInt(index, 10));
                    // @ts-ignore
                    const name = ALGO_NAMES[xy] ?? '?';
                    // @ts-ignore
                    const texts = HELP_TEXTS[index];
                    return <div>{index} {indexToXY(parseInt(index, 10))}: {name} {texts.length}</div>
                })}
            </div>
        </div>
    );
}
