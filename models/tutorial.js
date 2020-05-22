'use strict';
module.exports = (sequelize, DataTypes) => {
  const tutorial = sequelize.define('tutorial', {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT
  }, {
    tableName:'tutorials'
  });
  tutorial.associate = function(models) {
    // associations can be defined here
    tutorial.belongsToMany(models.tag, {
      through:'tutorial_tag',
      as:'tags',
      foreignKey:'tutorial_id'
    });
  };
  return tutorial;
};
