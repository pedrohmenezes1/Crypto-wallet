module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Wallet', [
      {
        name: 'Pedro Henrique',

        cpf: '453.004.087-94',

        birthdate: '23/07/1998',

        created_at: new Date(),

        updated_at: new Date(),
      },

      {
        name: 'Ana Souza',

        cpf: '558.118.784-35',

        birthdate: '23/07/1998',

        created_at: new Date(),

        updated_at: new Date(),
      },

      {
        name: 'Paulo Souza',

        cpf: '113.570.008-71',

        birthdate: '23/07/1998',

        created_at: new Date(),

        updated_at: new Date(),
      },

      {
        name: 'Paula Souza',

        cpf: '014.404.142-11',

        birthdate: '23/07/1998',

        created_at: new Date(),

        updated_at: new Date(),
      },

      {
        name: 'Maria Souza',

        cpf: '037.681.806-97',

        birthdate: '23/07/1998',

        created_at: new Date(),

        updated_at: new Date(),
      },
    ]),

  down: (queryInterface) => queryInterface.bulkDelete('Wallet', null, {}),
};
