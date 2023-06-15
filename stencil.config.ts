import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'create-elm',
  transformAliasedImportPaths: true,
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
