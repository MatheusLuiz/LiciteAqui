const UserModel = require('../models/userModel');

class UserController {
    // Rota para cadastrar um novo usuário
    static async cadastrar(req, res) {
        try {
            const { nome_completo, email, sexo, data_nascimento, cpf, usuario } = req.body;

            if (!nome_completo || !email || !sexo || !cpf || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await UserModel.cadastrarUser({
                nome_completo,
                email,
                sexo,
                data_nascimento,
                cpf,
                usuario
            });

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o usuário.' });
        }
    }

    // Rota para atualizar um usuário
    static async atualizar(req, res) {
        try {
            const { id_usuario, nome_completo, email, sexo, data_nascimento, cpf, usuario } = req.body;

            if (!id_usuario || !nome_completo || !email || !sexo || !cpf || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            // Normalizando o valor de sexo
            const sexoNormalizado = sexo.toLowerCase() === 'masculino' ? 'Masculino' : 'feminino';

            // Verificar se o CPF já está sendo utilizado por outro usuário que não seja o atual
            const cpfExiste = await UserModel.verificarCpfExistente(cpf, id_usuario);
            if (cpfExiste) {
                return res.status(400).json({ error: 'O CPF fornecido já está sendo utilizado por outro usuário.' });
            }

            const result = await UserModel.atualizarUser(id_usuario, {
                nome_completo,
                email,
                sexo: sexoNormalizado,
                data_nascimento,
                cpf,
                usuario
            });

            return res.status(200).json({ message: 'Usuário atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
        }
    }

    // Rota para listar usuários
    static async listar(req, res) {
        try {
            const usuarios = await UserModel.listarUser();

            console.log("Usuários retornados:", usuarios); // Log para debugar

            if (!usuarios || usuarios.length === 0) {
                return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
            }

            return res.status(200).json(usuarios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os usuários.' });
        }
    }

    // Rota para deletar um usuário
    static async deletar(req, res) {
        try {
            const { id_usuario, usuario } = req.body; // ID do usuário e o usuário que está executando a ação devem ser passados no corpo da requisição

            if (!id_usuario || !usuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await UserModel.deletarUser(id_usuario, usuario);
            return res.status(200).json({ message: 'Usuário deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o usuário.' });
        }
    }
}

module.exports = UserController;
