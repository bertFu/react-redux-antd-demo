var extend = require('node.extend');

var env = process.env.NODE_ENV; // development or test or production

if (!env) {//默认赋值
  env = "development";
}

if (env != 'development' && env != 'test' && env != 'production') {//避免特殊情况
  env = "development";
}

var settings = {
  base: {
    appName: "ShouLou",
    port: 4000,
    tokenExpiresIn: '1days',
    tokenIssuer: 'server',
    tokenAudience: 'client',
    tokenSubject: 'shoulou'
  },
  development: {
    agUrl: 'http://112.74.143.61:8081/v1/',
    token: 'DTuuuvdWNqENxCd2Af57',
    appID: 'ICECAIUI-C9A1-4DBF-9972-B21DA0CFEFC4',
    agTimeout: 20000,
    logLevel: 'TRACE'
  },
  test: {
    agUrl: 'http://112.74.143.61:8081/v1/',
    token: 'DTuuuvdWNqENxCd2Af57',
    appID: 'ICECAIUI-C9A1-4DBF-9972-B21DA0CFEFC4',
    agTimeout: 20000,
    logLevel: 'INFO'
  },
  production: {
    agUrl: 'http://112.74.143.61:8081/v1/',
    token: 'DTuuuvdWNqENxCd2Af57',
    appID: 'ICECAIUI-C9A1-4DBF-9972-B21DA0CFEFC4',
    agTimeout: 10000,
    logLevel: 'INFO'
  }
};

var c = settings[env];
module.exports = extend(settings.base, c);
