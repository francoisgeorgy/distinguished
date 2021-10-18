import {action, makeAutoObservable} from 'mobx';
import {RootStore, stores} from "./index";

export class StateStore {

    stores: RootStore;

    // currentAlgorithm: number = 0;
    currentAlgorithm: string = "A1";

    constructor(stores: RootStore) {
        makeAutoObservable(this, {
            stores: false,
            setCurrentAlgorithm: action
        });
        this.stores = stores;
    }

    setCurrentAlgorithm(index: string) {
        console.log(`setCurrentAlgorithm(${index})`);
        if (index === undefined || index === null || index === '') return;
        // let n;
        // if (typeof num === "string") {
        //     n = parseInt(num);
        //     if (isNaN(n)) {
        //         console.warn("setCurrentAlgorithm: invalid parameter", num, n);
        //     }
        // } else {
        //     n = num;
        // }
        this.currentAlgorithm = index.toUpperCase();
    }

}
