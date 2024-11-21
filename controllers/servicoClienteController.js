const ServicoClienteModel = require('../models/servicoClienteModel');

class ServicoClienteController {
    // Cadastrar novo serviço de cliente
    static async cadastrar(req, res) {
        try {
            const { id_cliente, id_tipo_servico, usuario } = req.body;

            if (!id_cliente || !id_tipo_servico || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ServicoClienteModel.cadastrarServicoCliente({
                id_cliente,
                id_tipo_servico,
                usuario,
            });

            return res.status(201).json({ message: 'Serviço de cliente cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o serviço de cliente.' });
        }
    }

    // Atualizar serviço de cliente existente
    static async atualizar(req, res) {
        try {
            const { id_servico } = req.params;
            const { id_cliente, id_tipo_servico, usuario } = req.body;

            if (!id_servico || !id_cliente || !id_tipo_servico || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ServicoClienteModel.atualizarServicoCliente(id_servico, {
                id_cliente,
                id_tipo_servico,
                usuario,
            });

            return res.status(200).json({ message: 'Serviço de cliente atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o serviço de cliente.' });
        }
    }

    // Listar todos os serviços de clientes
    static async listar(req, res) {
        try {
            const servicos = await ServicoClienteModel.listarServicosCliente();
            return res.status(200).json(servicos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os serviços de cliente.' });
        }
    }

    // Deletar serviço de cliente
    static async deletar(req, res) {
        try {
            const { id_servico } = req.params;
            const { usuario } = req.body;

            if (!id_servico || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ServicoClienteModel.deletarServicoCliente(id_servico, usuario);
            return res.status(200).json({ message: 'Serviço de cliente deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o serviço de cliente.' });
        }
    }
}

module.exports = ServicoClienteController;
