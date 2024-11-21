const LicitacaoModel = require('../models/licitacaoModel');

class LicitacaoController {
    // Cadastrar nova licitação
    static async cadastrar(req, res) {
        try {
            const {
                num_licitacao,
                modalidade,
                orgao,
                portal,
                numero_identificacao,
                status_licitacao,
                objeto,
                cidade,
                estado,
                data_licitacao,
                usuario,
            } = req.body;

            if (!num_licitacao || !modalidade || !orgao || !status_licitacao || !data_licitacao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await LicitacaoModel.cadastrarLicitacao({
                num_licitacao,
                modalidade,
                orgao,
                portal,
                numero_identificacao,
                status_licitacao,
                objeto,
                cidade,
                estado,
                data_licitacao,
                usuario,
            });

            return res.status(201).json({ message: 'Licitação cadastrada com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar a licitação.' });
        }
    }

    // Atualizar licitação existente
    static async atualizar(req, res) {
        try {
            const { id_licitacao } = req.params;
            const {
                num_licitacao,
                modalidade,
                orgao,
                portal,
                numero_identificacao,
                status_licitacao,
                objeto,
                cidade,
                estado,
                data_licitacao,
                usuario,
            } = req.body;

            if (!id_licitacao || !num_licitacao || !modalidade || !orgao || !status_licitacao || !data_licitacao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await LicitacaoModel.atualizarLicitacao(id_licitacao, {
                num_licitacao,
                modalidade,
                orgao,
                portal,
                numero_identificacao,
                status_licitacao,
                objeto,
                cidade,
                estado,
                data_licitacao,
                usuario,
            });

            return res.status(200).json({ message: 'Licitação atualizada com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar a licitação.' });
        }
    }

    // Listar todas as licitações
    static async listar(req, res) {
        try {
            const licitacoes = await LicitacaoModel.listarLicitacoes();
            return res.status(200).json(licitacoes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar as licitações.' });
        }
    }

    // Deletar licitação
    static async deletar(req, res) {
        try {
            const { id_licitacao } = req.params;
            const { usuario } = req.body;

            if (!id_licitacao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await LicitacaoModel.deletarLicitacao(id_licitacao, usuario);
            return res.status(200).json({ message: 'Licitação deletada com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar a licitação.' });
        }
    }
}

module.exports = LicitacaoController;
