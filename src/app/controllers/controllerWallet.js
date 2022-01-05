import Wallet from '../models/wallet'; // Modelos

class ControllerWallet {
  async listWallet(req, res) {
    try {
      const listingWallet = await Wallet.findAll({
        attributes: [
          'address',
          'name',
          'cpf',
          'birthdate',
          'created_at',
          'updated_at',
        ],
      });
      return res.status(200).send({ listingWallet });
    } catch (erro) {
      console.log(erro);
      return res
        .status(400)
        .send({ error: 'Erro ao carregar lista de carteiras ' });
    }
  }
}
export default new ControllerWallet();
