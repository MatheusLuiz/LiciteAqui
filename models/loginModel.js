const db = require('../config/db');

class LoginUsuarioModel {
    static async cadastrarLoginUsuario(usuario, username, senha, usuario_log) {
        const sql = `
            CALL sp_inserir_login_usuario(?, ?, ?, ?)
        `;
        const params = [usuario, username, senha, usuario_log];
        return await this.executeQuery(sql, params);
    }

    static async atualizarLoginUsuario(id_login, username, senha, usuario_log) {
        const sql = `
            CALL sp_atualizar_login_usuario(?, ?, ?, ?)
        `;
        const params = [id_login, username, senha, usuario_log];
        return await this.executeQuery(sql, params);
    }

    static async listarLoginsUsuarios() {
        const sql = `
            SELECT * FROM vw_login_usuarios
        `;
        const resultados = await this.executeQuery(sql);
        return resultados.length ? resultados : [];
    }

    static async deletarLoginUsuario(id_login, usuario_log) {
        const sql = `
            CALL sp_deletar_login_usuario(?, ?)
        `;
        const params = [id_login, usuario_log];
        return await this.executeQuery(sql, params);
    }

    static async findByUsername(username) {
        const query = `SELECT * FROM vw_login_usuarios WHERE username = ? LIMIT 1`;
    
        try {
            const results = await this.executeQuery(query, [username]);

            if (!results || (Array.isArray(results) && results.length === 0)) {
                console.warn(`Nenhum resultado encontrado para o username: "${username}"`);
                return null;
            }

            const user = Array.isArray(results) ? results[0] : results;
    
            console.log('Resultados encontrados:', user);

            return user; 
        } catch (error) {
            console.error(`Erro ao buscar usuário por username:`, error.message);
            throw error;
        }
    }

    static async executeQuery(sql, params = []) {
        try {
            const results = await db.query(sql, params);
            return results[0] instanceof Array ? results[0] : results;
        } catch (error) {
            console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
            throw new Error(`Erro ao executar a consulta no banco de dados: ${error.message}`);
        }
    }
}

module.exports = LoginUsuarioModel;
