const LoginModel = require('../models/loginModel');

class LoginController {
    /**
     * Busca um usuário pelo username.
     * @param {Object} req - Objeto de requisição do Express.
     * @param {Object} res - Objeto de resposta do Express.
     */
    static async findUserByUsername(req, res) {
        const { username, senha } = req.body; // Agora ambos, username e senha, vêm do corpo da requisição
    
        if (!username || !senha) {
            return res.status(400).json({ error: 'Os parâmetros "username" e "senha" são obrigatórios.' });
        }
    
        try {
            const user = await LoginModel.findByUsername(username);
    
            if (!user) {
                console.warn(`Usuário com username "${username}" não encontrado.`);
                return res.status(404).json({ error: `Usuário com username "${username}" não encontrado.` });
            }
    
            // Comparar a senha informada com o hash da senha armazenada
            const bcrypt = require('bcrypt'); // Certifique-se de importar o bcrypt no topo do arquivo
            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                console.warn('Senha inválida para o username:', username);
                return res.status(401).json({ error: 'Senha inválida.' });
            }
    
            // Retorna os dados do usuário (exceto a senha)
            const { senha: _, ...userWithoutPassword } = user; // Remover a senha do objeto retornado
            return res.status(200).json(userWithoutPassword);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error.message);
            return res.status(500).json({ error: 'Erro ao buscar os dados do usuário.' });
        }
    }

    /**
     * Insere um novo login de usuário.
     * @param {Object} req - Objeto de requisição do Express.
     * @param {Object} res - Objeto de resposta do Express.
     */
    static async insertLogin(req, res) {
        const { usuario, username, senha, usuarioLog } = req.body;

        if (!usuario || !username || !senha || !usuarioLog) {
            return res.status(400).json({ error: 'Todos os campos (usuario, username, senha, usuarioLog) são obrigatórios.' });
        }

        try {
            await LoginModel.insertLogin({ usuario, username, senha, usuarioLog });
            return res.status(201).json({ message: 'Login de usuário inserido com sucesso.' });
        } catch (error) {
            console.error('Erro ao inserir login de usuário:', error.message);
            return res.status(500).json({ error: 'Erro ao inserir login de usuário.' });
        }
    }

    /**
     * Atualiza os dados de login de um usuário.
     * @param {Object} req - Objeto de requisição do Express.
     * @param {Object} res - Objeto de resposta do Express.
     */
    static async updateLogin(req, res) {
        const { idLogin, username, senha, usuarioLog } = req.body;

        if (!idLogin || !username || !senha || !usuarioLog) {
            return res.status(400).json({ error: 'Todos os campos (idLogin, username, senha, usuarioLog) são obrigatórios.' });
        }

        try {
            await LoginModel.updateLogin({ idLogin, username, senha, usuarioLog });
            return res.status(200).json({ message: 'Login de usuário atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar login de usuário:', error.message);
            return res.status(500).json({ error: 'Erro ao atualizar login de usuário.' });
        }
    }

    /**
     * Deleta um login de usuário.
     * @param {Object} req - Objeto de requisição do Express.
     * @param {Object} res - Objeto de resposta do Express.
     */
    static async deleteLogin(req, res) {
        const { idLogin, usuarioLog } = req.body;

        if (!idLogin || !usuarioLog) {
            return res.status(400).json({ error: 'Os campos "idLogin" e "usuarioLog" são obrigatórios.' });
        }

        try {
            await LoginModel.deleteLogin(idLogin, usuarioLog);
            return res.status(200).json({ message: 'Login de usuário deletado com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar login de usuário:', error.message);
            return res.status(500).json({ error: 'Erro ao deletar login de usuário.' });
        }
    }
}

module.exports = LoginController;
