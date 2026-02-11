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

## Server

- Server.ts

```
...

import { Cq } from "@cimo/queue/dist/src/Main";

...

post("/api/test1", () => {
    cq.list.push(() => {
        return new Promise((resolve) => {
            ...

            resolve();

            return;
        });
    });

    cq.processSerial();
});

post("/api/test2", () => {
    cq.list.push(() => {
        return new Promise((resolve) => {
            ...

            resolve();

            return;
        });
    });

    cq.processParallel(2);
});

...
```
