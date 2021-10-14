import {makeAutoObservable} from 'mobx';
import {RootStore} from "./index";

export class StateStore {

    stores: RootStore;

    currentAlgorithm: number = -1;

    constructor(stores: RootStore) {
        makeAutoObservable(this, {
            stores: false
        });
        this.stores = stores;
    }

    setCurrentAlgorithm(num: number) {
        this.currentAlgorithm = num;
    }

}
