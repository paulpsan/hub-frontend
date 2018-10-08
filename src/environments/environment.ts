// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url: 'http://localhost:3000/api/',
  createGitlab: true,
  gitlabAdmin: {
    domain: 'http://gitlab.dev.com:30081',
    privateToken: "5ogBVMDPzuyyzfaVv7Zz"
  },
  github: {
    domain: 'https://github.com/login/oauth/authorize?client_id=',
    clientId: 'deafb08eb71ea00e531c',
    clientSecret: '10fe3d839e76615964b8d52ebfe7219169825f57',
    state: 'github',
    callbackURL: 'http://localhost:4200/auth/importar'
  },
  gitlab: {
    domain: 'https://gitlab.com/oauth/authorize?client_id=',
    clientId:
      '68b23d8cc8bdf2e9414f2b486456596bbd23e9d44e1c56c16e91298747b94485',
    clientSecret:
      '99cca0cab45bf79a844763ec81db38e34915cbb8e8a5f6006a097707c4278d5b',
    state: 'gitlab',
    callbackURL: 'http://localhost:4200/auth/importar'
  },
  gitlabGeo: {
    domain: 'https://gitlab.geo.gob.bo/oauth/authorize?client_id=',
    clientId:
      '800b8fdad978c3f6bdd3e6e4ad535748cb38d24863e65218b2b2256e40ef9139',
    clientSecret:
      '272f3ddd82f15bb561c9cc34e44bfda2183100d4eb127a63dcc3529c181c1ac9',
    state: 'gitlabGeo',
    callbackURL: 'http://localhost:4200/auth/importar'
  },
  bitbucket: {
    domain: 'https://bitbucket.org/site/oauth2/authorize?client_id=',
    clientId: 'UEp5BUWsGZH9jAE962',
    clientSecret: 'EPQf3yDRYtY5dGFS3BRndWHwTG6M9uMx',
    state: 'bitbucket',
    callbackURL: 'http://localhost:4200/auth/importar'
  }
};
