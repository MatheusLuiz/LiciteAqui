const ClienteModel = require('../models/ClienteModel');

class ClienteController {
    // Cadastrar novo cliente
    static async cadastrar(req, res) {
        try {
            const { cnpj, razao_social, nome_fantasia, status, data_cadastro, usuario } = req.body;

            if (!cnpj || !razao_social || !status || !data_cadastro || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ClienteModel.cadastrarCliente({
                cnpj,
                razao_social,
                nome_fantasia,
                status,
                data_cadastro,
                usuario,
            });

            return res.status(201).json({ message: 'Cliente cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o cliente.' });
        }
    }

    // Atualizar cliente existente
    static async atualizar(req, res) {
        try {
            const { id_cliente } = req.params;
            const { cnpj, razao_social, nome_fantasia, status, usuario } = req.body;

            if (!id_cliente || !cnpj || !razao_social || !status || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ClienteModel.atualizarCliente(id_cliente, {
                cnpj,
                razao_social,
                nome_fantasia,
                status,
                usuario,
            });

            return res.status(200).json({ message: 'Cliente atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o cliente.' });
        }
    }

    // Listar todos os clientes (view geral)
    static async listarTodos(req, res) {
        try {
            const clientes = await ClienteModel.listarClientesAll();
            return res.status(200).json(clientes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os clientes.' });
        }
    }

    // Listar clientes por status
    static async listarPorStatus(req, res) {
        try {
            const { status } = req.params;

            let clientes;
            if (status === 'ativo') {
                clientes = await ClienteModel.listarClientesAtivos();
            } else if (status === 'inativo') {
                clientes = await ClienteModel.listarClientesInativos();
            } else if (status === 'suspenso') {
                clientes = await ClienteModel.listarClientesSuspensos();
            } else {
                return res.status(400).json({ error: 'Status inválido fornecido.' });
            }

            return res.status(200).json(clientes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os clientes.' });
        }
    }

    // Deletar cliente
    static async deletar(req, res) {
        try {
            const { id_cliente } = req.params;
            const { usuario } = req.body;

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
