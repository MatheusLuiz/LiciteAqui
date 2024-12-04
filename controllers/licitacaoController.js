// LicitacaoController.js
const LicitacaoModel = require('../models/licitacaoModel');

class LicitacaoController {
    // Rota para cadastrar uma nova licitação
    static async cadastrar(req, res) {
        try {
            const { id_cliente, num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario } = req.body;

            // Validação dos dados obrigatórios
            if (!id_cliente || !num_licitacao || !modalidade || !orgao || !portal || !numero_identificacao || !status_licitacao || !objeto || !cidade || !estado || !data_licitacao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            // Validação do tipo de dado do status_licitacao
            if (typeof status_licitacao !== 'number') {
                return res.status(400).json({ error: 'O status da licitação deve ser um valor numérico.' });
            }

            // Validação do tamanho do estado
            const estadoFormatado = estado.trim();
            if (typeof estadoFormatado !== 'string' || estadoFormatado.length !== 2) {
                return res.status(400).json({ error: 'O estado deve ser um código de 2 caracteres.' });
            }

            const result = await LicitacaoModel.cadastrarLicitacao(id_cliente, num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estadoFormatado, data_licitacao, usuario);
            return res.status(201).json({ message: 'Licitação cadastrada com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar a licitação.' });
        }
    }

    // Rota para atualizar uma licitação
    static async atualizar(req, res) {
        try {
            const { id_licitacao, num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario, id_cliente } = req.body;
            console.log(id_licitacao, num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario, id_cliente);
            if (!id_licitacao || !num_licitacao || !modalidade || !orgao || !portal || !numero_identificacao || !status_licitacao || !objeto || !cidade || !estado || !data_licitacao || !usuario || !id_cliente) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            // Atualizar a licitação
            await LicitacaoModel.atualizarLicitacao(id_licitacao, num_licitacao, modalidade, orgao, portal, numero_identificacao, status_licitacao, objeto, cidade, estado, data_licitacao, usuario, id_cliente);
            
            res.status(200).json({ message: "Licitação atualizada com sucesso" });
        } catch (error) {
            console.error("Erro ao atualizar licitação:", error);
            res.status(500).json({ error: "Erro ao atualizar a licitação." });
        }
    }

    // Rota para listar licitações
    static async listar(req, res) {
        try {
            const licitacoes = await LicitacaoModel.listarLicitacoes();

            if (!licitacoes || licitacoes.length === 0) {
                return res.status(404).json({ message: 'Nenhuma licitação encontrada.' });
            }

            return res.status(200).json(licitacoes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar as licitações.' });
        }
    }

    // Rota para deletar uma licitação
    static async deletar(req, res) {
        try {
            const { num_licitacao, usuario } = req.body;

            if (!num_licitacao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await LicitacaoModel.deletarLicitacao(num_licitacao, usuario);
            return res.status(200).json({ message: 'Licitação deletada com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar a licitação.' });
        }
    }
}

module.exports = LicitacaoController;
