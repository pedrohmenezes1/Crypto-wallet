import * as Yup from 'yup'; // Validação
import moment from 'moment';
import Wallet from '../models/wallet'; // Modelo carteira
import coins from '../models/coins'; // Modelo moeda

class ControllerWallet {
  // Listar todos
  async listWallet(req, res) {
    try {
      const wallet = await Wallet.findAll({
        include: [coins],
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
      const { address, name, cpf, birthdate } = req.body;
      const wallet = await Wallet.create(
        {
          address,
          name,
          cpf,
          birthdate,
        },
        { include: [coins] }
      );
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

  /*  async addCoins(req, res) {
    const { address } = req.params;
    const { coin, amount } = req.body;
    let fullname = req.body;
    const newCoin = { coin, fullname, amount, wallet_address: String(address) };
    try {
      const addCoin = await Coins.create(newCoin);
      if (coin === 'BTC') {
        fullname = 'Bitcoin';
      }
      if (coin === 'ETH') {
        fullname = 'Etherium';
      }
      if (coin === 'BRL') {
        fullname = 'Real';
      }
      if (coin === 'USD') {
        fullname = 'Dolar';
      }
      return res.status(201).send({ addCoin });
    } catch (erro) {
      console.log(erro);
      return res.status(404).send({ error: 'Erro ao adicionar coins' });
    }
  } */
}
export default new ControllerWallet();
