// Source
import * as model from "./Model.js";

let serialIsBusy = false;
let parallelCountRunning = 0;

export const jobList: model.Ijob[] = [];

export const processSerial = (): void => {
    if (serialIsBusy) {
        return;
    }

    const jobShift = jobList.shift();

    if (!jobShift) {
        return;
    }

    serialIsBusy = true;

    jobShift().finally(() => {
        serialIsBusy = false;

        processSerial();
    });
};

export const processParallel = (parralelMax: number): void => {
    while (parallelCountRunning < parralelMax) {
        const jobShift = jobList.shift();

        if (!jobShift) {
            return;
        }

        parallelCountRunning++;

        jobShift().finally(() => {
            parallelCountRunning--;

            processParallel(parralelMax);
        });
    }
};
