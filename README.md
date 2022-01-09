<div align="center">
  <img src="https://user-images.githubusercontent.com/83426602/148666068-d5a1fccf-e630-45e6-b92f-be8234dc5ea3.jpeg" width="600px"  />
 </div>
 
 <div align="center">
 <img src="https://img.shields.io/badge/Status-under%20construction-orange?style=for-the-badge&logo=appveyor"/>
 <img src="https://img.shields.io/badge/Licence-MIT-blue?style=for-the-badge&logo=appveyor"/>
 <img src="https://img.shields.io/badge/JS-ES6-blue?style=for-the-badge&logo=appveyor"/>
 <img src="https://img.shields.io/static/v1?label=Compass&message=UOL&color=7159c1&style=for-the-badge&logo=ghost"/>
 </div>
 
<div align="center">
 <h1 align="center">🤑 Crypto Wallets</h1>
</div>

<!--ts-->
Tabela de conteúdos
=================
   * [Começando](#começando)
   * [Pré-requisitos](#pré-requisitos)
   * [Dependências](#dependências)
   * [Instalação](#instalação)
   * [Rest-Api](#rest-api)
<!--te-->

Começando
=========
API feita com intuito de criar carteiras digitais e adicionar, remover e transferir moedas digitais.

Pré-requisitos
=========

<a href="https://nodejs.org/pt-br/download/" target="_blank"><img align="center" alt="nodeJs" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/nodejs/nodejs-original.svg"></a> NodeJs  

 <a href="https://www.mysql.com/downloads/" target="_blank"><img align="center" alt="mysql" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/mysql/mysql-original.svg"></a> MySQL  
 
 <a href="https://www.postman.com/downloads/" target="_blank"><img align="center" alt="postman" height="30" width="30" src="https://user-images.githubusercontent.com/82064724/147416090-89b4e7a3-2b78-417a-a154-f47940d23e38.png"></a>   Postman  
 
 <a href="https://code.visualstudio.com/download" target="_blank"><img align="center" alt="VsCode" height="25" width="35" src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original.svg"></a> VsCode 
 
 Dependências
 =========
 
 | Nome             | Versão                  |
| :-----------------| :-------------------------|
| Express             |  4.17.2
| Mysql2           |  2.3.3
| Sequelize             |  6.12.4
| Yup             |  0.32.11
| Axios             |  0.24.0
 | Moment          |  2.29.1

 Instalação
 =========
 
 1. Clone este repositório
  ```bash
   git clone https://github.com/pedrohmenezes1/Crypto-wallet
   cd Crypto-wallet
   ```
 2. Instalar o Yarn
  ```bash
  npm install --global yarn
  ```
  ```bash
  yarn --version
  ```
 3. Instalar todas as depedências do projeto
  ```bash
  yarn install
  ```
  4. Editar o arquivo database.js com o seu banco de dados

  ```bash
  ├── Crypto-wallet
  |   ├── src
  |   │   ├── config
  |   │   │   ├── database.js
  ```
  5. Rodando a aplicação
  ```bash
  yarn dev
  ```
  
  Rest Api
  =========
  ### Métodos
  
  Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `POST` | Utilizado para criar uma nova carteira. |

+ 📙: [POST] http://localhost:3000/api/v1/wallet
+ Request (application/json)
+ Body

     ```json
          {
            "name": "fulano da silva",
            "cpf": "732.221.438-20",
            "birthdate": "05/01/2000"
          }

### Resposta

| Código | Descrição |
|---|---|
| `201` | Carteira criada com sucesso (success).|
| `400` | Erro ao registrar uma nova carteira.|

+ Retorno

     ```json
        {
          "address": "123e4567-e89b-12d3-a456-426614174000"
          "name": "fulano da silva",
          "cpf": "732.221.438-20",
          "birthdate": "05/01/2000",
          "createdAt": "2022-01-04T23:24:51.690Z",
          "updatedAt": "2022-01-04T23:24:51.690Z"
         }

| Método | Descrição |
|---|---|
| `GET` | Utilizado para listar todas as carteiras. |

+ 📗: [GET] http://localhost:3000/api/v1/wallet
+ Request (application/json)

### Resposta

| Código | Descrição |
|---|---|
| `200` | (success).|
| `400` | Erro ao carregar lista de carteiras.|

+ Retorno

    ```json
  {
    "wallet": [
      {
        "name": "fulano da silva",
        "cpf": "732.221.438-20",
        "birthdate": "05/01/2000",
        "address": "123e4567-e89b-12d3-a456-42661417401233",
        "coins": [
          {
            "coin": "BTC",
            "fullname": "Bitcoin",
            "amont": 0.10003,
            "transactions": [
              {
                "value": 0.0123110,
                "datetime": "2022-01-04T23:24:51.690Z",
                "sendTo": "123e4567-e89b-12d3-a456-42661417401233",
                "receiveFrom": "123e4567-e89b-12d3-a456-42661417401233",
                "currentCotation": 0.0123
                }
              ]
            },
            
| Método | Descrição |
|---|---|
| `GET` | Utilizado para listar uma determinada carteira. |

+ 📗: [GET] http://localhost:3000/api/v1/wallet/:address
+ Request (application/json)

### Resposta

| Código | Descrição |
|---|---|
| `200` | (success).|
| `400` | Erro ao listar uma carteira.|

+ Retorno
    ```json
  {
    "name": "fulano da silva",
    "cpf": "732.221.438-20",
    "birthdate": "05/01/2000",
    "address": "123e4567-e89b-12d3-a456-42661417401233",
    "coins": [
      {
        "coin": "BTC",
        "fullname": "Bitcoin",
        "amont": 0.110002,
        "transactions": [
          {
            "value": 0.0123110,
            "datetime": "2022-01-04T23:24:51.690Z",
             "sendTo": "123e4567-e89b-12d3-a456-42661417401233",
            "receiveFrom": "123e4567-e89b-12d3-a456-42661417401233",
            "currentCotation": 0.0123
          }
        ]
      }
     ]
     "createdAt": "2022-01-04T23:24:51.690Z",
     "updatedAt": "2022-01-07T23:24:51.690Z"
    }

<div align="center">
  <img src="https://user-images.githubusercontent.com/83426602/148673032-78ed82b0-7074-417d-9da5-c183eb915789.gif" width="600px"  />
 </div>
