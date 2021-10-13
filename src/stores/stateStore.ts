import {makeAutoObservable} from 'mobx';
import {RootStore} from "./index";

export class StateStore {

    stores: RootStore;

    constructor(stores: RootStore) {
        makeAutoObservable(this, {
            stores: false
        });
        this.stores = stores;
    }

}
