const dbConf = require('./../database.json');

module.exports = {
  datastores: {
    default: {
      adapter: 'sails-mysql',
      host: dbConf.development.host,
      user: dbConf.development.user,
      password: dbConf.development.password,
      database: dbConf.development.database
    },
  },
};
