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
        console.log("Parâmetros recebidos para atualização:", {
            id_usuario,
            nome_completo,
            email,
            sexo,
            data_nascimento,
            cpf,
            usuario
        });

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
        const resultados = await this.executeQuery(sql);

        if (!resultados || resultados.length === 0) {
            return []; // Retorna um array vazio se não houver registros
        }

        return resultados; // Retorna o array de resultados como esperado
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
            const results = await db.query(sql, params);

            if (!results || results.length === 0) {
                return [];
            }

            // Garantir que o retorno seja sempre um array de objetos
            return results[0] instanceof Array ? results[0] : results;

        } catch (error) {
            console.error(`Erro ao executar consulta SQL: ${sql}`, error.message);
            throw new Error(`Erro ao executar a consulta no banco de dados: ${error.message}`);
        }
    }

    static async verificarCpfExistente(cpf, id_usuario) {
        const sql = `
            SELECT id_usuario FROM usuarios WHERE cpf = ? AND id_usuario != ?
        `;
        const params = [cpf, id_usuario];
        const resultados = await this.executeQuery(sql, params);

        return resultados.length > 0; // Retorna true se existir outro usuário com o mesmo CPF
    }
}

module.exports = UserModel;
