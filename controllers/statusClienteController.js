const StatusClienteModel = require('../models/statusClienteModel');

class StatusClienteController {
    // Cadastrar novo status de cliente
    static async cadastrar(req, res) {
        try {
            const { descricao, usuario } = req.body;

            if (!descricao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await StatusClienteModel.cadastrarStatusCliente({ descricao, usuario });
            return res.status(201).json({ message: 'Status cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o status.' });
        }
    }

    // Atualizar status de cliente existente
    static async atualizar(req, res) {
        try {
            const { id_status } = req.params;
            const { nova_descricao, usuario } = req.body;

            if (!id_status || !nova_descricao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await StatusClienteModel.atualizarStatusCliente(id_status, { nova_descricao, usuario });
            return res.status(200).json({ message: 'Status atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o status.' });
        }
    }

    // Listar todos os status de clientes
    static async listar(req, res) {
        try {
            const status = await StatusClienteModel.listarStatusClientes();
            return res.status(200).json(status);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os status.' });
        }
    }

    // Deletar status de cliente
    static async deletar(req, res) {
        try {
            const { id_status } = req.params;
            const { usuario } = req.body;

            if (!id_status || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await StatusClienteModel.deletarStatusCliente(id_status, usuario);
            return res.status(200).json({ message: 'Status deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o status.' });
        }
    }
}

module.exports = StatusClienteController;
