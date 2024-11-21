const db = require('../config/db');

class UserModel {
    
    static async cadastrarUser({ nome_completo, email, sexo, data_nascimento, cpf, usuario }) {
        const sql = `
            CALL sp_inserir_usuario(?, ?, ?, ?, NOW(), ?, ?)
        `;
        const params = [nome_completo, email, sexo, data_nascimento, cpf, usuario];
        return await this.executeQuery(sql, params);
    }

    
    static async atualizarUser(id_usuario, { nome_completo, email, sexo, data_nascimento, cpf, usuario }) {
        const sql = `
            CALL sp_atualizar_usuario(?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [id_usuario, nome_completo, email, sexo, data_nascimento, cpf, usuario];
        return await this.executeQuery(sql, params);
    }

    
    static async listarUser() {
        const sql = `
            SELECT * FROM vw_usuarios
        `;
        return await this.executeQuery(sql);
    }

   
    static async deletarUser(id_usuario, usuario) {
        const sql = `
            CALL sp_deletar_usuario(?, ?)
        `;
        const params = [id_usuario, usuario];
        return await this.executeQuery(sql, params);
    }

    static async executeQuery(sql, params = []) {
        try {
            const [results] = await db.query(sql, params);

            if (!results) {
                return null;
            }

            return results; 

        } catch (error) {
            console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);

            throw new Error(`Erro ao executar a consulta no banco de dados: ${error.message}`);
        }
    }
}

module.exports = UserModel;
