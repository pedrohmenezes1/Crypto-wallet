module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Wallet', {
      address: {
        type: Sequelize.INTEGER,

        allowNull: false,

        autoIncrement: true,

        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(100),

        allowNull: false,
      },

      cpf: {
        type: Sequelize.STRING(14),

        unique: true,

        allowNull: false,
      },

      birthdate: {
        type: Sequelize.STRING(10),

        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,

        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,

        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('Wallet'),
};
