# Npm_queue
Npm package, queue job. Light, fast and secure.
Writed with native Typescript code and no dependencies are used.

## Pack
1. npm run build
2. Copy the file "/build/package_name-x.x.x.tgz" in the project root folder.
3. In the "package.json" file insert: "@cimo/package_name": "file:package_name-x.x.x.tgz"

## Publish
1. npm run build
2. npm login --auth-type=legacy
3. npm publish --auth-type=legacy --access public

## Installation
1. Link for npm package -> https://www.npmjs.com/package/@cimo/queue

## Reset
1. Delete this from the root:
    - dist
    - node_modules
    - package-lock.json

## Server
- Server.ts
```
...

import { Cq } from "@cimo/queue/dist/src/Main";

...

const cqSerial = new Cq(1);
const cqParallel = new Cq(2);

post("/api/test-1", () => {
    cqSerial.jobList.push({
        id: "job_1",
        callback: () => {
            return new Promise((resolve) => {
                ...

                resolve();

                return;
            });
        }
    });

    cqSerial.process();
});

post("/api/test-2", () => {
    cqParallel.jobList.push({
        id: "job_2",
        callback: () => {
            return new Promise((resolve) => {
                ...

                resolve();

                return;
            });
        }
    });

    cqParallel.process();
});

post("/api/test-3", () => {
    const state = cqSerial.state("job_1");

    const isRemoved = cqSerial.remove("job_1");
});

post("/api/test-4", () => {
    const state = cqParallel.state("job_2");

    const isRemoved = cqParallel.remove("job_2");
});

...
```
