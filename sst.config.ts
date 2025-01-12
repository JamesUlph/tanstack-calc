/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'calc',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    new sst.aws.TanstackStart('MyWeb', {
      environment: { SECRET: 'IAMASECRET', BASEADDRESS: 'BASEADDRESS' },
    });
  },
});
