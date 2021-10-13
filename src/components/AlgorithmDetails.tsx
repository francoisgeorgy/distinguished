import HELP_TEXTS from "../data/help-texts.json";
import {xyToIndex} from "../model";

interface AlgorithmDetailsProps {
    xy: string;
}

export const AlgorithmDetails = ({xy}: AlgorithmDetailsProps) => {
    const index = xyToIndex(xy);
    console.log(index);
    // @ts-ignore
    const texts = HELP_TEXTS[index.toString()];
    return (
        <div className="algorithm-details">
            <h2>{xy}</h2>
            {texts ?? 'no help text found'}
        </div>
    );
}
