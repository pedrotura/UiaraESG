const repository = require('../repositories/respondente-repository.js');

exports.get = async (req, res) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ mensagem: 'Erro ao realizar a consulta.' });
    }
}

exports.post = async (req, res) => {
    try {
        await repository.create(req.body);
        return res.status(201).send({ mensagem: 'Valor inserido com sucesso.' });
    } catch (err) {
        res.status(500).send({ mensagem: 'Erro ao inserir valor.' });
    }
}

exports.put = async (req, res) => {
    try {
        const id = req.params.id;
        await repository.update(id, req.body);
        return res.status(204).send({ mensagem: 'Valor atualizado com sucesso.' });
    } catch (err) {
        res.status(500).send({ mensagem: 'Erro ao atualizar valor.' });
    }
}