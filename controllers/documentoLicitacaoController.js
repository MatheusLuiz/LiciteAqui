const DocumentoLicitacaoModel = require('../models/documentoLicitacaoModel');

class DocumentoLicitacaoController {
    // Cadastrar novo documento de licitação
    static async cadastrar(req, res) {
        try {
            const { id_documento, num_licitacao, usuario } = req.body;

            if (!id_documento || !num_licitacao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await DocumentoLicitacaoModel.cadastrarDocumentoLicitacao({
                id_documento,
                num_licitacao,
                usuario,
            });

            return res.status(201).json({ message: 'Documento de licitação cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o documento de licitação.' });
        }
    }

    // Atualizar documento de licitação existente
    static async atualizar(req, res) {
        try {
            const { id_doc_licitacao } = req.params;
            const { id_documento, num_licitacao, usuario } = req.body;

            if (!id_doc_licitacao || !id_documento || !num_licitacao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await DocumentoLicitacaoModel.atualizarDocumentoLicitacao(id_doc_licitacao, {
                id_documento,
                num_licitacao,
                usuario,
            });

            return res.status(200).json({ message: 'Documento de licitação atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o documento de licitação.' });
        }
    }

    // Listar todos os documentos de licitação
    static async listar(req, res) {
        try {
            const documentos = await DocumentoLicitacaoModel.listarDocumentosLicitacao();
            return res.status(200).json(documentos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os documentos de licitação.' });
        }
    }

    // Deletar documento de licitação
    static async deletar(req, res) {
        try {
            const { id_doc_licitacao } = req.params;
            const { usuario } = req.body;

            if (!id_doc_licitacao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await DocumentoLicitacaoModel.deletarDocumentoLicitacao(id_doc_licitacao, usuario);
            return res.status(200).json({ message: 'Documento de licitação deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o documento de licitação.' });
        }
    }
}

module.exports = DocumentoLicitacaoController;
