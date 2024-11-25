const ClienteModel = require('../models/clienteModel');

class ClienteController {
    // Rota para cadastrar um novo cliente
    static async cadastrar(req, res) {
        try {
            const { cnpj, razao_social, nome_fantasia, status, data_cadastro, usuario } = req.body;

            if (!cnpj || !razao_social || !nome_fantasia || !status || !data_cadastro || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ClienteModel.cadastrarCliente(cnpj, razao_social, nome_fantasia, status, data_cadastro, usuario);
            return res.status(201).json({ message: 'Cliente cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o cliente.' });
        }
    }

    // Rota para atualizar um cliente
    static async atualizar(req, res) {
        try {
            const { id_cliente, cnpj, razao_social, nome_fantasia, status, usuario } = req.body;

            if (!id_cliente || !cnpj || !razao_social || !nome_fantasia || !status || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ClienteModel.atualizarCliente(id_cliente, cnpj, razao_social, nome_fantasia, status, usuario);
            return res.status(200).json({ message: 'Cliente atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o cliente.' });
        }
    }

    // Rota para listar clientes
    static async listar(req, res) {
        try {
            const clientes = await ClienteModel.listarClientes();

            if (!clientes || clientes.length === 0) {
                return res.status(404).json({ message: 'Nenhum cliente encontrado.' });
            }

            return res.status(200).json(clientes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os clientes.' });
        }
    }

    // Rota para deletar um cliente
    static async deletar(req, res) {
        try {
            const { id_cliente, usuario } = req.body;

            if (!id_cliente || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ClienteModel.deletarCliente(id_cliente, usuario);
            return res.status(200).json({ message: 'Cliente deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o cliente.' });
        }
    }
}

module.exports = ClienteController;