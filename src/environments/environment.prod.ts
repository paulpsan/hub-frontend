export const environment = {
  production: true,
  github: {
    domain: "https://github.com/login/oauth/authorize?client_id=",
    clientId: "becb33a39e525721517c",
    clientSecret: "36338cdf7057d2086495a241fa3d053766da55c1",
    state: "hub-software-github",
    callbackURL: "http://localhost:4200/inicio"
  },
  gitlab_geo: {
    domain: "https://gitlab.geo.gob.bo/oauth/authorize?client_id=",
    clientId:
      "68b23d8cc8bdf2e9414f2b486456596bbd23e9d44e1c56c16e91298747b94485",
    clientSecret:
      "99cca0cab45bf79a844763ec81db38e34915cbb8e8a5f6006a097707c4278d5b",
    state: "hub-software-gitlab",
    callbackURL: "http://localhost:4200/inicio"
  }
};
