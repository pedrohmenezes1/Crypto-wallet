module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'admin',
  database: 'crypto-wallet',
  define: {
    // Atualização automatica de colunas timestamps e datetime
    timestamps: true,
    // Converte tabelas e colulas camelCase para sublinhado
    underscored: true,
    // Converte nomes de modelo camelCase para sublinhado
    underscoredAll: true,
  },
};
/* Estrutura alternativa de database
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
} */
