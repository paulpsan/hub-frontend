export const environment = {
  production: true,
  url: 'https://desarrollo.adsib.gob.bo/catalogo/api/',
  createGitlab: false,
  gitlabAdmin: {
    domain: 'http://gitlab.paul.com:30080/api/v4/users',
    privateToken: "TjcyysBSszxTYFgUFuAP"
  },
  github: {
    domain: "https://github.com/login/oauth/authorize?client_id=",
    clientId: "becb33a39e525721517c",
    clientSecret: "36338cdf7057d2086495a241fa3d053766da55c1",
    state: "github",
    callbackURL: "https://desarrollo.adsib.gob.bo/catalogo/inicio"
  },
  gitlab: {
    domain: "https://gitlab.com/oauth/authorize?client_id=",
    clientId:
      "bc4486e353751b8bcbad14732a0d3626bdd9ef259534b7dfc0376c4baa5c75c6",
    clientSecret:
      "9ac3cc5c3c49e10cb14a268158f2b3ffa4c70a8df9a1c22c81d239e4bbce494f",
    state: "gitlab",
    callbackURL: "https://desarrollo.adsib.gob.bo/catalogo/inicio"
  },
  gitlabGeo: {
    domain: "https://gitlab.geo.gob.bo/oauth/authorize?client_id=",
    clientId:
      "5fd3c547dbc17e2d3f77a0c81a4fae588d3f31007f626a64489814d3900a315d",
    clientSecret:
      "f08b68a537601fa7e0aab9d013c4f312d64adfc8d2967a1445cac741229c0a2f",
    state: "gitlabGeo",
    callbackURL: "https://desarrollo.adsib.gob.bo/catalogo/inicio"
  },
  bitbucket: {
    domain: "https://bitbucket.org/site/oauth2/authorize?client_id=",
    clientId: "QV8hxhkL5taXdTpUgB",
    clientSecret: "W64vs8X2f3V3PNZq8EaU3gL4yV8YPAHQ",
    state: "bitbucket",
    callbackURL: "https://desarrollo.adsib.gob.bo/catalogo/inicio"
  }
};
