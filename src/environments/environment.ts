// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  github: {
    domain: "https://github.com/login/oauth/authorize?client_id=",
    clientId: "deafb08eb71ea00e531c",
    clientSecret: "10fe3d839e76615964b8d52ebfe7219169825f57",
    state: "hub-software-github",
    callbackURL: "http://localhost:4200/inicio"
  },
  gitlab_geo: {
    domain: "https://gitlab.geo.gob.bo/oauth/authorize?client_id=",
    clientId: "5fd3c547dbc17e2d3f77a0c81a4fae588d3f31007f626a64489814d3900a315d",
    clientSecret: "f08b68a537601fa7e0aab9d013c4f312d64adfc8d2967a1445cac741229c0a2f",
    state: "hub-software-gitlab",
    callbackURL: "http://localhost:4200/inicio"
  }
};
