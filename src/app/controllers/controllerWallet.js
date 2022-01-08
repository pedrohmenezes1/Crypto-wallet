/* eslint-disable prefer-const */
import * as Yup from 'yup'; // Validação
import moment from 'moment';
import { axios } from 'axios';
import Wallet from '../models/wallet'; // Modelo carteira
import Transactions from '../models/transactions';
import Coins from '../models/coins';

/* let cotactions = BASE_URL(
  'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL'
);
cotactions = cotactions.json();
/* let cotaction_dolar = cotactions.USDBRL.bid;
let cotaction_euro = cotactions.EURBRL.bid; */
/* let cotaction_bitcoinbr = cotactions.BTCBRL.bid; */

const { data } = axios.all('https://economia.awesomeapi.com.br/last/BTC-BRL');
const test = data.json();
console.log(test);

class ControllerWallet {
  // Listar todos
  async listWallet(req, res) {
    try {
      const wallet = await Wallet.findAll();
      return res.status(200).send({ wallet });
    } catch (erro) {
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
      const { address, name, cpf, birthdate } = req.body;
      const wallet = await Wallet.create({
        address,
        name,
        cpf,
        birthdate,
      });
      return res.status(201).send({ wallet });
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

  async addCoins(req, res) {
    const { address, wallet_address } = req.params;
    const getWallet = await Wallet.findByPk(address);

    if (getWallet === null) {
      res.status(404).json({
        message: 'Address not found',
      });
    }
    let { quoteTo, currentCoin, value } = req.body;
    let { coin, fullname, amount } = req.body;
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
        fullname = 'Bitcoin';
        amount = value;
        await Coins.create(
          { coin, fullname, amount },
          {
            where: { wallet_address: String(wallet_address) },
          }
        );
        await Coins.Save();
      }
      return res.status(201).send({ coin, fullname, amount });
    } catch (erro) {
      console.log(erro);
      return res.status(404).send({ error: 'Erro ao adicionar coins' });
    }
  }
}
export default new ControllerWallet();
