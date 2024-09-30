const repository = require('../repositories/topico-repository.js');

exports.get = async (req, res) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ mensagem: 'Erro ao realizar a consulta.' });
    }
}

exports.post = async (req, res) => {
    res.status(405).send({ mensagem: 'Não é permitido inserir dados nessa tabela.' })
}

exports.put = async (req, res) => {
    res.status(405).send({ mensagem: 'Não é permitido atualizar os dados dessa tabela.' });
}