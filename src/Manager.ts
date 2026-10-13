// Source
import * as model from "./Model.js";

export default class Manager {
    private countMax: number;
    private countRunning: number;
    private jobRunningList: string[];

    jobList: model.Ijob[];

    private jobRunningRemove = (id: string): void => {
        const index = this.jobRunningList.indexOf(id);

        if (index !== -1) {
            this.jobRunningList.splice(index, 1);
        }
    };

    constructor(countMaxValue: number) {
        this.countMax = countMaxValue;
        this.countRunning = 0;
        this.jobRunningList = [];

        this.jobList = [];
    }

    process = (): void => {
        while (this.countRunning < this.countMax) {
            const jobShift = this.jobList.shift();

            if (!jobShift) {
                return;
            }

            this.countRunning++;

            this.jobRunningList.push(jobShift.id);

            jobShift.callback().finally(() => {
                this.jobRunningRemove(jobShift.id);

                this.countRunning--;

                this.process();
            });
        }
    };

    state = (id: string): model.Istate => {
        for (let a = 0; a < this.jobList.length; a++) {
            if (this.jobList[a].id === id) {
                return { name: "queued", position: a + 1 };
            }
        }

        if (this.jobRunningList.indexOf(id) !== -1) {
            return { name: "running", position: 0 };
        }

        return { name: "", position: 0 };
    };

    remove = (id: string): boolean => {
        for (let a = 0; a < this.jobList.length; a++) {
            if (this.jobList[a].id === id) {
                this.jobList.splice(a, 1);

                return true;
            }
        }

        return false;
    };
}
