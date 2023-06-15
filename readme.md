Be sure the paths in package.json and tsconfig.json#paths are correct

Oh! So it's `h` vs `hAsync` (search `Hello World` in `hydrate/index.js`, toggling the transform flag).
That means we can trace this(?) back to just `dist-hydrate-script`?
If so, what transformers do we apply? /Users/ryan/workspaces/stencil/src/compiler/output-targets/dist-hydrate-script/bundle-hydrate-factory.ts