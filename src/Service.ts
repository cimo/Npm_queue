// Source
import * as model from "./Model.js";

let serialIsBusy = false;
let parallelCountRunning = 0;

export const list: model.Ijob[] = [];

export const processSerial = (): void => {
    if (serialIsBusy) {
        return;
    }

    const job = list.shift();

    if (!job) {
        return;
    }

    serialIsBusy = true;

    job().finally(() => {
        serialIsBusy = false;

        processSerial();
    });
};

export const processParallel = (parralelMax: number): void => {
    while (parallelCountRunning < parralelMax) {
        const job = list.shift();

        if (!job) {
            return;
        }

        parallelCountRunning++;

        job().finally(() => {
            parallelCountRunning--;

            processParallel(parralelMax);
        });
    }
};
