import {action, makeAutoObservable} from 'mobx';
import {RootStore, stores} from "./index";
import {indexToXY, xyToIndex} from "../model";
import ALGORITHMS from "../data/algorithms.json";

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

    algorithmExists(num: number): boolean {
        return ALGORITHMS.hasOwnProperty(indexToXY(num));
    }

    selectPreviousAlgorithm() {
        let num = xyToIndex(this.currentAlgorithm);
        if (num === 0) return;
        while (num > 0) {
            num--;
            if (this.algorithmExists(num)) break;
        }
        this.setCurrentAlgorithm(indexToXY(num));
    }

    selectNextAlgorithm() {
        let num = xyToIndex(this.currentAlgorithm);
        // const max = Object.keys(ALGORITHMS).length;
        const max = xyToIndex("N8");
        while (num < max) {
            num++;
            if (this.algorithmExists(num)) break;
        }
        this.setCurrentAlgorithm(indexToXY(num));
    }

}
