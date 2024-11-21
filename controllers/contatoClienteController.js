const ContatoClienteModel = require('../models/contatoClienteModel');

class ContatoClienteController {
    // Cadastrar novo contato de cliente
    static async cadastrar(req, res) {
        try {
            const {
                cliente,
                tipo_telefone,
                ddd,
                telefone,
                nome_completo,
                sexo,
                data_nascimento,
                cpf,
                status_cadastro,
                email,
                usuario,
            } = req.body;

            if (!cliente || !tipo_telefone || !ddd || !telefone || !nome_completo || !sexo || !cpf || !status_cadastro || !email || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ContatoClienteModel.cadastrarContatoCliente({
                cliente,
                tipo_telefone,
                ddd,
                telefone,
                nome_completo,
                sexo,
                data_nascimento,
                cpf,
                status_cadastro,
                email,
                usuario,
            });

            return res.status(201).json({ message: 'Contato cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o contato.' });
        }
    }

    // Atualizar contato de cliente existente
    static async atualizar(req, res) {
        try {
            const { id_contato } = req.params;
            const {
                cliente,
                tipo_telefone,
                ddd,
                telefone,
                nome_completo,
                sexo,
                data_nascimento,
                cpf,
                status_cadastro,
                email,
                usuario,
            } = req.body;

            if (!id_contato || !cliente || !tipo_telefone || !ddd || !telefone || !nome_completo || !sexo || !cpf || !status_cadastro || !email || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ContatoClienteModel.atualizarContatoCliente(id_contato, {
                cliente,
                tipo_telefone,
                ddd,
                telefone,
                nome_completo,
                sexo,
                data_nascimento,
                cpf,
                status_cadastro,
                email,
                usuario,
            });

            return res.status(200).json({ message: 'Contato atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o contato.' });
        }
    }

    // Listar todos os contatos de clientes
    static async listar(req, res) {
        try {
            const contatos = await ContatoClienteModel.listarContatosCliente();
            return res.status(200).json(contatos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os contatos.' });
        }
    }

    // Deletar contato de cliente
    static async deletar(req, res) {
        try {
            const { id_contato } = req.params;
            const { usuario } = req.body;

            if (!id_contato || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await ContatoClienteModel.deletarContatoCliente(id_contato, usuario);
            return res.status(200).json({ message: 'Contato deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o contato.' });
        }
    }
}

module.exports = ContatoClienteController;
