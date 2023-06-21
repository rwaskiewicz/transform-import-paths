# transform-import-paths

This repo contains a reproduction case for issues found when using `dist-hydrate-script` || the prerender task, and `transformAliasedImportPaths`.

# testing

this reproduction expects that the location of a built stencil compiler to exist at `~/workspaces/stencil/bin/stencil`.
if your local stencil exists at `~/dev/username/projects/stencil`, update occurences of `~/workspaces` with the parent directory of your stencil repo.

this project contains `build` and `build-local` scripts.
the former will run a build against your local stencil project, the latter against the version of stencil installed by npm.
when running without https://github.com/ionic-team/stencil/pull/4501's PR applied, we expect both to fail.
once https://github.com/ionic-team/stencil/pull/4501 is built, `build` ought to work, while `build-local` continues to fail

likewise, without applying https://github.com/ionic-team/stencil/pull/4501, `npm run prerender` will fail.
upon applying it, `npm run prerender will pass`

## differences from the stencil component starter

```diff
diff --color -r ./package.json /Users/ryan/workspaces/sandbox/stencil-issues/transform-import-paths/package.json
2c2
<   "name": "testprerender",
---
>   "name": "create-elm",
12c12
<   "unpkg": "dist/testprerender/testprerender.esm.js",
---
>   "unpkg": "dist/create-elm/create-elm.esm.js",
22,29c22,29
<     "build": "stencil build --docs",
<     "start": "stencil build --dev --watch --serve",
<     "test": "stencil test --spec --e2e",
<     "test.watch": "stencil test --spec --e2e --watchAll",
<     "generate": "stencil generate"
<   },
<   "dependencies": {
<     "@stencil/core": "^3.0.0"
---
>     "build": "~/workspaces/stencil/bin/stencil build --config stencil.config.ts --prerender --debug",
>     "build-local": "stencil build --config stencil.config.ts --prerender --debug",
>     "prerender": "~/workspaces/stencil/bin/stencil prerender --config stencil.config.ts  ./hydrate/index.js",
>     "start": "~/workspaces/stencil/bin/stencil build --dev --watch --serve",
>     "start-local": "stencil build --dev --watch --serve",
>     "test": "~/workspaces/stencil/bin/stencil test --spec --e2e",
>     "test.watch": "~/workspaces/stencil/bin/stencil test --spec --e2e --watchAll",
>     "generate": "~/workspaces/stencil/bin/stencil generate"
36c36
<     "puppeteer": "^19.5.2"
---
>     "puppeteer": "^20.7.1"
38c38,45
<   "license": "MIT"
---
>   "license": "MIT",
>   "volta": {
>     "node": "20.3.1",
>     "npm": "9.7.1"
>   },
>   "dependencies": {
>     "@stencil/core": "^3.4.0"
>   }
Only in /Users/ryan/workspaces/sandbox/stencil-issues/transform-import-paths: prerender.config.js
Only in /Users/ryan/workspaces/sandbox/stencil-issues/transform-import-paths/src/components: app-root
Only in ./src/components: my-component
diff --color -r ./src/components.d.ts /Users/ryan/workspaces/sandbox/stencil-issues/transform-import-paths/src/components.d.ts
9,21c9
<     interface MyComponent {
<         /**
<           * The first name
<          */
<         "first": string;
<         /**
<           * The last name
<          */
<         "last": string;
<         /**
<           * The middle name
<          */
<         "middle": string;
---
>     interface AppRoot {
25c13
<     interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
---
>     interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
27,29c15,17
<     var HTMLMyComponentElement: {
<         prototype: HTMLMyComponentElement;
<         new (): HTMLMyComponentElement;
---
>     var HTMLAppRootElement: {
>         prototype: HTMLAppRootElement;
>         new (): HTMLAppRootElement;
32c20
<         "my-component": HTMLMyComponentElement;
---
>         "app-root": HTMLAppRootElement;
36,48c24
<     interface MyComponent {
<         /**
<           * The first name
<          */
<         "first"?: string;
<         /**
<           * The last name
<          */
<         "last"?: string;
<         /**
<           * The middle name
<          */
<         "middle"?: string;
---
>     interface AppRoot {
51c27
<         "my-component": MyComponent;
---
>         "app-root": AppRoot;
58c34
<             "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
---
>             "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
diff --color -r ./src/index.html /Users/ryan/workspaces/sandbox/stencil-issues/transform-import-paths/src/index.html
3,13c3,12
<   <head>
<     <meta charset="utf-8" />
<     <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
<     <title>Stencil Component Starter</title>
<
<     <script type="module" src="/build/testprerender.esm.js"></script>
<     <script nomodule src="/build/testprerender.js"></script>
<   </head>
<   <body>
<     <my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>
<   </body>
---
> <head>
>   <meta charset="utf-8">
>   <title>Test Prerender App</title>
>   <link href="/prerender/build/testprerender.css" rel="stylesheet">
>   <script src="/prerender/build/testprerender.esm.js" type="module"></script>
>   <script src="/prerender/build/testprerender.js" nomodule></script>
> </head>
> <body>
>   <app-root></app-root>
> </body>
Only in ./src: index.ts
Only in ./src: utils
diff --color -r ./stencil.config.ts /Users/ryan/workspaces/sandbox/stencil-issues/transform-import-paths/stencil.config.ts
4c4,7
<   namespace: 'testprerender',
---
>   namespace: 'TestPrerender',
>   tsconfig: 'tsconfig.json',
>   transformAliasedImportPaths: true,
>   maxConcurrentWorkers: 0,
7,14c10
<       type: 'dist',
<       esmLoaderPath: '../loader',
<     },
<     {
<       type: 'dist-custom-elements',
<     },
<     {
<       type: 'docs-readme',
---
>       type: 'dist-hydrate-script',
17a14
>       baseUrl: 'https://karma.stenciljs.com/prerender',
18a16,17
>       empty: false,
>       prerenderConfig: 'prerender.config.js',
diff --color -r ./tsconfig.json /Users/ryan/workspaces/sandbox/stencil-issues/transform-import-paths/tsconfig.json
2a3,4
>     // "strict": true,
>     // "alwaysStrict": true,
5a8
>     "resolveJsonModule": true,
6a10,12
>     "forceConsistentCasingInFileNames": true,
>     "jsx": "react",
>     "jsxFactory": "h",
11d16
<     "moduleResolution": "node",
13c18,20
<     "target": "es2017",
---
>     "moduleResolution": "node",
>     "noImplicitAny": true,
>     "noImplicitReturns": true,
16,17c23,33
<     "jsx": "react",
<     "jsxFactory": "h"
---
>     "pretty": true,
>     "target": "es2017",
>     "useUnknownInCatchVariables": true,
>     "baseUrl": ".",
>     "paths": {
>       "@stencil/core": ["../../../stencil/internal"],
>       "@stencil/core/internal": ["../../../stencil/internal"],
> //      "jest": ["./node_modules/jest"]
> //      "@stencil/core": ["@stencil/core"],
> //      "@stencil/core/internal": ["@stencil/core"]
>     }
20,23c36
<     "src"
<   ],
<   "exclude": [
<     "node_modules"
---
>     "src",
```