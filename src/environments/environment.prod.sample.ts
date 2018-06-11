export const environment = {
  production: true,
  url: "miUrlBackend", //https://test.adsib.gob.bo/api_backend/api/
  github: {
    domain: "urlGithubOauth", //https://github.com/login/oauth/authorize?client_id=
    clientId: "miClientId", //becb33a39e525721517c
    clientSecret: "miClientSecret", //36338cdf7057d2086495a241fa3d053766da55c1
    state: "github",
    callbackURL: "callbackDeRespuesta" //https://test.adsib.gob.bo/softwarelibre/inicio
  },
  gitlab: {
    domain: "urlGitlabOauth", //https://gitlab.com/oauth/authorize?client_id=
    clientId:
      "miClientId", //5fd3c547dbc17e2d3f77a0c81a4fae588d3f31007f626a64489814d3900a315d
    clientSecret:
      "miClientSecret", //f08b68a537601fa7e0aab9d013c4f312d64adfc8d2967a1445cac741229c0a2f
    state: "gitlab",
    callbackURL: "callbackDeRespuesta" //https://test.adsib.gob.bo/softwarelibre/inicio
  },
  gitlabGeo: {
    domain: "urlGitlabOauth", //https://gitlab.geo.gob.bo/oauth/authorize?client_id=
    clientId:
      "miClientId", //5fd3c547dbc17e2d3f77a0c81a4fae588d3f31007f626a64489814d3900a315d
    clientSecret:
      "miClientSecret", //f08b68a537601fa7e0aab9d013c4f312d64adfc8d2967a1445cac741229c0a2f
    state: "gitlab",
    callbackURL: "callbackDeRespuesta" //https://test.adsib.gob.bo/softwarelibre/inicio
  },
  bitbucket: {
    domain: "urlBitbucketOauth", //https://bitbucket.org/site/oauth2/authorize?client_id=
    clientId: "miClientId",
    clientSecret: "miClientSecret", //W64vs8X2f3V3PNZq8EaU3gL4yV8YPAHQ
    state: "bitbucket",
    callbackURL: "callbackDeRespuesta" //http://localhost:4200/inicio
  }
};