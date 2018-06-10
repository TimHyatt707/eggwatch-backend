const Sequelize = require('sequelize');

const sequelize = new Sequelize('eggwatch-db','tim' , null, {
  dialect: 'postgres'
});

const models = {
  Pet: sequelize.import('./pet')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports =  models;