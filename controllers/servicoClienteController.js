const ServicoClienteModel = require('../models/servicoClienteModel');

class ServicoClienteController {
    // Rota para cadastrar um novo serviço de cliente
    static async cadastrar(req, res) {
        try {
            const { id_cliente, id_tipo_servico, usuario } = req.body;

            if (!id_cliente || !id_tipo_servico || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ServicoClienteModel.cadastrarServicoCliente(id_cliente, id_tipo_servico, usuario);
            return res.status(201).json({ message: 'Serviço de cliente cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o serviço de cliente.' });
        }
    }

    // Rota para atualizar um serviço de cliente
    static async atualizar(req, res) {
        try {
            const { id_servico, id_cliente, id_tipo_servico, usuario } = req.body;

            if (!id_servico || !id_cliente || !id_tipo_servico || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ServicoClienteModel.atualizarServicoCliente(id_servico, id_cliente, id_tipo_servico, usuario);
            return res.status(200).json({ message: 'Serviço de cliente atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o serviço de cliente.' });
        }
    }

    // Rota para listar serviços de cliente
    static async listar(req, res) {
        try {
            const servicosCliente = await ServicoClienteModel.listarServicosCliente();

            if (!servicosCliente || servicosCliente.length === 0) {
                return res.status(404).json({ message: 'Nenhum serviço de cliente encontrado.' });
            }

            return res.status(200).json(servicosCliente);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os serviços de cliente.' });
        }
    }

    // Rota para deletar um serviço de cliente
    static async deletar(req, res) {
        try {
            const { id_servico, usuario } = req.body;

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