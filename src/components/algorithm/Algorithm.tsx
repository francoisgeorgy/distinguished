import {Name} from "./Name";
import {Parameters} from "./Parameters";
import {Details} from "./Details";
import {Description} from "./Description";
import {IOs} from "./IOs";

export const Algorithm = () => {
    return (
        <div className="algorithm">
            <Name />
            <div className="my-20">
                <button>USE THIS ALGORITHM</button>
            </div>
            <div className="row my-20">
                <div className="mr-20">
                    <IOs />
                    <Parameters />
                </div>
                {/*<AlgorithmDetails />*/}
            </div>
{/*
            <div className="my-20">
                <Description />
            </div>
*/}
        </div>
    );
}
