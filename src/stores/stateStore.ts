import {action, makeAutoObservable} from 'mobx';
import {RootStore, stores} from "./index";

export class StateStore {

    stores: RootStore;

    currentAlgorithm: number = 0;

    constructor(stores: RootStore) {
        makeAutoObservable(this, {
            stores: false,
            setCurrentAlgorithm: action
        });
        this.stores = stores;
    }

    setCurrentAlgorithm(num: number|string) {
        console.log(`setCurrentAlgorithm(${num})`);
        if (num === undefined || num === null || num === '') return;
        let n;
        if (typeof num === "string") {
            n = parseInt(num);
            if (isNaN(n)) {
                console.warn("setCurrentAlgorithm: invalid parameter", num, n);
            }
        } else {
            n = num;
        }
        this.currentAlgorithm = n;
    }

}
