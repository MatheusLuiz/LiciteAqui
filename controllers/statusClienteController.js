const StatusClienteModel = require('../models/statusClienteModel');

class StatusClienteController {
    // Rota para cadastrar um novo status de cliente
    static async cadastrar(req, res) {
        try {
            const { descricao, usuario } = req.body;

            if (!descricao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await StatusClienteModel.cadastrarStatusCliente(descricao, usuario);
            return res.status(201).json({ message: 'Status de cliente cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o status de cliente.' });
        }
    }

    // Rota para atualizar um status de cliente
    static async atualizar(req, res) {
        try {
            const { id_status, descricao, usuario } = req.body;

            if (!id_status || !descricao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await StatusClienteModel.atualizarStatusCliente(id_status, descricao, usuario);
            return res.status(200).json({ message: 'Status de cliente atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o status de cliente.' });
        }
    }

    // Rota para listar status de clientes
    static async listar(req, res) {
        try {
            const statusCliente = await StatusClienteModel.listarStatusCliente();

            if (!statusCliente || statusCliente.length === 0) {
                return res.status(404).json({ message: 'Nenhum status de cliente encontrado.' });
            }

            return res.status(200).json(statusCliente);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os status de cliente.' });
        }
    }

    // Rota para deletar um status de cliente
    static async deletar(req, res) {
        try {
            const { id_status, usuario } = req.body;

            if (!id_status || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await StatusClienteModel.deletarStatusCliente(id_status, usuario);
            return res.status(200).json({ message: 'Status de cliente deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o status de cliente.' });
        }
    }
}

module.exports = StatusClienteController;