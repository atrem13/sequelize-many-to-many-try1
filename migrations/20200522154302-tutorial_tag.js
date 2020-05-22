'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('tutorial_tag', {
    tutorial_id: Sequelize.INTEGER,
    tag_id: Sequelize.INTEGER,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
   });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tutorial_tag');
  }
};
