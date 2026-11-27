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

const cq = new Cq(2);

post("/api/test-1", () => {
    const isOwnerExists = cq.checkOwner("owner_1");

    if (isOwnerExists) {
        return;
    }

    cq.jobList.push({
        id: "job_1",
        owner: "owner_1",
        callback: () => {
            return new Promise((resolve) => {
                ...

                resolve();

                return;
            });
        }
    });

    cq.process();
});

post("/api/test-2", () => {
    const state = cq.state("job_1");

    const isRemoved = cq.remove("job_1");
});

...
```
