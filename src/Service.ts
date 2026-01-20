// Source
import * as model from "./Model.js";

let serialIsBusy = false;
let parallelCountRunning = 0;
const parralelMax = 2;

export const queueList: model.Ijob[] = [];

export const processSerial = (): void => {
    if (serialIsBusy) {
        return;
    }

    const job = queueList.shift();

    if (!job) {
        return;
    }

    serialIsBusy = true;

    job().finally(() => {
        serialIsBusy = false;

        processSerial();
    });
};

export const processParallel = (): void => {
    while (parallelCountRunning < parralelMax) {
        const job = queueList.shift();

        if (!job) {
            return;
        }

        parallelCountRunning++;

        job().finally(() => {
            parallelCountRunning--;

            processParallel();
        });
    }
};
