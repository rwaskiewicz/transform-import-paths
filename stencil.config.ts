import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'TestPrerender',
  tsconfig: 'tsconfig.json',
  transformAliasedImportPaths: true,
  maxConcurrentWorkers: 0,
  outputTargets: [
    {
      type: 'dist-hydrate-script',
    },
    {
      type: 'www',
      baseUrl: 'https://karma.stenciljs.com/prerender',
      serviceWorker: null, // disable service workers
      empty: false,
      prerenderConfig: 'prerender.config.js',
    },
  ],
};
