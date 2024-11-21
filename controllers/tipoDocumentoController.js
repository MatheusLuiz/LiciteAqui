const TipoDocumentoModel = require('../models/tipoDocumentoModel');

class TipoDocumentoController {
    // Cadastrar novo tipo de documento
    static async cadastrar(req, res) {
        try {
            const { descricao, usuario } = req.body;

            if (!descricao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await TipoDocumentoModel.cadastrarTipoDocumento({ descricao, usuario });
            return res.status(201).json({ message: 'Tipo de documento cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o tipo de documento.' });
        }
    }

    // Atualizar tipo de documento existente
    static async atualizar(req, res) {
        try {
            const { id_documento } = req.params;
            const { descricao, usuario } = req.body;

            if (!id_documento || !descricao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await TipoDocumentoModel.atualizarTipoDocumento(id_documento, { descricao, usuario });
            return res.status(200).json({ message: 'Tipo de documento atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o tipo de documento.' });
        }
    }

    // Listar todos os tipos de documentos
    static async listar(req, res) {
        try {
            const tipos = await TipoDocumentoModel.listarTiposDocumento();
            return res.status(200).json(tipos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os tipos de documentos.' });
        }
    }

    // Deletar tipo de documento
    static async deletar(req, res) {
        try {
            const { id_documento } = req.params;
            const { usuario } = req.body;

            if (!id_documento || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await TipoDocumentoModel.deletarTipoDocumento(id_documento, usuario);
            return res.status(200).json({ message: 'Tipo de documento deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o tipo de documento.' });
        }
    }
}

module.exports = TipoDocumentoController;
