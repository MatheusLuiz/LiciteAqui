const TipoTelefoneModel = require('../models/tipoTelefoneModel');

class TipoTelefoneController {
    // Cadastrar novo tipo de telefone
    static async cadastrar(req, res) {
        try {
            const { descricao, usuario } = req.body;

            if (!descricao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await TipoTelefoneModel.cadastrarTipoTelefone({ descricao, usuario });
            return res.status(201).json({ message: 'Tipo de telefone cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o tipo de telefone.' });
        }
    }

    // Atualizar tipo de telefone existente
    static async atualizar(req, res) {
        try {
            const { id_tipo_telefone } = req.params;
            const { descricao, usuario } = req.body;

            if (!id_tipo_telefone || !descricao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await TipoTelefoneModel.atualizarTipoTelefone(id_tipo_telefone, { descricao, usuario });
            return res.status(200).json({ message: 'Tipo de telefone atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o tipo de telefone.' });
        }
    }

    // Listar todos os tipos de telefone
    static async listar(req, res) {
        try {
            const tipos = await TipoTelefoneModel.listarTiposTelefone();
            return res.status(200).json(tipos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os tipos de telefone.' });
        }
    }

    // Deletar tipo de telefone
    static async deletar(req, res) {
        try {
            const { id_tipo_telefone } = req.params;
            const { usuario } = req.body;

            if (!id_tipo_telefone || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await TipoTelefoneModel.deletarTipoTelefone(id_tipo_telefone, usuario);
            return res.status(200).json({ message: 'Tipo de telefone deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o tipo de telefone.' });
        }
    }
}

module.exports = TipoTelefoneController;
