// Source
import * as model from "./Model.js";

export default class Manager {
    private countMax: number;
    private countRunning: number;
    private jobRunningList: model.Ijob[];

    jobList: model.Ijob[];

    private jobRunningRemove = (id: string): void => {
        for (let a = 0; a < this.jobRunningList.length; a++) {
            if (this.jobRunningList[a].id === id) {
                this.jobRunningList.splice(a, 1);

                return;
            }
        }
    };

    constructor(countMaxValue: number) {
        this.countMax = countMaxValue;
        this.countRunning = 0;
        this.jobRunningList = [];

        this.jobList = [];
    }

    checkOwner = (owner: string): boolean => {
        for (let a = 0; a < this.jobList.length; a++) {
            if (this.jobList[a].owner === owner) {
                return true;
            }
        }

        for (let a = 0; a < this.jobRunningList.length; a++) {
            if (this.jobRunningList[a].owner === owner) {
                return true;
            }
        }

        return false;
    };

    process = (): void => {
        while (this.countRunning < this.countMax) {
            const jobShift = this.jobList.shift();

            if (!jobShift) {
                return;
            }

            this.countRunning++;

            this.jobRunningList.push(jobShift);

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

        for (let a = 0; a < this.jobRunningList.length; a++) {
            if (this.jobRunningList[a].id === id) {
                return { name: "running", position: 0 };
            }
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
