import {AlgorithmName} from "./AlgorithmName";
import {AlgorithmControls} from "./AlgorithmControls";
import {AlgorithmDetails} from "./AlgorithmDetails";
import {AlgorithmConnections} from "./AlgorithmConnections";
import {AlgorithmDescription} from "./AlgorithmDescription";

export const Algorithm = () => {
    return (
        <div className="algorithm">
            <AlgorithmName />
            <div className="my-20">
                <button>USE THIS ALGORITHM</button>
            </div>
            <div className="row my-20">
                <div className="mr-20">
                    <AlgorithmConnections />
                    <AlgorithmControls />
                </div>
                {/*<AlgorithmDetails />*/}
            </div>
            <div className="my-20">
                <AlgorithmDescription />
            </div>
        </div>
    );
}