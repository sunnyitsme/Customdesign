import next from 'eslint-config-next';

/* eslint-config-next 16 ships a flat config, so no eslintrc compat shim is
   needed. Its bundled jsx-a11y rules are the point: accessibility regressions
   should fail lint rather than wait for an audit. */
const config = [
  ...next,
  { ignores: ['.next/**', 'node_modules/**', 'test-results/**', 'playwright-report/**', 'shots/**'] },
];

export default config;
