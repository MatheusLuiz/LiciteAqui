const ClienteModel = require('../models/clienteModel');

class ClienteController {
    static async cadastrar(req, res) {
        try {
            const camposObrigatorios = ['cnpj', 'razao_social', 'nome_fantasia', 'status', 'data_cadastro', 'usuario'];
            const erroValidacao = validarCamposObrigatorios(camposObrigatorios, req.body);

            if (erroValidacao) {
                return res.status(400).json({ success: false, message: erroValidacao });
            }

            const { cnpj, razao_social, nome_fantasia, status, data_cadastro, usuario } = req.body;
            const result = await ClienteModel.cadastrarCliente(cnpj, razao_social, nome_fantasia, status, data_cadastro, usuario);

            return res.status(201).json({ 
                success: true, 
                message: result.message, 
                data: { id_cliente: result.id_cliente }
            });
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar o cliente.', error: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const camposObrigatorios = ['id_cliente', 'cnpj', 'razao_social', 'nome_fantasia', 'status', 'usuario'];
            const erroValidacao = validarCamposObrigatorios(camposObrigatorios, req.body);

            if (erroValidacao) {
                return res.status(400).json({ success: false, message: erroValidacao });
            }

            const { id_cliente, cnpj, razao_social, nome_fantasia, status, usuario } = req.body;
            const result = await ClienteModel.atualizarCliente(id_cliente, cnpj, razao_social, nome_fantasia, status, usuario);

            return res.status(200).json({ success: true, message: 'Cliente atualizado com sucesso!', data: result });
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o cliente.', error: error.message });
        }
    }

    static async listar(req, res) {
        try {
            const result = await ClienteModel.listarClientes();

            if (!result || result.data === null) {
                return res.status(404).json({ success: false, message: 'Nenhum cliente encontrado.' });
            }

            return res.status(200).json({ success: true, message: 'Clientes listados com sucesso.', data: result });
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            return res.status(500).json({ success: false, message: 'Erro ao listar os clientes.', error: error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const camposObrigatorios = ['id_cliente', 'usuario'];
            const erroValidacao = validarCamposObrigatorios(camposObrigatorios, req.body);

            if (erroValidacao) {
                return res.status(400).json({ success: false, message: erroValidacao });
            }

            const { id_cliente, usuario } = req.body;
            const result = await ClienteModel.deletarCliente(id_cliente, usuario);
            
            // if (!result) {
            //     return res.status(404).json({ success: false, message: 'Cliente não encontrado para deletar.' });
            // }

            return res.status(200).json({ success: true, message: 'Cliente deletado com sucesso!', data: result });
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            return res.status(500).json({ success: false, message: 'Erro ao deletar o cliente.', error: error.message });
        }
    }

    static async listarClientesAtivos(req, res) {
        try {
            const clientes = await ClienteModel.listarClientesAtivos();
            if (clientes.length === 0) {
                return res.status(404).json({ success: false, message: 'Nenhum cliente ativo encontrado.' });
            }
            return res.status(200).json({ success: true, message: 'Clientes ativos listados com sucesso.', data: clientes });
        } catch (error) {
            console.error('Erro ao listar clientes ativos:', error);
            return res.status(500).json({ success: false, message: 'Erro ao listar clientes ativos.', error: error.message });
        }
    }

    // Listar clientes inativos
    static async listarClientesInativos(req, res) {
        try {
            const clientes = await ClienteModel.listarClientesInativos();
            if (clientes.length === 0) {
                return res.status(404).json({ success: false, message: 'Nenhum cliente inativo encontrado.' });
            }
            return res.status(200).json({ success: true, message: 'Clientes inativos listados com sucesso.', data: clientes });
        } catch (error) {
            console.error('Erro ao listar clientes inativos:', error);
            return res.status(500).json({ success: false, message: 'Erro ao listar clientes inativos.', error: error.message });
        }
    }

    // Listar clientes suspensos
    static async listarClientesSuspensos(req, res) {
        try {
            const clientes = await ClienteModel.listarClientesSuspensos();
            if (clientes.length === 0) {
                return res.status(404).json({ success: false, message: 'Nenhum cliente suspenso encontrado.' });
            }
            return res.status(200).json({ success: true, message: 'Clientes suspensos listados com sucesso.', data: clientes });
        } catch (error) {
            console.error('Erro ao listar clientes suspensos:', error);
            return res.status(500).json({ success: false, message: 'Erro ao listar clientes suspensos.', error: error.message });
        }
    }

    // Listar todos os clientes
    static async listarTodosClientes(req, res) {
        try {
            const clientes = await ClienteModel.listarTodosClientes();
            if (clientes.length === 0) {
                return res.status(404).json({ success: false, message: 'Nenhum cliente encontrado.' });
            }
            return res.status(200).json({ success: true, message: 'Todos os clientes listados com sucesso.', data: clientes });
        } catch (error) {
            console.error('Erro ao listar todos os clientes:', error);
            return res.status(500).json({ success: false, message: 'Erro ao listar os clientes.', error: error.message });
        }
    }
}


function validarCamposObrigatorios(campos, body) {
    const camposFaltantes = campos.filter(campo => !body[campo]);
    if (camposFaltantes.length > 0) {
        return `Campos obrigatórios não fornecidos: ${camposFaltantes.join(', ')}`;
    }
    return null;
}

module.exports = ClienteController;