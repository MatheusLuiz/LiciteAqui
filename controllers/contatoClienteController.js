const ContatoClienteModel = require('../models/contatoClienteModel');

class ContatoClienteController {
    // Rota para cadastrar um novo contato de cliente
    static async cadastrar(req, res) {
        try {
            const { cliente, tipo_telefone, ddd, telefone, nome_completo, sexo, data_nascimento, cpf, status_cadastro, email, usuario } = req.body;

            if (!cliente || !tipo_telefone || !ddd || !telefone || !nome_completo || !sexo || !data_nascimento || !cpf || !status_cadastro || !email || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ContatoClienteModel.cadastrarContatoCliente(cliente, tipo_telefone, ddd, telefone, nome_completo, sexo, data_nascimento, cpf, status_cadastro, email, usuario);
            return res.status(201).json({ message: 'Contato de cliente cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o contato de cliente.' });
        }
    }

    // Rota para atualizar um contato de cliente
    static async atualizar(req, res) {
        try {
            const { id_contato, cliente, tipo_telefone, ddd, telefone, nome_completo, sexo, data_nascimento, cpf, status_cadastro, email, usuario } = req.body;

            if (!id_contato || !cliente || !tipo_telefone || !ddd || !telefone || !nome_completo || !sexo || !data_nascimento || !cpf || !status_cadastro || !email || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ContatoClienteModel.atualizarContatoCliente(id_contato, cliente, tipo_telefone, ddd, telefone, nome_completo, sexo, data_nascimento, cpf, status_cadastro, email, usuario);
            return res.status(200).json({ message: 'Contato de cliente atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o contato de cliente.' });
        }
    }

    // Rota para listar contatos de clientes
    static async listar(req, res) {
        try {
            const contatosClientes = await ContatoClienteModel.listarContatosClientes();

            if (!contatosClientes || contatosClientes.length === 0) {
                return res.status(404).json({ message: 'Nenhum contato de cliente encontrado.' });
            }

            return res.status(200).json(contatosClientes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os contatos de clientes.' });
        }
    }

    // Rota para deletar um contato de cliente
    static async deletar(req, res) {
        try {
            const { id_contato, usuario } = req.body;

            if (!id_contato || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ContatoClienteModel.deletarContatoCliente(id_contato, usuario);
            return res.status(200).json({ message: 'Contato de cliente deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o contato de cliente.' });
        }
    }
}

module.exports = ContatoClienteController;

