const LoginUsuarioModel = require('../models/loginModel');
const jwt = require('jsonwebtoken');

class LoginUsuarioController {
    // Rota para cadastrar um novo login de usuário
    static async cadastrar(req, res) {
        try {
            const { usuario, username, senha, usuario_log } = req.body;

            if (!usuario || !username || !senha || !usuario_log) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await LoginUsuarioModel.cadastrarLoginUsuario(usuario, username, senha, usuario_log);
            return res.status(201).json({ message: 'Login de usuário cadastrado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao cadastrar o login de usuário.' });
        }
    }

    // Rota para atualizar um login de usuário
    static async atualizar(req, res) {
        try {
            const { id_login, username, senha, usuario_log } = req.body;

            if (!id_login || !username || !senha || !usuario_log) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await LoginUsuarioModel.atualizarLoginUsuario(id_login, username, senha, usuario_log);
            return res.status(200).json({ message: 'Login de usuário atualizado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao atualizar o login de usuário.' });
        }
    }

    // Rota para listar logins de usuários
    static async listar(req, res) {
        try {
            const loginsUsuarios = await LoginUsuarioModel.listarLoginsUsuarios();

            if (!loginsUsuarios || loginsUsuarios.length === 0) {
                return res.status(404).json({ message: 'Nenhum login de usuário encontrado.' });
            }

            return res.status(200).json(loginsUsuarios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar os logins de usuários.' });
        }
    }

    // Rota para deletar um login de usuário
    static async deletar(req, res) {
        try {
            const { id_login, usuario_log } = req.body;

            if (!id_login || !usuario_log) {
                return res.status(400).json({ error: 'Dados obrigatórios não fornecidos.' });
            }

            const result = await LoginUsuarioModel.deletarLoginUsuario(id_login, usuario_log);
            return res.status(200).json({ message: 'Login de usuário deletado com sucesso!', result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar o login de usuário.' });
        }
    }

    static async findUserByUsername(req, res) {
        const { username, senha } = req.body;
    
        if (!username || !senha) {
            return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
        }
    
        try {
            const user = await LoginUsuarioModel.findByUsername(username);
    
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }
    
            const bcrypt = require('bcrypt');
            const senhaValida = await bcrypt.compare(senha, user.senha);
    
            if (!senhaValida) {
                return res.status(401).json({ error: 'Senha inválida.' });
            }
    
            const token = jwt.sign(
                { id: user.id_login, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
    
            console.log("Token gerado:", token); // Log para depuração
    
            // Configurar o cookie com o token
            res.cookie('authToken', token, {
                maxAge: 3600000 // 1 hora
            });
    
            // Enviar o token junto com os dados do usuário
            return res.status(200).json({ token: token, user: user });
        } catch (err) {
            console.error("Erro ao autenticar o usuário:", err.message);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
    }
}

module.exports = LoginUsuarioController;
