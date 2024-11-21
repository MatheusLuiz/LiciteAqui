const StatusLicitacaoModel = require('../models/statusLicitacaoModel');

class StatusLicitacaoController {
    // Cadastrar novo status de licitação
    static async cadastrar(req, res) {
        try {
            const { nome_status, usuario } = req.body;

            if (!nome_status || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await StatusLicitacaoModel.cadastrarStatusLicitacao({ nome_status, usuario });
            return res.status(201).json({ message: 'Status de licitação cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o status de licitação.' });
        }
    }

    // Atualizar status de licitação existente
    static async atualizar(req, res) {
        try {
            const { id_status } = req.params;
            const { nome_status, usuario } = req.body;

            if (!id_status || !nome_status || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await StatusLicitacaoModel.atualizarStatusLicitacao(id_status, { nome_status, usuario });
            return res.status(200).json({ message: 'Status de licitação atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o status de licitação.' });
        }
    }

    // Listar todos os status de licitação
    static async listar(req, res) {
        try {
            const status = await StatusLicitacaoModel.listarStatusLicitacao();
            return res.status(200).json(status);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os status de licitação.' });
        }
    }

    // Deletar status de licitação
    static async deletar(req, res) {
        try {
            const { id_status } = req.params;
            const { usuario } = req.body;

            if (!id_status || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await StatusLicitacaoModel.deletarStatusLicitacao(id_status, usuario);
            return res.status(200).json({ message: 'Status de licitação deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o status de licitação.' });
        }
    }
}

module.exports = StatusLicitacaoController;
