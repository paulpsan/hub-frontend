// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url: "miUrlBackend",
  createGitlab:true,
  gitlabAdmin:{
    domain: 'http://gitla.paul.com:30080/api/v4/users',    
    privateToken:"TjcyysBSszxTYFgUFuAP"
  },
  github: {
    domain: "urlGithubOauth",
    clientId: "miClientId", //deafb08eb71ea00e531c
    clientSecret: "miClientSecret", //10fe3d839e76615964b8d52ebfe7219169825f57
    state: "github",
    callbackURL: "callbackDeRespuesta" //http://localhost:4200/inicio
  },
  gitlab: {
    domain: "urlGitlabOauth", //https://gitlab.com/oauth/authorize?client_id=
    clientId: "miClientId", //5fd3c547dbc17e2d3f77a0c81a4fae588d3f31007f626a64489814d3900a315d
    clientSecret: "miClientSecret", //f08b68a537601fa7e0aab9d013c4f312d64adfc8d2967a1445cac741229c0a2f
    state: "gitlab",
    callbackURL: "callbackDeRespuesta" //http://localhost:4200/inicio
  },
  gitlabGeo: {
    domain: "urlGitlabOauth", //https://gitlab.geo.gob.bo/oauth/authorize?client_id=
    clientId: "miClientId", //800b8fdad978c3f6bdd3e6e4ad535748cb38d24863e65218b2b2256e40ef9139
    clientSecret: "miClientSecret", //272f3ddd82f15bb561c9cc34e44bfda2183100d4eb127a63dcc3529c181c1ac9
    state: "gitlab",
    callbackURL: "callbackDeRespuesta" //http://localhost:4200/inicio
  },
  bitbucket: {
    domain: "urlBitbucketOauth", //https://bitbucket.org/site/oauth2/authorize?client_id=
    clientId: "miClientId", //UEp5BUWsGZH9jAE962
    clientSecret: "miClientSecret", //EPQf3yDRYtY5dGFS3BRndWHwTG6M9uMx
    state: "bitbucket",
    callbackURL: "callbackDeRespuesta" //http://localhost:4200/inicio
  }
};
