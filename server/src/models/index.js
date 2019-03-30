import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.TEST_DB || 'dikidi', 'dikidi', '', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  host: process.env.DB_HOST || 'localhost',
  define: {
    underscored: true,
  },
});

sequelize.authenticate();

const models = {
  User: sequelize.import('./user.model.js'),
  Account: sequelize.import('./account.model.js'),
  Studio: sequelize.import('./studio.model.js'),
  Option: sequelize.import('./option.model.js'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;