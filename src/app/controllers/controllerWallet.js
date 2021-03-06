/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
import * as Yup from 'yup'; // Validação
import moment from 'moment';
import { Op } from 'sequelize';
import Wallet from '../models/wallet'; // Modelo carteira
import Transactions from '../models/transactions';
import Coins from '../models/coins';
/* import { axios } from 'axios'; */

/* let cotactions = BASE_URL(
  'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL'
);
cotactions = cotactions.json();
/* let cotaction_dolar = cotactions.USDBRL.bid;
let cotaction_euro = cotactions.EURBRL.bid; */
/* let cotaction_bitcoinbr = cotactions.BTCBRL.bid; */

/* const { data } = axios('https://economia.awesomeapi.com.br/last/BTC-BRL');
const test = data.json();
console.log(test); */

/* const url = axios.get({
  baseURL: 'https://economia.awesomeapi.com.br/last/',
})
 */

class ControllerWallet {
  // Listar todos
  async listWallet(req, res) {
    const {
      name_req,
      cpf_req,
      birthdate_initial,
      birthdate_end,
      amount_req,
      coin_req,
      created_at_initial,
      created_at_end,
      updated_at_inital,
      updated_at_end,
    } = req.query;
    const where = {};
    // Filtrar nome
    name_req ? (where.name_req = {}) : null;
    name_req ? (where.name[Op.eq] = name_req) : null;

    // Filtrar CPF
    cpf_req ? (where.cpf = {}) : null;
    cpf_req ? (where.cpf[Op.eq] = cpf_req) : null;

    // Filtrar por data de nascimento ordem crescente e decrescente
    birthdate_initial || birthdate_end ? (where.birthdate = {}) : null;
    birthdate_initial ? (where.birthdate[Op.gte] = birthdate_initial) : null;
    birthdate_end ? (where.birthdate[Op.lte] = birthdate_end) : null;

    // Filtrar por quantidade
    amount_req ? (where.amount = {}) : null;
    amount_req ? (where.amount[Op.eq] = amount_req) : null;

    // Filtrar por moeda
    coin_req ? (where.coin = {}) : null;
    coin_req ? (where.coin[Op.eq] = coin_req) : null;

    // Filtrar por data de criação ordem crescente e decrescente
    created_at_initial || created_at_end ? (where.created_at = {}) : null;
    created_at_initial ? (where.created_at[Op.gte] = created_at_initial) : null;
    created_at_end ? (where.created_at[Op.lte] = created_at_end) : null;

    // Filtrar por data de atualização ordem crescente e decrescente
    updated_at_inital || updated_at_end ? (where.updated_at = {}) : null;
    updated_at_inital ? (where.updated_at[Op.gte] = updated_at_inital) : null;
    updated_at_end ? (where.updated_at[Op.lte] = updated_at_end) : null;

    try {
      const wallet = await Wallet.findAll({
        where,
        include: [
          {
            model: Coins,
            attributes: ['coin', 'fullname', 'amount'],
            as: 'coins',
            include: [
              {
                model: Transactions,
                attributes: [
                  'value',
                  'datetime',
                  'send_to',
                  'receive_from',
                  'current_cotation',
                ],
                as: 'transactions',
              },
            ],
          },
        ],
      });
      return res.status(200).send({ wallet });
    } catch (erro) {
      console.log(erro);
      return res
        .status(400)
        .send({ error: 'Erro ao carregar lista de carteiras ' });
    }
  }

  async createWallet(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string('Erro: Necessário preencher o campo nome!')
        .required('Erro: Necessário preencher o campo nome!')
        .min(7, 'campo nome tem que ter mais de 7 caracteres'),
      cpf: Yup.string('Erro: Necessário preencher o campo cpf com números!')
        .required('Erro: Necessário preencher o campo cpf!')
        .matches(
          // Regex para validar CPF
          // eslint-disable-next-line no-useless-escape
          /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/
        ),
      birthdate: Yup.string(
        'Erro: Necessário preencher o campo birthdate com uuma data exemplo: 00/00/0000!'
      )
        .required('Erro: Necessário preencher o campo birthdate')
        .test(
          'birthdate',
          'Precisa ser maior que 18 anos!',
          (date) => moment().diff(moment(date, 'DD-MM-YYYY'), 'years') >= 18
        ),
    });

    try {
      await schema.validate(req.body);
    } catch (err) {
      return res.status(400).json({
        erro: true,
        mensagem: err.errors,
      });
    }

    const cpfExists = await Wallet.findOne({
      where: {
        cpf: req.body.cpf,
      },
    });

    if (cpfExists) {
      return res.status(400).json({
        error: 'Cpf já cadastrado',
      });
    }

    try {
      const { name, cpf, birthdate } = req.body;
      const wallet = await Wallet.create({
        name,
        cpf,
        birthdate,
      });
      return res.status(201).json({ wallet });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ error: 'Erro ao registrar uma nova carteira' });
    }
  }

  async listOneWallet(req, res) {
    const { address } = req.params;
    try {
      const wallet = await Wallet.findByPk(address);
      return res.status(200).send({ wallet });
    } catch (erro) {
      return res.status(404).send({ error: 'Erro ao listar uma carteira ' });
    }
  }

  async createCoin(req, res) {
    const { wallet_address } = req.params;
    const newCoin = { ...req.body, wallet_address };

    try {
      const coinss = await Coins.create(newCoin);
      return res.status(200).send({ coinss });
    } catch (erro) {
      console.log(erro);
      return res.status(404).send({ error: 'Erro ao listar uma carteira ' });
    }
  }

  async createTransactions(req, res) {
    const { wallet_address, coin_address } = req.params;
    const { value } = req.body;

    try {
      const transactions = await Transactions.create(
        { value },
        {
          where: {
            wallet_address: String(wallet_address),
            coin_address: String(coin_address),
          },
        }
      );
      return res.status(200).send({ transactions });
    } catch (erro) {
      console.log(erro);
      return res.status(404).send({ error: 'Erro ao listar uma carteira ' });
    }
  }

  async deleteOneWallet(req, res) {
    const { address } = req.params;
    try {
      await Wallet.destroy({ where: { address: String(address) } });
      const message = `Wallet ${address} deleted`;
      return res.status(200).json({ message });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao excluir uma carteira' });
    }
  }

  /*  async addCoins(req, res) {
    const { address, wallet_address } = req.params;
    const getWallet = await Wallet.findByPk(address);

    if (getWallet === null) {
      res.status(404).json({
        message: 'Address not found',
      });
    }
    let { quoteTo, currentCoin, value } = req.body;
    let { coin, fullname_req, amount } = req.body;
    try {
      await Transactions.create(
        { quoteTo, currentCoin, value },
        {
          where: { wallet_address: String(wallet_address) },
        }
      );

      await Transactions.Save();

      if (quoteTo === 'BTC' && currentCoin === 'BRL') {
        value *= cotaction_bitcoinbr;

        coin = 'BTC';
        fullname_req = 'Bitcoin';
        amount = value;
        await Coins.create(
          { coin, fullname_req, amount },
          {
            where: { wallet_address: String(wallet_address) },
          }
        );
        await Coins.Save();
      }
      return res.status(201).send({ coin, fullname_req, amount });
    } catch (erro) {
      console.log(erro);
      return res.status(404).send({ error: 'Erro ao adicionar coins' });
    }
  } */
}
export default new ControllerWallet();
