import {observer} from "mobx-react-lite";
import {stores} from "../stores";
import "./AlgorithmControls.css";
import {ControlKnob} from "./ControlKnob";

export const AlgorithmControls = observer(() => {
    return (
        <div className="algorithm-controls">
            <div className="controls-grid">
                {/* row 1 */}
                <div>
                    <ControlKnob />
                    Param 0
                </div>
                <div>
                    Param 1
                </div>
                <div>
                    Param 2
                </div>
                {/* row 2 */}
                <div>
                    Param 3
                </div>
                <div>
                    Param 4
                </div>
                <div>
                    Param 5
                </div>
            </div>
        </div>
    );
});
