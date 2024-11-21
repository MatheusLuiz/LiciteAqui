const TipoServicoModel = require('../models/tipoServicoModel');

class TipoServicoController {
    // Cadastrar novo tipo de serviço
    static async cadastrar(req, res) {
        try {
            const { descricao, usuario } = req.body;

            if (!descricao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await TipoServicoModel.cadastrarTipoServico({ descricao, usuario });
            return res.status(201).json({ message: 'Tipo de serviço cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o tipo de serviço.' });
        }
    }

    // Atualizar tipo de serviço existente
    static async atualizar(req, res) {
        try {
            const { id_tipo_servico } = req.params;
            const { descricao, usuario } = req.body;

            if (!id_tipo_servico || !descricao || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await TipoServicoModel.atualizarTipoServico(id_tipo_servico, { descricao, usuario });
            return res.status(200).json({ message: 'Tipo de serviço atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o tipo de serviço.' });
        }
    }

    // Listar todos os tipos de serviço
    static async listar(req, res) {
        try {
            const tipos = await TipoServicoModel.listarTiposServico();
            return res.status(200).json(tipos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os tipos de serviço.' });
        }
    }

    // Deletar tipo de serviço
    static async deletar(req, res) {
        try {
            const { id_tipo_servico } = req.params;
            const { usuario } = req.body;

            if (!id_tipo_servico || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await TipoServicoModel.deletarTipoServico(id_tipo_servico, usuario);
            return res.status(200).json({ message: 'Tipo de serviço deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o tipo de serviço.' });
        }
    }
}

module.exports = TipoServicoController;
