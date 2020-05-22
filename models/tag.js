'use strict';
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
    name: DataTypes.STRING
  }, {
    tableName:'tags'
  });
  tag.associate = function(models) {
    // associations can be defined here
    tag.belongsToMany(models.tutorial, {
      through:'tutorial_tag',
      as:'tutorials',
      foreignKey:'tag_id'
    });
  };
  return tag;
};